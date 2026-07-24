import { useEffect, useMemo, useState } from "react";
import {
	AlertTriangle,
	BookOpen,
	Code2,
	ExternalLink,
	GitCommitHorizontal,
	GitFork,
	LoaderCircle,
	MapPin,
	Search,
	Star,
	Users,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import "../index.css";
import BackButton from "./BackButton";
import { getGithubData } from "../services/githubApi";

function formatNumber(value = 0) {
	return new Intl.NumberFormat("fr-FR").format(value);
}

function formatDate(date) {
	if (!date) {
		return "Date inconnue";
	}

	return new Intl.DateTimeFormat("fr-FR", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(new Date(date));
}

function StatCard({ icon: Icon, value, label }) {
	return (
		<article className="github-stat-card">
			<Icon size={22} />

			<div>
				<strong>{formatNumber(value)}</strong>
				<span>{label}</span>
			</div>
		</article>
	);
}

function RepositoryCard({ repository }) {
	return (
		<article className="github-repository-card">
			<header className="github-repository-header">
				<div>
					<div className="github-repository-title-line">
						<BookOpen size={18} />

						<a
							href={repository.html_url}
							target="_blank"
							rel="noreferrer"
						>
							{repository.name}
						</a>
					</div>

					<p>
						{repository.description ||
							"Aucune description renseignée."}
					</p>
				</div>

				<a
					href={repository.html_url}
					target="_blank"
					rel="noreferrer"
					aria-label={`Ouvrir ${repository.name}`}
				>
					<ExternalLink size={18} />
				</a>
			</header>

			{repository.topics?.length > 0 && (
				<div className="github-badge-list">
					{repository.topics.map((topic) => (
						<span className="github-topic" key={topic}>
							{topic}
						</span>
					))}
				</div>
			)}

			<div className="github-repository-metrics">
				{repository.language && (
					<span>
						<Code2 size={15} />
						{repository.language}
					</span>
				)}

				<span>
					<Star size={15} />
					{formatNumber(repository.stargazers_count)}
				</span>

				<span>
					<GitFork size={15} />
					{formatNumber(repository.forks_count)}
				</span>
			</div>

			<footer className="github-repository-footer">
				<span>
					Mis à jour le {formatDate(repository.updated_at)}
				</span>

				{repository.homepage && (
					<a
						href={repository.homepage}
						target="_blank"
						rel="noreferrer"
					>
						Voir le projet
						<ExternalLink size={14} />
					</a>
				)}
			</footer>
		</article>
	);
}

export default function Projects({ onBack }) {
	const [githubData, setGithubData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [search, setSearch] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState("all");

	useEffect(() => {
		let isMounted = true;

		async function loadGithubData() {
			try {
				setLoading(true);
				setError("");

				const result = await getGithubData();

				if (isMounted) {
					setGithubData(result);
				}
			} catch (requestError) {
				if (isMounted) {
					setError(
						requestError instanceof Error
							? requestError.message
							: "Impossible de charger GitHub.",
					);
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		}

		loadGithubData();

		return () => {
			isMounted = false;
		};
	}, []);

	const profile = githubData?.profile;
	const repositories = githubData?.repositories ?? [];
	const events = githubData?.events ?? [];

	const visibleRepositories = useMemo(
		() =>
			repositories.filter(
				(repository) =>
					!repository.fork && !repository.archived,
			),
		[repositories],
	);

	const languages = useMemo(
		() =>
			[
				...new Set(
					visibleRepositories
						.map((repository) => repository.language)
						.filter(Boolean),
				),
			].sort(),
		[visibleRepositories],
	);

	const filteredRepositories = useMemo(() => {
		const normalizedSearch = search.trim().toLowerCase();

		return visibleRepositories.filter((repository) => {
			const searchableText = [
				repository.name,
				repository.description,
				repository.language,
				...(repository.topics ?? []),
			]
				.filter(Boolean)
				.join(" ")
				.toLowerCase();

			const matchesSearch =
				!normalizedSearch ||
				searchableText.includes(normalizedSearch);

			const matchesLanguage =
				selectedLanguage === "all" ||
				repository.language === selectedLanguage;

			return matchesSearch && matchesLanguage;
		});
	}, [visibleRepositories, search, selectedLanguage]);

	const totalStars = useMemo(
		() =>
			visibleRepositories.reduce(
				(total, repository) =>
					total + repository.stargazers_count,
				0,
			),
		[visibleRepositories],
	);

	const publicCommits = useMemo(
		() =>
			events
				.filter((event) => event.type === "PushEvent")
				.flatMap((event) =>
					(event.payload?.commits ?? []).map((commit) => ({
						id: `${event.id}-${commit.sha}`,
						message:
							commit.message?.split("\n")[0] ??
							"Commit sans message",
						repository: event.repo?.name,
						date: event.created_at,
						url: `https://github.com/${event.repo?.name}/commit/${commit.sha}`,
					})),
				)
				.slice(0, 8),
		[events],
	);

	if (loading) {
		return (
			<div className="ProjectSection">
				<div className="github-state">
					<LoaderCircle className="github-loader" size={34} />
					<p>Chargement des données GitHub…</p>
				</div>
			</div>
		);
	}

	if (error || !profile) {
		return (
			<div className="ProjectSection">
				<div className="github-state github-error">
					<AlertTriangle size={34} />
					<h1>GitHub indisponible</h1>
					<p>{error || "Profil GitHub introuvable."}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="ProjectSection">
			<header className="projectHeader">
				<BackButton onBack={onBack} />
				<h1 className="myselfTitle">About me !</h1>
			</header>

			<main className="github-dashboard">
				<section className="github-profile">
					<img
						className="github-avatar"
						src={profile.avatar_url}
						alt={`Avatar GitHub de ${profile.name || profile.login}`}
					/>

					<div className="github-profile-content">
						<span className="github-section-label">
							<FaGithub size={18} />
							Profil GitHub
						</span>

						<h1>{profile.name || profile.login}</h1>

						<a
							href={profile.html_url}
							target="_blank"
							rel="noreferrer"
						>
							@{profile.login}
						</a>

						{profile.bio && (
							<p className="github-bio">{profile.bio}</p>
						)}

						<div className="github-profile-details">
							{profile.location && (
								<span>
									<MapPin size={16} />
									{profile.location}
								</span>
							)}

							<span>
								<Users size={16} />
								{formatNumber(profile.followers)} abonnés
							</span>

							<a
								href={profile.html_url}
								target="_blank"
								rel="noreferrer"
							>
								Voir mon profil
								<ExternalLink size={15} />
							</a>
						</div>
					</div>
				</section>

				<section className="github-stat-grid">
					<StatCard
						icon={BookOpen}
						value={visibleRepositories.length}
						label="Projets publics"
					/>

					<StatCard
						icon={Star}
						value={totalStars}
						label="Étoiles reçues"
					/>

					<StatCard
						icon={Users}
						value={profile.followers}
						label="Abonnés"
					/>

					<StatCard
						icon={GitCommitHorizontal}
						value={publicCommits.length}
						label="Commits publics récents"
					/>
				</section>

				{publicCommits.length > 0 && (
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
							{publicCommits.map((commit) => (
								<a
									key={commit.id}
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
							>
								<option value="all">
									Tous les langages
								</option>

								{languages.map((language) => (
									<option
										key={language}
										value={language}
									>
										{language}
									</option>
								))}
							</select>
						</div>
					</header>

					<div className="github-repository-grid">
						{filteredRepositories.map((repository) => (
							<RepositoryCard
								key={repository.id}
								repository={repository}
							/>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}