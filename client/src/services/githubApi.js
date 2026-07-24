const GITHUB_API_URL = "https://api.github.com";

export const GITHUB_USERNAME = "Ricaym";

async function githubFetch(endpoint) {
	const response = await fetch(`${GITHUB_API_URL}${endpoint}`, {
		headers: {
			Accept: "application/vnd.github+json",
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});

	if (!response.ok) {
		if (response.status === 403) {
			throw new Error(
				"Limite de requêtes GitHub atteinte. Réessaie dans quelques minutes.",
			);
		}

		if (response.status === 404) {
			throw new Error("Compte ou ressource GitHub introuvable.");
		}

		throw new Error(`Erreur GitHub : ${response.status}`);
	}

	return response.json();
}

export async function getGithubProfile() {
	return githubFetch(`/users/${GITHUB_USERNAME}`);
}

export async function getGithubRepositories() {
	const repositories = [];
	let page = 1;

	while (true) {
		const currentRepositories = await githubFetch(
			`/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated&type=owner`,
		);

		repositories.push(...currentRepositories);

		if (currentRepositories.length < 100) {
			break;
		}

		page += 1;
	}

	return repositories;
}

export async function getGithubEvents() {
	return githubFetch(
		`/users/${GITHUB_USERNAME}/events/public?per_page=30`,
	);
}

export async function getGithubData() {
	/*
	 * Trois appels uniquement.
	 * Les appels sont lancés ensemble pour réduire le temps de chargement.
	 */
	const [profile, repositories, events] = await Promise.all([
		getGithubProfile(),
		getGithubRepositories(),
		getGithubEvents(),
	]);

	return {
		profile,
		repositories,
		events,
	};
}