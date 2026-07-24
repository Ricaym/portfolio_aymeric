const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_REST_URL = "https://api.github.com";

const PROFILE_QUERY = `
	query PortfolioProfile(
		$login: String!
		$from: DateTime!
		$to: DateTime!
	) {
		user(login: $login) {
			login
			name
			avatarUrl
			url
			bio
			company
			location
			websiteUrl
			createdAt

			followers(first: 1) {
				totalCount
			}

			following(first: 1) {
				totalCount
			}

			repositories(
				first: 1
				privacy: PUBLIC
				ownerAffiliations: [OWNER]
			) {
				totalCount
			}

			organizations(first: 20) {
				nodes {
					login
					name
					avatarUrl
					url
				}
			}

			pinnedItems(first: 6, types: [REPOSITORY]) {
				nodes {
					... on Repository {
						nameWithOwner
					}
				}
			}

			contributionsCollection(from: $from, to: $to) {
				totalCommitContributions
				totalIssueContributions
				totalPullRequestContributions
				totalPullRequestReviewContributions
				totalRepositoriesWithContributedCommits
				restrictedContributionsCount

				contributionCalendar {
					totalContributions

					weeks {
						contributionDays {
							date
							color
							weekday
							contributionCount
							contributionLevel
						}
					}
				}

				commitContributionsByRepository(maxRepositories: 20) {
					repository {
						nameWithOwner
						url

						primaryLanguage {
							name
							color
						}
					}

					contributions(first: 1) {
						totalCount
					}
				}
			}
		}
	}
`;

const REPOSITORIES_QUERY = `
	query PortfolioRepositories(
		$login: String!
		$cursor: String
	) {
		user(login: $login) {
			repositories(
				first: 100
				after: $cursor
				privacy: PUBLIC
				ownerAffiliations: [OWNER]
				orderBy: {
					field: PUSHED_AT
					direction: DESC
				}
			) {
				pageInfo {
					hasNextPage
					endCursor
				}

				nodes {
					id
					name
					nameWithOwner
					description
					url
					homepageUrl
					createdAt
					updatedAt
					pushedAt
					diskUsage
					isArchived
					isFork
					visibility
					stargazerCount
					forkCount

					defaultBranchRef {
						name
					}

					licenseInfo {
						name
						spdxId
					}

					watchers(first: 1) {
						totalCount
					}

					issues(first: 1, states: OPEN) {
						totalCount
					}

					pullRequests(first: 1, states: OPEN) {
						totalCount
					}

					releases(first: 1) {
						totalCount
					}

					primaryLanguage {
						name
						color
					}

					languages(
						first: 10
						orderBy: {
							field: SIZE
							direction: DESC
						}
					) {
						totalSize

						edges {
							size

							node {
								name
								color
							}
						}
					}

					repositoryTopics(first: 10) {
						nodes {
							topic {
								name
							}
						}
					}
				}
			}
		}
	}
`;

function getHeaders(token) {
	return {
		Authorization: `Bearer ${token}`,
		Accept: "application/vnd.github+json",
		"Content-Type": "application/json",
		"User-Agent": "portfolio-github-dashboard",
		"X-GitHub-Api-Version": "2022-11-28",
	};
}

async function githubGraphQL(query, variables, token) {
	const response = await fetch(GITHUB_GRAPHQL_URL, {
		method: "POST",
		headers: getHeaders(token),
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	const result = await response.json();

	if (!response.ok || result.errors) {
		const message =
			result.errors?.map((error) => error.message).join(", ") ||
			`Erreur GitHub ${response.status}`;

		throw new Error(message);
	}

	return result.data;
}

async function getAllRepositories(username, token) {
	const repositories = [];

	let cursor = null;
	let hasNextPage = true;

	while (hasNextPage) {
		const data = await githubGraphQL(
			REPOSITORIES_QUERY,
			{
				login: username,
				cursor,
			},
			token,
		);

		const page = data.user?.repositories;

		if (!page) {
			throw new Error(`Compte GitHub "${username}" introuvable.`);
		}

		repositories.push(...page.nodes.filter(Boolean));

		hasNextPage = page.pageInfo.hasNextPage;
		cursor = page.pageInfo.endCursor;
	}

	return repositories;
}

async function getRecentPublicCommits(username, token) {
	const commits = [];

	/*
	 * L'API Events ne représente pas l'intégralité de l'historique Git.
	 * Elle sert uniquement à afficher l'activité publique récente.
	 */
	for (let page = 1; page <= 3 && commits.length < 15; page += 1) {
		const response = await fetch(
			`${GITHUB_REST_URL}/users/${encodeURIComponent(
				username,
			)}/events/public?per_page=100&page=${page}`,
			{
				headers: getHeaders(token),
			},
		);

		if (!response.ok) {
			break;
		}

		const events = await response.json();

		for (const event of events) {
			if (event.type !== "PushEvent") {
				continue;
			}

			const pushedCommits = [...(event.payload?.commits || [])].reverse();

			for (const commit of pushedCommits) {
				commits.push({
					sha: commit.sha,
					message: commit.message?.split("\n")[0] || "Commit sans message",
					repository: event.repo.name,
					date: event.created_at,
					url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
				});

				if (commits.length >= 15) {
					break;
				}
			}
		}

		if (events.length < 100) {
			break;
		}
	}

	return commits;
}

export default async function handler(request, response) {
	if (request.method !== "GET") {
		response.setHeader("Allow", "GET");

		return response.status(405).json({
			error: "Méthode non autorisée.",
		});
	}

	const token = process.env.GITHUB_TOKEN;
	const username = process.env.GITHUB_USERNAME || "Ricaym";

	if (!token) {
		return response.status(500).json({
			error: "La variable serveur GITHUB_TOKEN est absente.",
		});
	}

	try {
		const toDate = new Date();
		const fromDate = new Date(toDate);

		fromDate.setUTCFullYear(fromDate.getUTCFullYear() - 1);

		/*
		 * Les requêtes sont volontairement séquentielles pour éviter
		 * de multiplier les appels GitHub simultanés.
		 */
		const profileData = await githubGraphQL(
			PROFILE_QUERY,
			{
				login: username,
				from: fromDate.toISOString(),
				to: toDate.toISOString(),
			},
			token,
		);

		if (!profileData.user) {
			return response.status(404).json({
				error: `Compte GitHub "${username}" introuvable.`,
			});
		}

		const repositories = await getAllRepositories(username, token);
		const recentCommits = await getRecentPublicCommits(username, token);

		response.setHeader(
			"Cache-Control",
			"public, s-maxage=3600, stale-while-revalidate=86400",
		);

		return response.status(200).json({
			user: profileData.user,
			repositories,
			recentCommits,
			generatedAt: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Erreur GitHub :", error);

		return response.status(500).json({
			error:
				error instanceof Error
					? error.message
					: "Impossible de récupérer les données GitHub.",
		});
	}
}