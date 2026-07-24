import fs from "node:fs/promises";
import path from "node:path";

const username = process.env.GITHUB_USERNAME;
const token = process.env.GH_GRAPHQL_TOKEN;

if (!username) {
	throw new Error("GITHUB_USERNAME est absent.");
}

if (!token) {
	throw new Error("GH_GRAPHQL_TOKEN est absent.");
}

const query = `
	query Contributions($username: String!) {
		user(login: $username) {
			contributionsCollection {
				contributionCalendar {
					totalContributions
					colors

					weeks {
						firstDay

						contributionDays {
							date
							weekday
							color
							contributionCount
							contributionLevel
						}
					}
				}
			}
		}
	}
`;

const response = await fetch("https://api.github.com/graphql", {
	method: "POST",
	headers: {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
		"User-Agent": "portfolio-contributions-generator",
	},
	body: JSON.stringify({
		query,
		variables: {
			username,
		},
	}),
});

const result = await response.json();

if (!response.ok || result.errors) {
	throw new Error(
		result.errors?.map((error) => error.message).join(", ") ||
			`GitHub GraphQL error: ${response.status}`,
	);
}

const calendar =
	result.data?.user?.contributionsCollection?.contributionCalendar;

if (!calendar) {
	throw new Error(`Calendrier introuvable pour ${username}.`);
}

const outputPath = path.resolve("public", "contributions.json");

await fs.mkdir(path.dirname(outputPath), {
	recursive: true,
});

await fs.writeFile(
	outputPath,
	JSON.stringify(
		{
			username,
			generatedAt: new Date().toISOString(),
			...calendar,
		},
		null,
		2,
	),
	"utf8",
);

console.log(`Calendrier généré dans ${outputPath}`);