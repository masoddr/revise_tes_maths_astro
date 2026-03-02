% Professional skills dossier template based on provided design
\documentclass[10pt,a4paper]{article}

% Required packages
\usepackage{geometry}
\usepackage{xcolor}
\usepackage{enumitem}
\usepackage{tabularx}
\usepackage{ifxetex,ifluatex}
\usepackage{tikz}
% Try to load fontawesome5, fallback to simple symbols if not available
\IfFileExists{fontawesome5.sty}{%
  \usepackage{fontawesome5}
  \newcommand{\iconPython}{\faPython}
  \newcommand{\iconJava}{\faJava}
  \newcommand{\iconCpp}{\faCode}
  \newcommand{\iconBash}{\faTerminal}
  \newcommand{\iconVBA}{\faCode}
  \newcommand{\iconNode}{\faJs}
}{%
  % Fallback symbols if fontawesome5 is not available
  \newcommand{\iconPython}{$\bigcirc$}
  \newcommand{\iconJava}{$\bigcirc$}
  \newcommand{\iconCpp}{$\bigcirc$}
  \newcommand{\iconBash}{$\bigcirc$}
  \newcommand{\iconVBA}{$\bigcirc$}
  \newcommand{\iconNode}{$\bigcirc$}
}

% Page geometry - single column layout
\geometry{
  left=2cm,
  right=2cm,
  top=2cm,
  bottom=2cm
}

% Define condition for xetex or lualatex
\newif\ifxetexorluatex
\ifxetex
  \xetexorluatextrue
\else
  \ifluatex
    \xetexorluatextrue
  \else
    \xetexorluatexfalse
  \fi
\fi

% Fonts configuration
\ifxetexorluatex
  % If using xelatex or lualatex:
  \usepackage{fontspec}
  \setmainfont{Carlito}
\else
  % If using pdflatex:
  \usepackage[utf8]{inputenc}
  \usepackage[T1]{fontenc}
  \usepackage[default]{lato}
  \usepackage{hyperref}
  \hypersetup{
    colorlinks=true,
    urlcolor=blue
  }
\fi

% Colors based on design
\definecolor{DarkBlue}{HTML}{1a1a2e}
\definecolor{AccentBlue}{HTML}{16213e}
\definecolor{CheckGreen}{HTML}{4CAF50}
\definecolor{LightGrey}{HTML}{E0E0E0}
\definecolor{SkillBarBg}{HTML}{E0E0E0}
\definecolor{SkillBarFill}{HTML}{4CAF50}
\definecolor{SkillBarText}{HTML}{FFFFFF}

% Custom commands for design elements
\newcommand{\checkmark}{\textcolor{CheckGreen}{\textbf{✓}}}

