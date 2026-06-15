/** Course notebook metadata served from /public/notebooks. */

export type NotebookTrack = "marketing" | "finance" | "exercises";

export interface PythonNotebook {
  filename: string;
  title: string;
  description: string;
  track: NotebookTrack;
  order: number;
}

const SITE_ORIGIN = "https://revise-tes-maths.fr";

export const PYTHON_NOTEBOOKS: PythonNotebook[] = [
  {
    filename: "cours_01_intro_python_marketing.ipynb",
    title: "Cours 1 — Introduction à Python pour le marketing digital",
    description: "Variables, types, f-strings, KPI marketing et premières listes.",
    track: "marketing",
    order: 1,
  },
  {
    filename: "cours_02_intro_python_marketing.ipynb",
    title: "Cours 2 — Boucles et conditions pour le marketing digital",
    description: "range, boucles for, listes parallèles et segmentation simple.",
    track: "marketing",
    order: 2,
  },
  {
    filename: "cours_03_intro_python_marketing copy.ipynb",
    title: "Cours 3 — Chaînes de caractères et listes",
    description: "Manipulation de str, indexation et modification de listes.",
    track: "marketing",
    order: 3,
  },
  {
    filename: "cours_04_intro_python_marketing.ipynb",
    title: "Cours 4 — Introduction aux dictionnaires (marketing)",
    description: "Création, lecture et listes de dictionnaires pour des campagnes.",
    track: "marketing",
    order: 4,
  },
  {
    filename: "cours_05_intro_python_marketing.ipynb",
    title: "Cours 5 — Du dictionnaire au DataFrame avec pandas",
    description: "Premiers pas avec pandas : read_csv, exploration et sélection.",
    track: "marketing",
    order: 5,
  },
  {
    filename: "cours_04_dictionnaires_finance_mba.ipynb",
    title: "Cours 4 — Dictionnaires pour la modélisation financière (MBA)",
    description: "Portefeuilles d'actifs modélisés par des listes de dictionnaires.",
    track: "finance",
    order: 4,
  },
  {
    filename: "cours_05_dictionnaires_finance_mba.ipynb",
    title: "Cours 5 — Approfondissement des dictionnaires (MBA)",
    description: "items(), parcours de portefeuilles, valorisation et P&L.",
    track: "finance",
    order: 5,
  },
  {
    filename: "exercices_pratiques.ipynb",
    title: "Exercices pratiques — Python marketing (cours 1 à 4)",
    description: "Feuille d'exercices avec corrections pour consolider les bases.",
    track: "exercises",
    order: 1,
  },
  {
    filename: "exercices_rappel_cours_01_05.ipynb",
    title: "Exercices de rappel — Cours 1 à 5",
    description: "Révisions sans correction fournie, avant le filtrage pandas avancé.",
    track: "exercises",
    order: 2,
  },
];

/** Public download path for a notebook file. */
export function notebookDownloadPath(filename: string): string {
  return `/notebooks/${encodeURIComponent(filename)}`;
}

/** Absolute URL required by Google Colab fileUrl opener. */
export function notebookPublicUrl(filename: string): string {
  return `${SITE_ORIGIN}${notebookDownloadPath(filename)}`;
}

/** Open the notebook directly in Google Colab. */
export function notebookColabUrl(filename: string): string {
  return `https://colab.research.google.com/#fileUrl=${encodeURIComponent(notebookPublicUrl(filename))}`;
}

export function notebooksByTrack(track: NotebookTrack): PythonNotebook[] {
  return PYTHON_NOTEBOOKS.filter((notebook) => notebook.track === track).sort(
    (a, b) => a.order - b.order,
  );
}

export const NOTEBOOK_TRACK_LABELS: Record<NotebookTrack, string> = {
  marketing: "Marketing digital",
  finance: "Modélisation financière (MBA)",
  exercises: "Exercices",
};
