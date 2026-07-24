import { useEffect, useMemo, useState } from "react";
import {
	AlertTriangle,
	BookOpen,
	Building2,
	CalendarDays,
	CircleDot,
	Code2,
	ExternalLink,
	GitCommitHorizontal,
	GitFork,
	GitPullRequest,
	Link as LinkIcon,
	LoaderCircle,
	MapPin,
	Search,
	Star,
	Users,
} from "lucide-react";

import "../index.css";
import BackButton from "./BackButton";

function formatNumber(value = 0) {
	return new Intl.NumberFormat("fr-FR").format(value);
}

function formatDate(value) {
	if (!value) {
		return "Date inconnue";
	}

	return new Intl.DateTimeFormat("fr-FR", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(new Date(value));
}

function calculateLongestStreak(days) {
	let currentStreak = 0;
	let longestStreak = 0;

	for (const day of days) {
		if (day.contributionCount > 0) {
			currentStreak += 1;
			longestStreak = Math.max(longestStreak, currentStreak);
		} else {
			currentStreak = 0;
		}
	}

	return longestStreak;
}

function StatCard({ icon: Icon, label, value }) {
	return (
		<article className="github-stat-card">
			<Icon size={21} aria-hidden="true" />

			<div>
				<strong>{formatNumber(value)}</strong>
				<span>{label}</span>
			</div>
		</article>
	);
}

function ContributionCalendar({ calendar }) {
	const weeks = calendar?.weeks || [];

	return (
		<div className="github-calendar-scroll">
			<div
				className="github-calendar-grid"
				style={{
					gridTemplateColumns: `repeat(${weeks.length}, 11px)`,
				}}
				role="img"
				aria-label={`${formatNumber(
					calendar?.totalContributions,
				)} contributions durant les douze derniers mois`}
			>
				{weeks.flatMap((week, weekIndex) =>
					week.contributionDays.map((day) => (
						<span
							key={day.date}
							className="github-contribution-day"
							style={{
								gridColumn: weekIndex + 1,
								gridRow: day.weekday + 1,
								backgroundColor: day.color,
							}}
							title={`${formatDate(day.date)} : ${
								day.contributionCount
							} contribution${day.contributionCount > 1 ? "s" : ""}`}
						/>
					)),
				)}
			</div>
		</div>
	);
}

function RepositoryCard({ repository, commitCount, isPinned }) {
	const topics =
		repository.repositoryTopics?.nodes
			?.map((item) => item?.topic?.name)
			.filter(Boolean) || [];

	return (
		<article className="github-repository-card">
			<header className="github-repository-header">
				<div>
					<div className="github-repository-title-line">
						<BookOpen size={18} aria-hidden="true" />

						<a
							href={repository.url}
							target="_blank"
							rel="noreferrer"
						>
							{repository.name}
						</a>

						{isPinned && (
							<span className="github-badge github-badge-pinned">
								Épinglé
							</span>
						)}
					</div>

					<p>
						{repository.description ||
							"Aucune description renseignée pour ce projet."}
					</p>
				</div>

				<a
					className="github-icon-link"
					href={repository.url}
					target="_blank"
					rel="noreferrer"
					aria-label={`Ouvrir ${repository.name} sur GitHub`}
				>
					<ExternalLink size={18} />
				</a>
			</header>

			<div className="github-badge-list">
				{repository.isFork && (
					<span className="github-badge">Fork</span>
				)}

				{repository.isArchived && (
					<span className="github-badge github-badge-archived">
						Archivé
					</span>
				)}

				{topics.map((topic) => (
					<span className="github-topic" key={topic}>
						{topic}
					</span>
				))}
			</div>

			<div className="github-repository-metrics">
				{repository.primaryLanguage && (
					<span>
						<i
							className="github-language-dot"
							style={{
								backgroundColor:
									repository.primaryLanguage.color || "#8b949e",
							}}
						/>
						{repository.primaryLanguage.name}
					</span>
				)}

				<span>
					<Star size={15} />
					{formatNumber(repository.stargazerCount)}
				</span>

				<span>
					<GitFork size={15} />
					{formatNumber(repository.forkCount)}
				</span>

				{commitCount > 0 && (
					<span>
						<GitCommitHorizontal size={15} />
						{formatNumber(commitCount)} sur 12 mois
					</span>
				)}
			</div>

			<footer className="github-repository-footer">
				<span>Mis à jour le {formatDate(repository.pushedAt)}</span>

				{repository.homepageUrl && (
					<a
						href={repository.homepageUrl}
						target="_blank"
						rel="noreferrer"
					>
						<LinkIcon size={15} />
						Voir le projet
					</a>
				)}
			</footer>
		</article>
	);
}

export default function Portfolio({ onBack }) {
	const [githubData, setGithubData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const [search, setSearch] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState("all");
	const [showForks, setShowForks] = useState(false);
	const [showArchived, setShowArchived] = useState(false);

	useEffect(() => {
		const controller = new AbortController();

		async function loadGithubData() {
			try {
				setLoading(true);
				setError("");

				const response = await fetch("/api/github", {
					signal: controller.signal,
				});

				const result = await response.json();

				if (!response.ok) {
					throw new Error(
						result.error || "Impossible de charger les données GitHub.",
					);
				}

				setGithubData(result);
			} catch (requestError) {
				if (requestError.name !== "AbortError") {
					setError(requestError.message);
				}
			} finally {
				setLoading(false);
			}
		}

		loadGithubData();

		return () => controller.abort();
	}, []);

	const repositories = githubData?.repositories || [];
	const user = githubData?.user;
	const contributions = user?.contributionsCollection;
	const calendar = contributions?.contributionCalendar;

	const contributionDays = useMemo(
		() =>
			calendar?.weeks?.flatMap((week) => week.contributionDays) || [],
		[calendar],
	);

	const activeDays = useMemo(
		() =>
			contributionDays.filter((day) => day.contributionCount > 0).length,
		[contributionDays],
	);

	const longestStreak = useMemo(
		() => calculateLongestStreak(contributionDays),
		[contributionDays],
	);

	const totalStars = useMemo(
		() =>
			repositories.reduce(
				(total, repository) => total + repository.stargazerCount,
				0,
			),
		[repositories],
	);

	const pinnedRepositories = useMemo(
		() =>
			new Set(
				(user?.pinnedItems?.nodes || [])
					.map((repository) => repository?.nameWithOwner)
					.filter(Boolean),
			),
		[user],
	);

	const commitsByRepository = useMemo(() => {
		const commitsMap = new Map();

		for (const item of contributions?.commitContributionsByRepository || []) {
			commitsMap.set(
				item.repository.nameWithOwner,
				item.contributions.totalCount,
			);
		}

		return commitsMap;
	}, [contributions]);

	const languageStatistics = useMemo(() => {
		const languageMap = new Map();

		for (const repository of repositories) {
			for (const edge of repository.languages?.edges || []) {
				const current = languageMap.get(edge.node.name) || {
					name: edge.node.name,
					color: edge.node.color,
					size: 0,
				};

				current.size += edge.size;
				languageMap.set(edge.node.name, current);
			}
		}

		const languages = [...languageMap.values()].sort(
			(first, second) => second.size - first.size,
		);

		const totalSize = languages.reduce(
			(total, language) => total + language.size,
			0,
		);

		return languages.slice(0, 8).map((language) => ({
			...language,
			percentage: totalSize
				? Math.round((language.size / totalSize) * 100)
				: 0,
		}));
	}, [repositories]);

	const availableLanguages = useMemo(
		() =>
			[
				...new Set(
					repositories
						.map((repository) => repository.primaryLanguage?.name)
						.filter(Boolean),
				),
			].sort(),
		[repositories],
	);

	const filteredRepositories = useMemo(() => {
		const normalizedSearch = search.trim().toLowerCase();

		return repositories.filter((repository) => {
			const topics =
				repository.repositoryTopics?.nodes
					?.map((item) => item?.topic?.name)
					.filter(Boolean) || [];

			const searchableContent = [
				repository.name,
				repository.description,
				repository.primaryLanguage?.name,
				...topics,
			]
				.filter(Boolean)
				.join(" ")
				.toLowerCase();

			const matchesSearch =
				!normalizedSearch ||
				searchableContent.includes(normalizedSearch);

			const matchesLanguage =
				selectedLanguage === "all" ||
				repository.primaryLanguage?.name === selectedLanguage;

			const matchesFork = showForks || !repository.isFork;
			const matchesArchived = showArchived || !repository.isArchived;

			return (
				matchesSearch &&
				matchesLanguage &&
				matchesFork &&
				matchesArchived
			);
		});
	}, [
		repositories,
		search,
		selectedLanguage,
		showForks,
		showArchived,
	]);

	if (loading) {
		return (
			<div className="ProjectSection">
				<BackButton onBack={onBack} />

				<div className="github-state">
					<LoaderCircle className="github-loader" size={34} />
					<p>Chargement des données GitHub…</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="ProjectSection">
				<BackButton onBack={onBack} />

				<div className="github-state github-error">
					<AlertTriangle size={34} />
					<h1>Impossible de charger GitHub</h1>
					<p>{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="ProjectSection">
			<BackButton onBack={onBack} />

			<main className="github-dashboard">
				<section className="github-profile">
					<img
						className="github-avatar"
						src={user.avatarUrl}
						alt={`Avatar GitHub de ${user.name || user.login}`}
					/>

					<div className="github-profile-content">
						<div className="github-profile-title">
							<div>
								<span className="github-section-label">
									<Code2 size={17} />
									Profil GitHub
								</span>

								<h1>{user.name || user.login}</h1>
								<a
									href={user.url}
									target="_blank"
									rel="noreferrer"
								>
									@{user.login}
								</a>
							</div>

							<a
								className="github-main-link"
								href={user.url}
								target="_blank"
								rel="noreferrer"
							>
								Voir mon GitHub
								<ExternalLink size={17} />
							</a>
						</div>

						{user.bio && <p className="github-bio">{user.bio}</p>}

						<div className="github-profile-details">
							{user.location && (
								<span>
									<MapPin size={16} />
									{user.location}
								</span>
							)}

							{user.company && (
								<span>
									<Building2 size={16} />
									{user.company}
								</span>
							)}

							{user.websiteUrl && (
								<a
									href={user.websiteUrl}
									target="_blank"
									rel="noreferrer"
								>
									<LinkIcon size={16} />
									Site personnel
								</a>
							)}

							<span>
								<CalendarDays size={16} />
								Inscrit depuis {formatDate(user.createdAt)}
							</span>
						</div>
					</div>
				</section>

				<section className="github-stat-grid">
					<StatCard
						icon={Code2}
						label="Contributions"
						value={calendar?.totalContributions}
					/>

					<StatCard
						icon={GitCommitHorizontal}
						label="Commits sur 12 mois"
						value={contributions?.totalCommitContributions}
					/>

					<StatCard
						icon={BookOpen}
						label="Dépôts publics"
						value={repositories.length}
					/>

					<StatCard
						icon={Star}
						label="Étoiles reçues"
						value={totalStars}
					/>

					<StatCard
						icon={CalendarDays}
						label="Jours actifs"
						value={activeDays}
					/>

					<StatCard
						icon={CircleDot}
						label="Plus longue série"
						value={longestStreak}
					/>

					<StatCard
						icon={GitPullRequest}
						label="Pull requests"
						value={contributions?.totalPullRequestContributions}
					/>

					<StatCard
						icon={Users}
						label="Abonnés"
						value={user.followers.totalCount}
					/>
				</section>

				<section className="github-panel">
					<header className="github-panel-header">
						<div>
							<span className="github-section-label">
								<CalendarDays size={17} />
								Activité
							</span>

							<h2>Contributions des douze derniers mois</h2>
						</div>

						<strong>
							{formatNumber(calendar?.totalContributions)} contributions
						</strong>
					</header>

					<ContributionCalendar calendar={calendar} />

					{contributions?.restrictedContributionsCount > 0 && (
						<p className="github-private-note">
							{formatNumber(
								contributions.restrictedContributionsCount,
							)}{" "}
							contributions privées sont comptabilisées sans que leur
							contenu soit affiché.
						</p>
					)}
				</section>

				<div className="github-two-columns">
					<section className="github-panel">
						<header className="github-panel-header">
							<div>
								<span className="github-section-label">
									<Code2 size={17} />
									Technologies
								</span>

								<h2>Langages principaux</h2>
							</div>
						</header>

						<div className="github-language-list">
							{languageStatistics.map((language) => (
								<div
									className="github-language-item"
									key={language.name}
								>
									<div>
										<span>
											<i
												className="github-language-dot"
												style={{
													backgroundColor:
														language.color || "#8b949e",
												}}
											/>
											{language.name}
										</span>

										<strong>{language.percentage}%</strong>
									</div>

									<div className="github-language-track">
										<div
											style={{
												width: `${language.percentage}%`,
												backgroundColor:
													language.color || "#8b949e",
											}}
										/>
									</div>
								</div>
							))}
						</div>
					</section>

					<section className="github-panel">
						<header className="github-panel-header">
							<div>
								<span className="github-section-label">
									<GitCommitHorizontal size={17} />
									Activité publique
								</span>

								<h2>Commits récents</h2>
							</div>
						</header>

						<div className="github-commit-list">
							{githubData.recentCommits.length === 0 && (
								<p>Aucun commit public récent trouvé.</p>
							)}

							{githubData.recentCommits.slice(0, 8).map((commit) => (
								<a
									key={`${commit.repository}-${commit.sha}`}
									className="github-commit"
									href={commit.url}
									target="_blank"
									rel="noreferrer"
								>
									<GitCommitHorizontal size={17} />

									<div>
										<strong>{commit.message}</strong>
										<span>
											{commit.repository} ·{" "}
											{formatDate(commit.date)}
										</span>
									</div>

									<ExternalLink size={15} />
								</a>
							))}
						</div>
					</section>
				</div>

				{user.organizations?.nodes?.length > 0 && (
					<section className="github-panel">
						<header className="github-panel-header">
							<div>
								<span className="github-section-label">
									<Building2 size={17} />
									Communautés
								</span>

								<h2>Organisations GitHub</h2>
							</div>
						</header>

						<div className="github-organization-list">
							{user.organizations.nodes.map((organization) => (
								<a
									key={organization.login}
									href={organization.url}
									target="_blank"
									rel="noreferrer"
								>
									<img
										src={organization.avatarUrl}
										alt=""
									/>

									<span>
										<strong>
											{organization.name ||
												organization.login}
										</strong>
										<small>@{organization.login}</small>
									</span>
								</a>
							))}
						</div>
					</section>
				)}

				<section className="github-project-section">
					<header className="github-project-heading">
						<div>
							<span className="github-section-label">
								<BookOpen size={17} />
								Réalisations
							</span>

							<h2>Mes projets</h2>
							<p>
								{filteredRepositories.length} projet
								{filteredRepositories.length > 1 ? "s" : ""} affiché
								{filteredRepositories.length > 1 ? "s" : ""}
							</p>
						</div>

						<div className="github-project-filters">
							<label className="github-search">
								<Search size={17} />

								<input
									type="search"
									value={search}
									onChange={(event) =>
										setSearch(event.target.value)
									}
									placeholder="Rechercher un projet…"
								/>
							</label>

							<select
								value={selectedLanguage}
								onChange={(event) =>
									setSelectedLanguage(event.target.value)
								}
								aria-label="Filtrer par langage"
							>
								<option value="all">Tous les langages</option>

								{availableLanguages.map((language) => (
									<option key={language} value={language}>
										{language}
									</option>
								))}
							</select>

							<label className="github-checkbox">
								<input
									type="checkbox"
									checked={showForks}
									onChange={(event) =>
										setShowForks(event.target.checked)
									}
								/>
								Forks
							</label>

							<label className="github-checkbox">
								<input
									type="checkbox"
									checked={showArchived}
									onChange={(event) =>
										setShowArchived(event.target.checked)
									}
								/>
								Archivés
							</label>
						</div>
					</header>

					<div className="github-repository-grid">
						{filteredRepositories.map((repository) => (
							<RepositoryCard
								key={repository.id}
								repository={repository}
								commitCount={
									commitsByRepository.get(
										repository.nameWithOwner,
									) || 0
								}
								isPinned={pinnedRepositories.has(
									repository.nameWithOwner,
								)}
							/>
						))}
					</div>

					{filteredRepositories.length === 0 && (
						<div className="github-empty">
							Aucun projet ne correspond aux filtres sélectionnés.
						</div>
					)}
				</section>
			</main>
		</div>
	);
}