% Header style - centered
\newcommand{\dossierheader}[3]{%
  \begin{center}
    {\Huge\bfseries\color{DarkBlue}#1}\\[0.5em]
    {\Large#2}\\[0.3em]
    {\large\itshape#3}
  \end{center}
  \vspace{1.5em}
}

% Main section title style (MAJUSCULES, gras, noir, souligné)
\newcommand{\dossiersection}[1]{%
  \vspace{1.5em}
  {\LARGE\bfseries\MakeUppercase{#1}}\\[-0.5em]
  {\color{black}\rule{0.75\textwidth}{1pt}}\\[0.5em]
}

% Subsection style (avec checkmark, bleu foncé, souligné)
\newcommand{\dossiersubsection}[1]{%
  \vspace{1em}
  \checkmark\ {\large\bfseries\color{DarkBlue}#1}\\[-0.3em]
  {\color{black}\rule{0.4\textwidth}{0.5pt}}\\[0.3em]
}

% ---------- Mission "valorisation" style (insp. FreeHopper) ----------
% Block title for Contexte / Challenge / Ma contribution / etc.
\newcommand{\missionblocktitle}[1]{%
  \vspace{0.8em}
  {\large\bfseries\color{AccentBlue}#1}\\[0.25em]
}
% Sub-block (e.g. "Architecture", "Frontend", "Backend")
\newcommand{\missionsubblock}[1]{%
  \vspace{0.4em}
  \textbf{\color{DarkBlue}#1}\\[0.2em]
}
% Problem/Solution/Result triple (for Défis et Solutions)
\newcommand{\defiitem}[3]{%
  \begin{itemize}[leftmargin=*,itemsep=0.15em,topsep=0.2em]
    \item[\textbf{Problème}:] #1
    \item[\textbf{Solution}:] #2
    \item[\textbf{Résultat}:] #3
  \end{itemize}
}

% Mission header with grey lines
\newcommand{\missionheader}[2]{%
  \vspace{1em}
  {\color{LightGrey}\rule{\textwidth}{0.5pt}}\\[0.3em]
  \begin{tabular*}{\textwidth}{@{\extracolsep{\fill}}ll}
    #1 & #2 \\
  \end{tabular*}\\[0.3em]
  {\color{LightGrey}\rule{\textwidth}{0.5pt}}\\[0.5em]
}

% Field label style (gras noir avec deux-points)
\newcommand{\fieldlabel}[1]{\textbf{#1}:}

% Placeholder text style (italique)
\newcommand{\placeholder}[1]{\textit{#1}}

% Environment for mission block
\newenvironment{missionblock}[4]{%
  \missionheader{#1}{#2}
  \fieldlabel{Poste / Fonction} \placeholder{#3}\\[0.5em]
  \fieldlabel{En-tête de mission} \placeholder{#4}\\[0.5em]
}{%
  \vspace{0.5em}
}

% Custom itemize for achievements (with checkmarks)
\newenvironment{achievements}{%
  \begin{itemize}[leftmargin=*,itemsep=0.3em]
    \renewcommand{\labelitemi}{\checkmark}
}{%
  \end{itemize}
}

% Environment for standard items (with bullets)
\newenvironment{standarditems}{%
  \begin{itemize}[leftmargin=*,itemsep=0.3em]
    \renewcommand{\labelitemi}{\textbullet}
}{%
  \end{itemize}
}

% Environment for languages (with squares)
\newenvironment{languageitems}{%
  \begin{itemize}[leftmargin=*,itemsep=0.3em]
    \renewcommand{\labelitemi}{\textcolor{black}{\rule{0.3em}{0.3em}}}
}{%
  \end{itemize}
}

% Visual skill bar command
% Usage: \skillbar{icon}{skill name}{percentage}{level text}
\newcommand{\skillbar}[4]{%
  \begin{tikzpicture}[baseline=(text.base)]
    % Icon (left aligned)
    \node[anchor=west] (icon) at (0,0) {\textcolor{DarkBlue}{\Large #1}};
    % Skill name (next to icon)
    \node[anchor=west, text=DarkBlue, font=\normalsize] (text) at (0.6cm,0) {#2};
    % Bar background (light grey, wider)
    \fill[SkillBarBg, rounded corners=4pt] (4cm, -0.3cm) rectangle (10.5cm, 0.3cm);
    % Bar fill (bright green, rounded corners)
    \fill[SkillBarFill, rounded corners=4pt] (4cm, -0.3cm) rectangle ({4cm + (#3/100)*6.5cm}, 0.3cm);
    % Level text (positioned on the green bar if long enough, otherwise after)
    \pgfmathparse{(#3/100)*6.5cm}
    \ifdim\pgfmathresult pt>4cm pt
      % If bar is long enough (more than ~60%), put text on green bar in white
      \node[anchor=east, text=SkillBarText, font=\small\bfseries] at ({4cm + (#3/100)*6.5cm - 0.15cm}, 0) {#4};
    \else
      % If bar is short, put text after the bar in dark blue
      \node[anchor=west, text=DarkBlue, font=\small] at ({4cm + (#3/100)*6.5cm + 0.15cm}, 0) {#4};
    \fi
  \end{tikzpicture}\\[0.7em]
}

% Visual skills section environment
\newenvironment{visualskills}{%
  \vspace{0.5em}
  \begin{minipage}{\textwidth}
}{%
  \end{minipage}
  \vspace{0.5em}
}

\begin{document}

% ------------------- Header -------------------
\dossierheader{Massyl OUADDOUR}{Développeur Backend Python | Ingénieur R&D}{Disponible immédiatement}

% ============================================================
% 1. Informations générales
% ============================================================

\dossiersection{Informations générales}

\fieldlabel{Email} ouaddour.massyl@gmail.com\\[0.5em]
\fieldlabel{Téléphone} +33 6 16 63 51 87\\[0.5em]
\fieldlabel{Localisation} Paris, France\\[0.5em]
\fieldlabel{LinkedIn} linkedin.com/in/massylouaddour/\\[0.5em]
\fieldlabel{Portfolio} \href{https://massylouaddour.vercel.app}\\[0.5em]

% ============================================================
% 2. Domaines de compétences
% ============================================================

\dossiersection{Domaines de compétences}

% 2.1 Compétences fonctionnelles
\dossiersubsection{Compétences Fonctionnelles}

\begin{standarditems}
  \item Développement backend Python et API REST (NumPy, SciPy, Pandas, FastAPI, Flask)
  \item Développement frontend React et Python (PyQt, Tkinter)
  \item Traitement de données (NumPy, Pandas, SciPy)
  \item Simulation numérique et calcul scientifique (traitement de données volumineuses, parallélisation, Dask)
  \item Ingénierie des Systèmes Spatiaux (simulation d'orbites, modélisation physique et géométrique)
  \item Télécommunications spatiales (SatCom, communications quantiques)
\end{standarditems}

% 2.2 Compétences informatiques
\dossiersubsection{Compétences Informatiques}

\fieldlabel{Langages de développement}\\[0.3em]
\begin{visualskills}
\skillbar{\iconPython}{Python}{100}{Expert}
\skillbar{\iconBash}{Bash}{85}{Avancé}
\skillbar{\iconJava}{Java}{85}{Avancé}
\skillbar{\iconCpp}{C++}{75}{Intermédiaire}
\skillbar{\iconVBA}{VBA}{65}{Intermédiaire}
\skillbar{\iconNode}{React}{60}{Intermédiaire}
\end{visualskills}

\fieldlabel{Environnements} Linux, Windows, Serveur CI/CD (Jenkins, SonarQube), Serveur de production (Docker, Kubernetes)\\[0.3em]
\fieldlabel{Base de données} PostgreSQL, SQLite, SQLAlchemy\\[0.3em]
\fieldlabel{Outils} NumPy, SciPy, Pandas, FastAPI, Flask, Pytest, PyQt, Tkinter, Xarray, Dask, SonarQube, Ansible, LLM (OpenAI, Groq), RAG, Machine Learning\\[0.5em]



% 2.3 Langues
\dossiersubsection{Langues}

\begin{languageitems}
  \item Français -- Langue maternelle
  \item Anglais -- Courant
\end{languageitems}

\clearpage

% ============================================================
% 3. Formation
% ============================================================

\dossiersection{Formation}

\missionheader{2019 -- 2020}{Sorbonne Université}

\fieldlabel{Intitulé du diplôme / formation} Master 2 - "Outils et Systèmes de l'Astronomie et de l'Espace"\\[0.5em]

\begin{standarditems}
  \item Spécialisé en Télécommunications, Systèmes Embarqués et Méthodes Numériques
  \item Projets clés : Implémentation de modèles par éléments finis, développement de systèmes embarqués, et simulations de contrôle thermique
\end{standarditems}

\missionheader{2016 -- 2019}{Sorbonne Université}

\fieldlabel{Intitulé du diplôme / formation} Maîtrise de Physique Fondamentale\\[0.5em]
Maitrise de mathématiques appliquées (mathématiques financières, probabilités, statistiques, optimisation, etc.)

\missionheader{2015 -- 2016}{Sorbonne Université}

\fieldlabel{Intitulé du diplôme / formation} Licence de Mathématiques\\[0.5em]

\missionheader{2012 -- 2015}{Lycée Buffon}

\fieldlabel{Intitulé du diplôme / formation} Classes Préparatoires MPSI-MP\\[0.5em]

\clearpage

% ============================================================
% 4. Projets personnels
% ============================================================

\dossiersection{Projets personnels}

\missionheader{}{Revise Tes Maths}

\fieldlabel{Site web} \href{https://www.revise-tes-maths.fr}{www.revise-tes-maths.fr}\\[0.5em]

\fieldlabel{Description} Développement complet d’une plateforme web de révision en ligne. Site statique généré avec Astro (intégration React et TypeScript), déployé automatiquement via Vercel avec pipeline de build continu déclenché à chaque push Git. Mise en place d’une architecture front moderne optimisée pour la performance et le SEO.\\[0.5em]

\fieldlabel{Technologies} Astro, React, TypeScript, Tailwind CSS, Vercel, CI/CD (déploiement automatique), Git\\[0.5em]

\begin{achievements}
  \item Conception et développement d’une plateforme de révision en ligne performante et responsive
  \item Mise en place d’un workflow CI/CD automatique avec déploiement Vercel à chaque push Git
  \item Optimisation du front pour le temps de chargement et le SEO
\end{achievements}
\missionheader{}{Cinephoria}

\fieldlabel{Site web} \href{https://www.cinephoria.fr}{www.cinephoria.fr}\\[0.5em]

\fieldlabel{Description} Plateforme web d’agrégation des séances de cinéma à Toulouse. Développement du frontend web public et d’un backend Python sur VPS réalisant quotidiennement des appels API externes (Open Data / services cinéma) pour mettre à jour automatiquement les séances. Administration complète du serveur VPS, déploiement, supervision et exposition sécurisée du service web.\\[0.5em]

\fieldlabel{Technologies} Frontend Web, Backend Python, API REST, Cron jobs, VPS (administration Linux), Reverse Proxy, Git, automatisation des mises à jour de données\\[0.5em]

\begin{achievements}
  \item Mise en place d’un backend Python automatisant la récupération quotidienne des séances via API externes
  \item Administration et sécurisation d’un VPS de production (reverse proxy, supervision, déploiement)
  \item Conception d’une interface web facilitant la recherche de séances de cinéma
\end{achievements}
\missionheader{}{Optimise Ton CV}

\fieldlabel{Site web} \href{https://www.optimise-ton-cv.fr}{www.optimise-ton-cv.fr}\\[0.5em]

\fieldlabel{Description} Application web basée sur un workflow LLM permettant d’évaluer automatiquement la compatibilité entre un CV et une offre d’emploi. Backend Python exposé via FastAPI intégrant des API LLM pour l’analyse sémantique des documents, avec frontend moderne (Next.js / Vue selon version) déployé sur une infrastructure web administrée.\\[0.5em]

\fieldlabel{Technologies} Python, FastAPI, LLM API, analyse sémantique, Next.js, Vue.js, backend REST, VPS, Git\\[0.5em]

\begin{achievements}
  \item Conception d’un workflow d’analyse sémantique CV / offre via API LLM
  \item Développement d’un backend FastAPI exposant des endpoints REST pour l’évaluation automatique
  \item Intégration avec un frontend moderne déployé sur infrastructure web administrée (VPS)
\end{achievements}
\clearpage

% ============================================================
% 5. Expériences professionnelles (missions)
% ============================================================
% Missions 1 (ORUS) et 3 (Airbus QKDSIM) sont au format "valorisation"
% (Contexte / Challenge / Ma contribution / Technologies / Résultats / Défis et solutions / Impact).
% Vous pouvez répliquer cette structure sur les autres missions.

\dossiersection{Expériences professionnelles}

% ----------------------------------------------------------------
% Mission 1: ORUS — Format "valorisation"
% ----------------------------------------------------------------

\begin{missionblock}
  {Sept. 2025 -- Aujourd'hui}
  {ORUS, Paris et périphérie}
  {Développeur Backend Python | Ingénieur Spatial R\&D}
  {Backend Python pour simulateurs hyperspectraux et outils RAG internes}
\end{missionblock}

\missionblocktitle{Contexte}

ORUS développe des simulateurs d'observation de la Terre utilisés pour la conception et la validation des chaînes image (instrument, orbite, géométrie, physique). Ces outils critiques s'appuient sur une modélisation physique et géométrique précise (orbites, attitudes, lignes de visée, paramètres instrumentaux) et sur le traitement de données scientifiques volumineuses. L'enjeu est de livrer des modules backend robustes, performants et maintenables, intégrés dans des pipelines existants, dans un contexte de calculs scientifiques complexes et de travail en équipe (revues de code, documentation).

\missionblocktitle{Challenge initial}

\begin{standarditems}
  \item Simulateurs critiques : exigences fortes sur la précision des modèles et la fiabilité des calculs
  \item Volumétrie et performance : manipulation de données scientifiques massives (grilles, séries temporelles)
  \item Intégration dans des pipelines existants sans dégrader les performances
  \item Code maintenable et testé pour évolution continue et travail collaboratif
  \item Interface claire entre modélisation physique/géométrique et chaînes image
\end{standarditems}

\missionblocktitle{Ma contribution}

\missionsubblock{Backend \& modélisation}
\begin{standarditems}
  \item Développement et maintenance d'outils de production en Python pour simulateurs d'observation de la Terre (modélisation physique et géométrique des chaînes image)
  \item Modélisation des orbites satellites, attitudes et géométries d'observation ; calcul des lignes de visée, projections sol et paramètres instrumentaux
  \item Modules de simulation end-to-end (NumPy, Pandas) et manipulation de données volumineuses (NumPy, Xarray, Dask)
  \item Conception et déploiement de services backend (FastAPI, Flask) pour exposition et orchestration des calculs
\end{standarditems}

\missionsubblock{Qualité \& collaboration}
\begin{standarditems}
  \item Conception de modules backend testés (Pytest), robustes et performants, intégrés dans les pipelines
  \item Structuration du code, optimisation des performances et fiabilité des calculs
  \item Participation active aux revues de code, à la documentation technique et à l'amélioration continue des pratiques
\end{standarditems}

\\

\missionblocktitle{Technologies utilisées}

\missionsubblock{Backend \& scientifique}
Python (NumPy, Pandas, Scikit-learn, Matplotlib, FastAPI, Flask), Pytest, Unittest, MyPy, Dataclasses, pre-commit, LlamaIndex, LLM API, embeddings, RAG

\missionsubblock{Environnement}
Linux, Git, GitLab CI/CD, NetCDF, CSV, Jira, ingénierie des systèmes spatiaux, simulation d'observation de la Terre hyperspectrale, exploitation documentaire assistée par IA

\missionblocktitle{Résultats}

\missionsubblock{Performance \& fiabilité}
\begin{standarditems}
  \item Modules de production intégrés dans les pipelines, avec niveau de test et documentation adaptés
  \item Calculs scientifiques structurés et traçables (dimensions, métadonnées)
\end{standarditems}

\missionsubblock{Compétences mises en avant}
\begin{standarditems}
  \item Expertise Python scientifique et traitement de données volumineuses (Xarray, Dask)
  \item Pratiques de tests et qualité logicielle (Pytest, revues de code)
  \item Architecture et optimisation pour calculs scientifiques en contexte spatial
\end{standarditems}

\missionblocktitle{Défis et solutions}

\missionsubblock{Performance \& volumétrie}
\defiitem{Données scientifiques massives et pipelines exigeants en temps de calcul.}{Structuration avec Xarray, parallélisation et montée en charge avec Dask, optimisation des traitements.}{Modules performants et intégrables dans les chaînes existantes.}

\missionsubblock{Maintenabilité}
\defiitem{Besoin d'un code évolutif et fiable pour des simulateurs critiques.}{Architecture modulaire, tests unitaires (Pytest), documentation et revues de code.}{Base de code robuste et maintenable pour l'équipe.}

\missionblocktitle{Impact sur le projet}

\begin{achievements}
  \item Livraison de modules backend de qualité pour les simulateurs d'observation de la Terre
  \item Renforcement des pratiques qualité et collaboratives (tests, revues, documentation)
  \item Contribution directe à la chaîne de valeur des simulateurs (modélisation, services, pipelines)
\end{achievements}

\missionblocktitle{Environnements (synthèse)}

\fieldlabel{\color{DarkBlue}\textbf{Environnement technique}} Python (NumPy, Pandas, Scikit-learn, Matplotlib, FastAPI, Flask), Pytest, Unittest, MyPy, Dataclasses, pre-commit, Git, GitLab CI/CD, Docker, Linux, NetCDF, CSV, Jira, LlamaIndex, LLM API, embeddings, RAG\\[0.3em]
\fieldlabel{\color{DarkBlue}\textbf{Environnement fonctionnel}} Ingénierie des systèmes spatiaux, simulation d'observation de la Terre hyperspectrale, modélisation physique et géométrique des chaînes image, exploitation documentaire et systèmes RAG internes\\[0.5em]

% ----------------------------------------------------------------
% Mission 2: NEVERHACK - CNES (Constellations satellitaires)
% ----------------------------------------------------------------

\begin{missionblock}
  {Déc. 2024 -- Août 2025}
  {NEVERHACK pour CNES, Toulouse}
  {Développeur Backend Python | Ingénieur Spatial R\&D}
  {Simulateur Python pour constellations satellitaires (télécommunications)}
\end{missionblock}

% Enjeux & Contexte
\fieldlabel{Enjeux \& Contexte} Développement d'un simulateur complet de constellations satellitaires télécommunications, avec exigences fortes en qualité logicielle, performance des calculs scientifiques et visualisation 3D. Travail à l'interface entre ingénierie logicielle Python backend et modélisation système spatiale.\\[0.5em]

% Responsabilité
\fieldlabel{Responsabilité} Conception et développement autonome de pipelines de calcul et de services backend, optimisation des performances sur grandes grilles de calcul, mise en place de tests et d'une chaîne CI/CD.\\[0.5em]

% Parties prenantes
\fieldlabel{Parties prenantes} CNES (client), équipe de développement, experts en modélisation système spatiale et télécommunications.\\[0.5em]

% Réalisations
\fieldlabel{Réalisations} Développement d'un simulateur de constellations satellitaires avec génération de clés, visualisation 3D et intégration aux chaînes internes. Mise en place d'outils backend performants et maintenables, avec parallélisation et outillage qualité.\\[0.3em]

\begin{achievements}
  \item Développement d'outils backend (calculs, traitements parallèles, optimisation performances) intégrés aux chaînes internes
  \item Conception de pipelines de calcul en Python (NumPy)
  \item Traitement de données volumineuses (NumPy, Pandas, SciPy)
  \item Visualisation 3D avec PyVista
  \item Structuration de données complexes avec Xarray (dimensions, métadonnées, traçabilité)
  \item Parallélisation et montée en charge des traitements via Dask
  \item Conteneurisation des services backend (Docker)
  \item CI/CD (Jenkins, SonarQube)
  \item Tests unitaires (Pytest)
  \item Documentation technique
\end{achievements}

% Clés de succès et progression
\fieldlabel{Clefs de succès et progression} Maîtrise de Xarray pour structuration de données scientifiques, expertise en parallélisation avec Dask, montée en compétence sur la visualisation 3D (PyVista) et la mise en place de chaînes CI/CD complètes pour des services backend Python.\\[0.3em]

\begin{achievements}
  \item Expertise Xarray et gestion de données multidimensionnelles
  \item Parallélisation et optimisation de performances (Dask)
  \item Architecture de pipelines de calcul scientifique
  \item Mise en place et exploitation de CI/CD (Jenkins, SonarQube)
\end{achievements}

% Environnements
\fieldlabel{\color{DarkBlue}\textbf{Environnement technique}} Python (NumPy, Pandas, SciPy, Scikit-learn), PyVista, Dask, Pytest, Unittest, Docker, GitLab CI/CD, SonarQube, Linux, Git\\[0.5em]
\fieldlabel{\color{DarkBlue}\textbf{Environnement fonctionnel}} Simulation de constellations satellitaires télécom, modélisation système spatiale, calculs scientifiques haute performance\\[0.5em]

% ----------------------------------------------------------------
% Mission 3: NEVERHACK - Airbus DS (Communications quantiques)
% Format "valorisation" inspiré d'une mission type (Contexte / Défis / Contribution / Résultats)
% ----------------------------------------------------------------

\begin{missionblock}
  {Août 2023 -- Nov. 2024}
  {NEVERHACK pour Airbus Defence \& Space, Toulouse}
  {Développeur Python | Ingénieur R\&D}
  {Simulateur d'échange de clé quantique par satellite (QKDSIM)}
\end{missionblock}

\missionblocktitle{Contexte}

QKDSIM est un projet R\&D d'Airbus Defence \& Space visant à simuler une liaison de distribution de clés quantiques (QKD) entre un satellite et le sol. Cette technologie permet de sécuriser les communications en exploitant les propriétés de la mécanique quantique. Le simulateur devait reproduire les chaînes physique et logicielle (timing, duty cycle, configurations Tx/Rx) avec une précision suffisante pour valider les scénarios et servir d'outil de démonstration pour les équipes métier.

\missionblocktitle{Challenge initial}

\begin{standarditems}
  \item Besoin d'un outil unique : simulation physique, génération de clés et visualisation temps réel
  \item Exigences strictes sur les logiques de timing et de duty cycle pour cohérence avec les démonstrateurs
  \item Gestion de configurations matérielles multiples (émetteurs / récepteurs de tailles différentes)
  \item Code legacy à structurer : maintenabilité, tests et documentation pour un usage en démonstration
  \item Intégration dans un environnement de développement industriel (CI/CD, revues de code)
\end{standarditems}

\missionblocktitle{Ma contribution}

\missionsubblock{Architecture \& qualité logicielle}
\begin{standarditems}
  \item Architecture orientée maintenabilité : séparation logique métier / IHM / visualisation, classes documentées et typage explicite
  \item Mise en place de tests unitaires (Pytest) et intégration dans une chaîne CI (Jenkins) avec contrôle qualité (SonarQube)
  \item Dockerisation complète pour déploiement reproductible et isolation des dépendances
\end{standarditems}

\missionsubblock{Interface \& visualisation}
\begin{standarditems}
  \item Conception et développement d'une IHM PyQt avec affichage temps réel et paramètres dynamiques
  \item Outil de visualisation 3D (PyVista) pour la géométrie satellite-sol et les lignes de visée
  \item Gestion des configurations matérielles multiples (Tx / Rx) et des scénarios réutilisables
\end{standarditems}

\missionsubblock{Modèles \& précision}
\begin{standarditems}
  \item Implémentation des modèles physiques de la liaison quantique et de la génération de clés
  \item Implémentation précise des logiques de timing et de duty cycle pour alignement avec les spécifications
\end{standarditems}

\missionblocktitle{Technologies utilisées}

\missionsubblock{Backend \& qualité}
Python, NumPy, SciPy, Pandas, FastAPI, Flask, Pytest, Docker, Jenkins, SonarQube, Git

\missionsubblock{Frontend \& visualisation}
PyQt, PyVista (visualisation 3D)

\missionsubblock{Environnement}
Linux, CI/CD, télécommunications quantiques spatiales

\missionblocktitle{Résultats}

\missionsubblock{Performance \& fiabilité}
\begin{standarditems}
  \item Simulateur utilisé comme outil interactif pour démonstrations techniques et scénarios réutilisables
  \item Code testé, revu et documenté, intégré dans une chaîne CI/CD
\end{standarditems}

\missionsubblock{Innovation}
\begin{standarditems}
  \item Chaîne complète : modèles physiques, IHM temps réel et visualisation 3D dans un contexte R\&D spatial
  \item Introduction de bonnes pratiques (tests, CI, typage, docstrings) dans un projet de démonstration
\end{standarditems}

\missionblocktitle{Défis et solutions}

\missionsubblock{Précision des modèles}
\defiitem{Exigences strictes sur timing et duty cycle pour cohérence avec les démonstrateurs.}{Implémentation dédiée des logiques avec tests unitaires et validation sur cas connus.}{Comportement du simulateur aligné avec les attentes métier pour les démonstrations.}

\missionsubblock{Maintenabilité}
\defiitem{Code à faire évoluer pour nouveaux scénarios et nouvelles configurations.}{Architecture modulaire, typage et documentation systématique, revues de code.}{Système extensible et maintenable par l'équipe.}

\missionblocktitle{Impact sur le projet}

\begin{achievements}
  \item Outil de démonstration opérationnel pour les équipes Airbus
  \item Scénarios reproductibles et configurations multiples supportées
  \item Base de code pérenne avec tests et CI/CD
\end{achievements}

\missionblocktitle{Environnements (synthèse)}

\fieldlabel{\color{DarkBlue}\textbf{Environnement technique}} Python (NumPy, Pandas, SciPy, Scikit-learn), FastAPI, Docker, PyQt, Tkinter, Pytest, Unittest, SonarQube, GitLab CI/CD, Linux, Git\\[0.3em]
\fieldlabel{\color{DarkBlue}\textbf{Environnement fonctionnel}} Télécommunications quantiques spatiales, simulation de liaisons satellite-sol\\[0.5em]

% ----------------------------------------------------------------
% Mission 4: NEVERHACK - CNES (Satcom)
% ----------------------------------------------------------------

\begin{missionblock}
  {Nov. 2022 -- Juil. 2023}
  {NEVERHACK pour CNES, Toulouse}
  {Ingénieur Satcom}
  {Ingénieur Satcom -- Plateforme CESARS}
\end{missionblock}

% Enjeux & Contexte
\fieldlabel{Enjeux \& Contexte} Activités de validation et d'innovation autour des communications par satellite dans un environnement critique et distribué. Tests terrain sur sites variés (France, Guyane) incluant zones blanches et démonstrateurs de crise.\\[0.5em]

% Responsabilité
\fieldlabel{Responsabilité} Autonomie sur la réalisation des tests terrain, rédaction de plans de test et rapports d'analyse QoS. Développement de scripts d'automatisation pour l'exploitation des résultats.\\[0.5em]

% Parties prenantes
\fieldlabel{Parties prenantes} CNES (client), équipes terrain, fournisseurs de solutions télécom, utilisateurs finaux.\\[0.5em]

% Réalisations
\fieldlabel{Réalisations} Dans le cadre d'activités de validation et d'innovation autour des communications par satellite, j'ai assuré le support technique, les tests terrain et l'analyse de performance pour plusieurs solutions télécom. Une expertise opérationnelle sur la mise en œuvre, l'analyse et l'amélioration de solutions télécoms innovantes dans un environnement critique et distribué.\\[0.3em]

\begin{achievements}
  \item Mesures de performance, plans de tests, validation fonctionnelle et correction d'anomalies
  \item Mesures de performance sur des offres Internet satellite (fixes, MSS, IoT) déployées en France et en Guyane
  \item Tests terrain d'antennes OTM, stations fixes, gateways et solutions embarquées (y compris drones)
  \item Rédaction de plans de test, procédures techniques et rapports d'analyse QoS
  \item Mise en œuvre des équipements télécom sur le terrain (zones blanches, démonstrateurs de crise)
  \item Scripting Python/Bash pour automatiser les scénarios de test et l'exploitation des résultats
  \item Scripts Bash \& Python pour l'analyse de trafic, la métrologie et le suivi des KPIs
  \item Veille et évaluation d'outils multimédia (visioconf/audio/vidéo) sur architectures SatCom
\end{achievements}

% Clés de succès et progression
\fieldlabel{Clefs de succès et progression} Développement d'une expertise opérationnelle en télécommunications par satellite, maîtrise des tests terrain et de l'analyse de performance. Compétences en automatisation et scripting pour l'exploitation de données de test.\\[0.3em]

\begin{achievements}
  \item Expertise opérationnelle en télécommunications par satellite
  \item Tests terrain et analyse de performance QoS
  \item Automatisation et scripting (Python, Bash)
  \item Veille technologique sur solutions SatCom
\end{achievements}

% Environnements
\fieldlabel{\color{DarkBlue}\textbf{Environnement technique}} Python, Bash, Linux, Git, FastAPI, Flask, Pytest, SonarQube, CI/CD\\[0.5em]
\fieldlabel{\color{DarkBlue}\textbf{Environnement fonctionnel}} Télécommunications par satellite, tests terrain, analyse de performance QoS\\[0.5em]

% ----------------------------------------------------------------
% Mission 5: NEVERHACK - DGA (CEM)
% ----------------------------------------------------------------

\begin{missionblock}
  {Févr. 2022 -- Nov. 2022}
  {NEVERHACK pour DGA, Toulouse}
  {Développeur Java | Ingénieur R\&D}
  {Développement logiciel et IHM pour essais CEM}
\end{missionblock}

% Enjeux & Contexte
\fieldlabel{Enjeux \& Contexte} Création de logiciels et interfaces utilisateur pour les tests de compatibilité électromagnétique dans un contexte aérospatial. Développement d'outils de mesure et de pilotes pour instruments de test.\\[0.5em]

% Responsabilité
\fieldlabel{Responsabilité} Développement autonome d'applications en Java et C++, développement de pilotes pour instruments, support MCO.\\[0.5em]

% Parties prenantes
\fieldlabel{Parties prenantes} DGA (client), équipes de test CEM, utilisateurs des outils de mesure.\\[0.5em]

% Réalisations
\fieldlabel{Réalisations} Création de logiciels et interfaces utilisateur pour les tests de compatibilité électromagnétique. Développement d'outils de mesure et d'IHM avec calculs mathématiques (Java/C++), intégration avec PostgreSQL. Rédaction de documentation utilisateur et technique pour faciliter l'usage par les équipes de test.\\[0.3em]

\begin{achievements}
  \item Développement d'outils de mesure et d'IHM : calculs mathématiques Java/C++, pilotes instruments, PostgreSQL
  \item Essais CEM et développement logiciel de traitement
  \item Fonctions de calcul scientifique (maths, électromagnétisme)
  \item Développement de pilotes pour instruments, support MCO
  \item Rédaction de documentation utilisateur et technique pour faciliter l'usage par les équipes de test
  \item Compatibilité Électromagnétique pour les tests aérospatiaux
\end{achievements}

% Clés de succès et progression
\fieldlabel{Clefs de succès et progression} Développement de compétences en Java et C++ pour applications scientifiques, maîtrise de PostgreSQL, compréhension de la compatibilité électromagnétique pour tests aérospatiaux.\\[0.3em]

\begin{achievements}
  \item Développement Java et C++ pour applications scientifiques
  \item Bases de données relationnelles (PostgreSQL)
  \item Compatibilité électromagnétique (CEM)
  \item Développement de pilotes et interfaces matérielles
\end{achievements}

% Environnements
\fieldlabel{\color{DarkBlue}\textbf{Environnement technique}} Java, C++, Qt, PostgreSQL, Linux, Git\\[0.5em]
\fieldlabel{\color{DarkBlue}\textbf{Environnement fonctionnel}} Compatibilité électromagnétique, tests aérospatiaux\\[0.5em]

% ----------------------------------------------------------------
% Mission 6: NEVERHACK - CNES (Simulateur d'orbite)
% ----------------------------------------------------------------

\begin{missionblock}
  {Mars 2021 -- Janv. 2022}
  {NEVERHACK pour CNES / GUIDE, Toulouse}
  {Ingénieur simulation Python}
  {Simulateur d'orbite -- Migration Scilab vers VBA, IHM C++/Qt}
\end{missionblock}

% Enjeux & Contexte
\fieldlabel{Enjeux \& Contexte} Participation à plusieurs projets de simulation satellite, de navigation GNSS et de calcul scientifique. Migration d'outils existants (Scilab vers VBA) et refonte d'IHM pour améliorer la maintenabilité.\\[0.5em]

% Responsabilité
\fieldlabel{Responsabilité} Maintenance et évolution d'outils existants, prise en main rapide d'environnements hétérogènes. Refactoring Python pour améliorer la lisibilité et la collaboration.\\[0.5em]

% Parties prenantes
\fieldlabel{Parties prenantes} CNES / GUIDE (client), équipe de développement, utilisateurs du simulateur d'orbite pour planification des missions.\\[0.5em]

% Réalisations
\fieldlabel{Réalisations} Conception d'un simulateur d'orbite pour soutenir la planification des missions. Participation à plusieurs projets de simulation satellite, de navigation GNSS et de calcul scientifique. Migration réussie de Scilab vers VBA, refonte d'IHM (C++/Qt) et intégration d'API pour rejeux de signaux GNSS.\\[0.3em]

\begin{achievements}
  \item Maintenance et évolution d'outils existants, prise en main rapide d'environnements hétérogènes
  \item Simulation d'orbites et prédiction de trajectoires satellites (Runge-Kutta)
  \item Génération de mesures physiques synthétiques (C/N₀, bilan de liaison, signaux GPS)
  \item Refonte d'IHM (C++/Qt) et intégration d'API pour rejeux de signaux GNSS
  \item Refactoring Python : docstrings, typing, amélioration de la lisibilité et de la collaboration
  \item Visualisation de courbes avec matplotlib, extraction de données (CSV)
  \item Documentation technique d'un moteur de calcul scientifique (optique, physique)
  \item Implémenté en Python et VBA
\end{achievements}

% Clés de succès et progression
\fieldlabel{Clefs de succès et progression} Maîtrise de la simulation d'orbites et de la navigation GNSS, développement de compétences en refactoring et bonnes pratiques Python (docstrings, typing). Prise en main rapide d'environnements hétérogènes (Python, VBA, C++/Qt, Scilab).\\[0.3em]

\begin{achievements}
  \item Simulation d'orbites et mécanique spatiale
  \item Navigation GNSS et traitement de signaux
  \item Refactoring et bonnes pratiques Python (docstrings, typing)
  \item Développement multi-langages (Python, VBA, C++/Qt)
\end{achievements}

% Environnements
\fieldlabel{\color{DarkBlue}\textbf{Environnement technique}} Python, Bash, C++/Qt, Linux, VBA, Scilab\\[0.5em]
\fieldlabel{\color{DarkBlue}\textbf{Environnement fonctionnel}} Simulation satellite, navigation GNSS, calcul scientifique\\[0.5em]

\clearpage

% ============================================================
% Notes
% ============================================================

% This template is intentionally verbose and structured to ease export
% to Word or Markdown via tools like pandoc: sections, subsections,
% itemize environments and bold markers are used consistently.

\end{document}
