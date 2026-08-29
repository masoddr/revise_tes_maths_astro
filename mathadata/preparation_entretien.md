# Préparation entretien — AI Product Engineer @ MathAData

**Date :** lundi 22 juin 2026, 15h30  
**Lieu :** Collège de France / ENS Paris (hybride)  
**Poste :** Ingénieur Produit IA — CDD 12 mois renouvelable

---

## En 30 secondes — ce qu'il faut retenir

| | |
|---|---|
| **MathAData** | EdTech ENS / Collège de France — exercices maths interactifs inspirés de défis IA, co-développés avec des profs |
| **Le poste** | Frontière AI engineering × product engineering × full-stack — petite équipe (2–3 devs), forte autonomie |
| **Mon arc** | Enseignant → créateur de produits éducatifs → ingénieur logiciel. C'est du Product Engineering. |
| **Mon différenciateur n°1** | **Laboratoire utilisateur intégré** — j'ai des élèves aujourd'hui, je peux tester, observer et remonter du feedback terrain dès la semaine 1 |
| **Ma preuve produit** | Problème identifié → solution conçue → outil développé → testé avec de vrais utilisateurs → itéré (app Next.js de suivi → revise-tes-maths.fr, notebooks Colab) |
| **Ma preuve expérience** | ~5 ans dev pro (CNES, Airbus, DGA, ORUS) + parcours EdTech (revise-tes-maths.fr, notebooks ISDBA) |
| **Ma preuve MathAData** | Activité BETA testée, nextbooks exploré, 3 démos interactives inspirées de leur pédagogie, points d'amélioration repérés (accessibilité, perf E8) |

---

## Comprendre la stack web — Astro, React, Next.js, TypeScript

> **Section à maîtriser pour l'entretien.** Savoir expliquer clairement ce que j'utilise aujourd'hui vs ce que j'ai déjà fait en Next.js.

### La grande image

Quand on construit un site web moderne, on répond à 3 questions :

1. **Comment structurer les pages ?** (HTML, routing, contenu)
2. **Comment rendre ça interactif ?** (boutons, canvas, formulaires…)
3. **Comment organiser le code ?** (fichiers, typage, composants réutilisables)

**React**, **Next.js**, **Astro** et **TypeScript** répondent à ces questions — mais pas de la même façon.

---

### TypeScript (TS)

**C'est quoi ?** Une version de **JavaScript avec des types**, comme Python avec des annotations vérifiées avant l'exécution.

```typescript
// JavaScript — pas de vérification
function addition(a, b) { return a + b; }

// TypeScript — types explicites
function addition(a: number, b: number): number { return a + b; }
```

**À quoi ça sert :** détecter les erreurs à la compilation, code plus lisible, meilleure autocomplétion.

**Sur mon site actuel :** les 3 démos interactives (`classification-chiffres.ts`, `frequence-cardiaque.ts`, `derivee-tangente.ts`) sont en TypeScript.

**Analogie Python :** TypeScript ≈ Python avec **mypy** ou des **type hints** systématiques.

---

### JavaScript (JS) — la base

Le langage qui tourne **dans le navigateur** (et aussi côté serveur avec Node.js).

- HTML = structure
- CSS / Tailwind = apparence
- **JavaScript** = comportement interactif

TypeScript **compile vers JavaScript** : le navigateur ne comprend que le JS final.

---

### React

**C'est quoi ?** Une **bibliothèque** (pas un framework complet) pour construire des interfaces par **composants réutilisables**.

```jsx
function Bouton({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```

**Concept clé : l'état (state)** — React excelle quand l'interface change souvent selon les données (formulaires, tableaux de bord, apps).

**Ce que React fait bien :** interfaces très dynamiques, composants réutilisables, écosystème immense.

**Ce que React ne fait pas seul :** routing, SEO, API backend → il faut souvent un **framework par-dessus** (Next.js).

**Chez moi :**
- ✅ Utilisé dans mon **app Next.js de suivi des révisions** (diagramme en étoile, sessions par élève)
- ⚠️ Installé sur revise-tes-maths.fr actuel (`@astrojs/react`) mais **pas encore utilisé** — les démos sont en TS pur + canvas

---

### Next.js

**C'est quoi ?** Un **framework complet** construit **autour de React**. Il ajoute tout ce qui manque à React seul.

| Fonctionnalité | React seul | Next.js |
|---|---|---|
| Composants UI | ✅ | ✅ |
| Routing (URLs) | ❌ (à ajouter) | ✅ intégré |
| SEO / pages statiques | ❌ | ✅ |
| API backend | ❌ | ✅ (routes API) |
| Base de données | ❌ | ✅ (facile à brancher) |

**Structure typique Next.js :**
```
app/
├── page.tsx          → page d'accueil (/)
├── demo/
│   └── page.tsx      → /demo
└── api/
    └── contact.ts    → API POST /api/contact
```

**Pourquoi MathAData l'utilise :** une seule techno pour le site web, les activités interactives, l'API/backend et la base de données (PostgreSQL). Stack **full-stack**.

**Analogie Python :** Next.js ≈ **Django** ou **FastAPI + templates** — framework complet avec routing, vues, API.

**Chez moi :** c'est la stack de mon **premier produit EdTech** — l'app de suivi des révisions des annales (voir section dédiée ci-dessous).

---

### Astro

**C'est quoi ?** Un framework orienté **sites à contenu** (blogs, sites vitrine, pages pédagogiques) avec **peu de JavaScript envoyé au navigateur**.

| | React / Next.js | Astro |
|---|---|---|
| Approche | Tout est interactif par défaut | HTML statique par défaut |
| JS envoyé au client | Souvent beaucoup | Le minimum nécessaire |
| Idéal pour | Apps web complexes | Sites de contenu, blogs, landing pages |
| Composants | `.tsx` (React) | `.astro` (HTML + CSS + un peu de JS) |

**Un fichier `.astro` :**
```astro
---
// Partie "serveur" : exécutée à la compilation
const titre = "Ma page";
---
<h1>{titre}</h1>
<script>
  // JS client : seulement si nécessaire
</script>
```

**Chez moi :** c'est la stack de **revise-tes-maths.fr aujourd'hui** — 35+ pages `.astro`, composants `Header.astro` / `Footer.astro`, build statique → HTML dans `dist/`, démos interactives en TS chargées uniquement sur les pages concernées.

**Analogie Python :** Astro ≈ un **générateur de site statique** (MkDocs, Hugo) + interactivité ciblée.

---

### Comparaison visuelle — mes deux produits EdTech

```
┌─────────────────────────────────────────────────────────────┐
│  APP DE SUIVI DES RÉVISIONS (projet antérieur)              │
│                                                             │
│   Next.js (framework complet)                               │
│        + React (composants interactifs, state)              │
│        + TypeScript                                         │
│        + Données structurées (élèves, thèmes, maîtrise)    │
│        → App web dynamique, diagramme en étoile             │
└─────────────────────────────────────────────────────────────┘
                          │
                    Décision produit :
              site vitrine (confiance) avant
                  feature complexe de suivi
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  REVISE-TES-MATHS.FR (aujourd'hui)                          │
│                                                             │
│   Astro (structure + pages statiques)                       │
│        + TypeScript (démos interactives canvas)             │
│        + Tailwind CSS (style — même outil que MathAData)    │
│        + Déploiement Vercel, CI/CD                          │
│        → Site vitrine + contenus + 3 démos pédagogiques     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  STACK MATHADATA                                              │
│                                                             │
│   Next.js + React + TypeScript + Tailwind                   │
│        + Python / Jupyter / PostgreSQL                      │
│        → Plateforme d'activités interactives full-stack      │
└─────────────────────────────────────────────────────────────┘
```

---

### Résumé en une phrase

| Outil | En une phrase |
|---|---|
| **JavaScript** | Le langage du web, qui tourne dans le navigateur |
| **TypeScript** | JavaScript + types, pour coder plus sûrement |
| **React** | Bibliothèque pour construire des interfaces par composants réutilisables |
| **Next.js** | Framework complet (React + routing + API + SEO) — stack full-stack |
| **Astro** | Framework pour sites à contenu, rapides, avec interactivité ciblée |

### Ce que je peux dire à l'oral (30 sec)

> *« J'ai d'abord construit une app Next.js/React/TypeScript pour suivre la progression de mes élèves — sessions, thèmes par exercice, diagramme en étoile de maîtrise. J'ai ensuite pivoté vers revise-tes-maths.fr en Astro/TypeScript/Tailwind : un site vitrine plus adapté à attirer des élèves, avec des démos interactives en canvas. Ce n'est pas exactement la même stack que la vôtre, mais j'ai déjà fait du Next.js en conditions réelles, et les concepts sont les mêmes : composants, typage, interactivité client, Tailwind. »*

---

## L'arc revise-tes-maths — deux produits, une vision

> **Point clé pour l'entretien :** ce n'est pas « un site » — c'est **deux itérations produit** qui montrent une réflexion de priorisation.

### Produit 1 — App de suivi des révisions *(Next.js / React / TypeScript)*

| Aspect | Détail |
|---|---|
| **Problème** | Mes élèves ne visualisent pas leur progression par thème du programme |
| **Solution** | Une app web où chaque élève a sa session, ses exercices rattachés à des thèmes, et un **diagramme en étoile** (radar chart) de maîtrise par chapitre |
| **Stack** | **Next.js, React, TypeScript** — app dynamique full-stack |
| **Fonctionnalités** | Suivi par élève, exercices ↔ thèmes du programme, visualisation radar de la progression, données structurées (élèves, sessions, niveaux de maîtrise) |
| **Statut** | Projet fonctionnel, testé avec mes élèves |

### Décision produit — le pivot

| Constats | Décision |
|---|---|
| L'app de suivi est utile pour les élèves **déjà en cours** | Mais difficile à montrer pour **attirer** de nouveaux élèves |
| Besoin d'un point d'entrée de **confiance** (contenus, expertise visible) | Prioriser un **site vitrine** avant la feature complexe de suivi |
| Les contenus interactifs ont plus d'impact en acquisition | Démos canvas + pages pédagogiques |

> *« J'ai fait un choix de priorisation produit classique : confiance et acquisition avant feature complexe. Ce n'est pas un abandon technique — l'app reste dans ma roadmap. C'est une décision que je peux défendre devant une équipe produit. »*

### Produit 2 — revise-tes-maths.fr *(Astro / TypeScript / Tailwind)*

| Aspect | Détail |
|---|---|
| **Problème** | Besoin d'un site de confiance + contenus interactifs accessibles |
| **Solution** | Site vitrine avec pages de cours, blog, annales, et **démos interactives** |
| **Stack actuelle** | **Astro 5** (site statique) + **TypeScript** (scripts interactifs) + **Tailwind CSS** + déploiement **Vercel** |
| **Démos interactives** | 3 activités inspirées MathAData / programme lycée : |
| | • `/demo/classification-chiffres` — distance euclidienne, MNIST (2de/1ère) |
| | • `/demo/frequence-cardiaque` — moyenne, histogramme, alertes (2de) |
| | • `/demo/derivee-tangente` — tangente, taux d'accroissement (1ère/Terminale) |
| **React** | Installé (`@astrojs/react`) mais non utilisé — les démos sont en TS pur + canvas |
| **Utilisateurs** | Élèves particuliers — retours directs, itérations |

### Tableau de correspondance stack

| Concept | App Next.js (suivi) | Site Astro (actuel) | MathAData |
|---|---|---|---|
| **Framework** | Next.js | Astro | Next.js |
| **Composants** | `.tsx` (React) | `.astro` | `.tsx` (React) |
| **Interactivité** | React state, hooks | TS + canvas | React + activités web |
| **Typage** | TypeScript | TypeScript | TypeScript |
| **Style** | Tailwind | Tailwind | Tailwind |
| **Données** | Structurées (élèves, thèmes) | Statique + scripts client | PostgreSQL, Jupyter |
| **Déploiement** | — | Vercel, CI/CD auto | Docker, GitHub Actions |

---

## Ce que fait MathAData (pour parler avec justesse)

**Problème adressé :** au lycée, difficile de garder la manipulation concrète qu'on a au primaire — le programme est plus complexe, le temps manque.

**Approche :** des défis IA sur de vraies données (reconnaissance d'images, diagnostic médical, chants de baleines…) traduits en maths du programme (2de → terminale). Les élèves expérimentent en classe, font émerger les concepts, puis approfondissent.

**Compétences visées :** chercher, modéliser, représenter, raisonner, calculer, communiquer.

**Échelle actuelle :** ~100 profs formés (académies Lille, Créteil, Paris). Contenus historiques sur notebooks Jupyter / Capytale → migration vers une **plateforme web d'activités** (cœur du produit).

**Exemple d'activité testée :** *Équation réduite de droite pour la classification d'images de chiffres* (2de, BETA) — même challenge MNIST revisité avec plusieurs chapitres (stats, géométrie, produit scalaire…).

---

## Ce que j'ai fait pour me préparer

- [x] Créé un compte sur MathAData
- [x] Regardé la vidéo d'Akim — *Objectifs et démarche du programme MathAData*
- [x] Repéré les vidéos Science Etonnante sur la chaîne (aligné avec ma sensibilité vulgarisation)
- [x] Fait l'activité BETA *Équation réduite de droite pour la classification d'image de chiffres*
- [x] Exploré **nextbooks** — DevTools : Next.js, Tailwind, Radix UI
- [x] Repéré quelques alertes accessibilité Radix (dialogues) dans la console
- [x] Développé 3 démos interactives inspirées de la pédagogie MathAData sur revise-tes-maths.fr

### Ce que j'ai aimé (à mentionner naturellement)

- L'interactivité : faire varier **m** et **p** pour réduire le % d'erreur sur MNIST
- Les badges et la progression gamifiée
- Le lien concret entre un chapitre de cours et un vrai problème de classification

### Observation constructive (à formuler avec tact)

> Sur la diapo **E8**, le calcul du pourcentage d'erreur sur **6073 images** semble long côté client. Est-ce volontaire (montrer le coût du calcul) ou un point d'optimisation à traiter pour le contexte classe ?

*(Montre que tu as testé en profondeur, pas juste survolé.)*

### Mes démos — preuve directe d'alignement MathAData

| Démo | URL | Lien MathAData |
|---|---|---|
| Classification de chiffres | `/demo/classification-chiffres` | TP MNIST — distance, géométrie (2de/1ère) |
| Fréquence cardiaque fœtale | `/demo/frequence-cardiaque` | TP stats — moyenne, histogramme (2de) |
| Dérivée et tangente | `/demo/derivee-tangente` | Analyse — taux d'accroissement (1ère/Terminale) |

> *« J'ai prototypé trois activités interactives en m'inspirant directement de vos TP — classification MNIST, surveillance cardiaque, visualisation de la dérivée. C'est le type d'interface manipulable que décrit votre fiche de poste. »*

---

## Mon positionnement — comment me raconter

> Je construis des interfaces fonctionnelles — j'ai déjà fait du Next.js/React/TypeScript pour une app de suivi pédagogique, et aujourd'hui revise-tes-maths.fr en Astro/TypeScript/Tailwind avec des démos interactives. J'utilise Cursor au quotidien, et ce qui me différencie c'est que je comprends profondément le problème pédagogique que je cherche à résoudre.

> Enseignant → créateur de produits éducatifs → ingénieur logiciel

Ce n'est pas « un dev backend qui fait un peu de front ». C'est quelqu'un qui **identifie un problème pédagogique, conçoit une solution, la développe, la teste avec de vrais utilisateurs et itère** — exactement ce que décrit le poste.

**En une phrase :**

> Je suis product engineer éducatif : depuis 12 ans je travaille avec des élèves, j'ai transformé cette expérience terrain en produits concrets, et j'ai les compétences techniques pour les construire et les faire évoluer.

**Mon différenciateur — à placer tôt et souvent :**

> J'arrive avec un **laboratoire utilisateur intégré**. J'ai des élèves aujourd'hui — lycéens, prépa, école de commerce. Je peux observer leurs difficultés, tester vos activités en conditions réelles et remonter du feedback terrain dès les premières semaines. Très peu de développeurs peuvent faire ça.

**Si on creuse le frontend (reformulé produit, pas défensif) :**

> J'ai d'abord construit une app de suivi en **Next.js/React/TypeScript** — diagramme en étoile de maîtrise, sessions par élève. Puis revise-tes-maths.fr en **Astro/TypeScript/Tailwind** avec des démos interactives inspirées de votre pédagogie. Je ne viens pas d'une équipe frontend de 50 personnes, mais j'ai déjà fait le cycle complet sur **deux stacks web** : problème utilisateur → prototype → mise en prod → retours → itération. Et j'utilise Cursor pour accélérer là où je monte encore en expertise.

---

## « Parle-moi de toi » — script (~90 sec)

Depuis **douze ans**, je travaille avec des élèves — lycéens, prépa, écoles de commerce à Paris et à l'étranger. Ce n'est pas une activité annexe : c'est le cœur de ce que je fais. J'ai accompagné une quarantaine d'élèves sur la durée, et ça m'a appris ce qui marche vraiment en maths : **la répétition, les analogies, le concret avant l'abstraction**.

À force d'enseigner, j'ai identifié des problèmes que les outils existants ne résolvaient pas. Alors j'ai commencé à **concevoir mes propres solutions** : d'abord une **app Next.js** de suivi de révision des annales — chaque élève avait sa session, ses thèmes, un diagramme en étoile de maîtrise — puis **revise-tes-maths.fr**, un site de contenus interactifs que j'ai développé en **Astro, TypeScript et Tailwind**, avec trois démos inspirées de la pédagogie MathAData. Cette année, j'ai aussi conçu tous les supports d'un cours Python/SQL en **notebooks Jupyter** sur Colab pour une école de commerce.

En parallèle, j'ai travaillé comme ingénieur Python — simulation et traitement de données — ce qui m'a donné la rigueur technique pour passer de l'idée au produit qui tourne en prod. Côté IA, j'utilise **Cursor** au quotidien et j'ai déployé un **RAG** en entreprise.

Ce qui m'amène ici : MathAData est le premier endroit où je vois un poste qui correspond exactement à mon arc — **product engineer au service de l'apprentissage des maths**. Et concrètement, si vous me recrutez, j'ai déjà un laboratoire utilisateur : mes élèves particuliers. Je peux tester vos activités, observer ce qui bloque, ce qui fait déclic, et vous remonter du feedback terrain — pas dans six mois, dès les premières semaines.

**Clôture émotionnelle (optionnelle, 15 sec) :**

> Je suis très sensible au fait que beaucoup d'élèves — les filles en particulier — se détournent des sciences. C'est un enjeu de société. MathAData attaque ce problème concrètement, et c'est pour ça que ce poste me parle autant.

**Détails à garder en réserve (si on demande « ton parcours ingénieur ») :**

> Diplômé Sorbonne Université et Observatoire de Paris. Plusieurs années en industrie spatiale — simulation numérique, Python, rigueur mathématique.

---

## Mon cycle Product Engineering (preuve concrète)

| Étape | Exemple concret |
|---|---|
| **Problème identifié** | Mes élèves ne visualisent pas leur progression ; les outils existants ne collent pas au programme |
| **Solution conçue** | App Next.js de suivi par thème + diagramme en étoile → puis site vitrine avec démos interactives |
| **Produit développé** | App Next.js/React/TS (suivi) + revise-tes-maths.fr (Astro/TS/Tailwind) + notebooks Jupyter Colab |
| **Testé avec de vrais utilisateurs** | Élèves particuliers, groupes en classe, retours directs sur ce qui bloque / ce qui fait déclic |
| **Itéré** | Pivot app → site vitrine (priorisation produit : confiance avant feature complexe) + 3 démos MathAData |

> C'est exactement la boucle que MathAData cherche : comprendre le besoin pédagogique, prototyper, tester en classe, améliorer.

---

## Pourquoi MathAData / pourquoi moi

| Eux cherchent | Moi j'apporte |
|---|---|
| **Product engineering** | J'ai déjà fait le cycle complet : problème → solution → dev → test → itération (×2 produits) |
| Comprendre les besoins pédagogiques | 12 ans avec des élèves — je sais ce qui bloque, ce qui fait déclic |
| Prototyper vite, force de proposition | App Next.js, revise-tes-maths.fr, 3 démos MathAData, notebooks Colab, Cursor |
| **Feedback terrain immédiat** | **Laboratoire utilisateur intégré** — élèves actifs, test d'activités dès la semaine 1 |
| Outils IA modernes (agents, MCP, LLM) | Cursor au quotidien, RAG en prod |
| Full-stack Next.js / React / TS | **App Next.js déjà faite** + site Astro/TS + exploration nextbooks |
| Python + données | Notebooks, SQL, simulation, rigueur maths |
| Contexte éducatif réel | Cours en classe, matériel hétérogène, contraintes Colab |
| Petite équipe, autonomie | Profil product engineer généraliste — je porte un sujet de A à Z |

**Phrase de motivation :**

> MathAData est le seul endroit où ma double compétence — product engineer et enseignant de terrain — devient un vrai avantage opérationnel, pas juste une ligne sur un CV.

---

## Parcours équivalent — réalisations techniques concrètes

**Critère fiche de poste :** *« 2–4 ans d'expérience en développement logiciel, ou parcours équivalent (recherche, enseignement, open source, EdTech, reconversion depuis les maths/NSI, etc.) avec réalisations techniques concrètes »*

### Comment je réponds au critère

Je coche **les deux voies**, pas seulement une :

| Voie | Mon cas |
|---|---|
| **Expérience dev classique** | **~5 ans** en ingénierie logiciel Python (Neverhack 2021–2025 + ORUS depuis sept. 2025) — au-dessus du seuil 2–4 ans |
| **Parcours équivalent EdTech / enseignement** | **12 ans** d'accompagnement pédagogique + produits éducatifs que j'ai conçus et développés moi-même |

> En résumé : je ne suis pas un enseignant qui « fait un peu de code », ni un dev qui « a donné quelques cours ». J'ai **5 ans de livraisons logicielles en entreprise** ET **des produits EdTech en production** testés avec de vrais élèves.

---

### Réalisations pro — développement logiciel (~5 ans)

#### ORUS — Ingénieur Python Backend & R&D *(sept. 2025 – aujourd'hui)*

| Réalisation | Détail concret |
|---|---|
| **Backend & simulation** | Modules Python (NumPy, Pandas, Scikit-learn) dans une architecture modulaire existante ; vectorisation, perf simulation |
| **API REST** | Exposition des résultats via FastAPI / Flask |
| **Qualité & CI/CD** | Pytest (couverture cible ≥ 90 %), MyPy, pre-commit, GitLab CI, Docker |
| **RAG en entreprise** | MVP LlamaIndex + embeddings + LLM — chatbot d'interrogation du corpus documentaire interne |
| **Architecture** | Design pattern Adapter pour découpler le cœur métier d'une lib tierce |

#### Neverhack — Ingénieur Python Backend & R&D *(juin 2021 – août 2025, 4 ans)*

| Client / projet | Réalisation concrète | Stack |
|---|---|---|
| **CNES — Simulateur constellations** | Reprise projet existant, visualisation 3D orbites et liaisons inter-satellites (PyVista), parallélisation Dask, livraison finale | Python, PyVista, Dask, Docker, GitLab CI |
| **Airbus DS — Simulateur QKD** | Backend simulation cryptographie quantique, IHM PyQt (remplace CLI), API FastAPI pour lancer des simulations à distance, conteneurisation | Python, FastAPI, PyQt, Docker, Pytest |
| **CNES — Plateforme Satcom CESARS** | Scripts collecte/analyse KPI, automatisation scénarios de tests, services backend supervision | Python, Bash, Linux, FastAPI |
| **DGA — Logiciel essais CEM** | Maintenance logiciel critique 10+ ans, nouveau module de calcul, IHM Qt, base PostgreSQL | Java, C++, Qt, PostgreSQL |
| **Transversal** | Docker, GitLab CI, SonarQube, Pytest sur tous les projets | — |

**Ce que ça démontre pour MathAData :** livrer du logiciel fiable en petit groupe, reprendre du code existant, ajouter des features, tester, containeriser, exposer via API — exactement le profil « petite équipe, autonomie, robustesse ».

---

### Réalisations EdTech / enseignement — parcours équivalent

#### App de suivi de révision des annales *(Next.js / React / TypeScript)*

| Aspect | Détail concret |
|---|---|
| **Problème** | Élèves ne visualisent pas leur progression par thème du programme |
| **Produit** | App web : session par élève, exercices rattachés à des thèmes, **diagramme en étoile** (radar chart) de maîtrise par chapitre |
| **Stack** | **Next.js, React, TypeScript** — app dynamique avec state management |
| **Décision produit** | Pivot vers site vitrine (confiance / acquisition) — preuve de réflexion produit, pas d'abandon technique |

#### revise-tes-maths.fr — plateforme éducative en production *(Astro / TypeScript / Tailwind)*

| Aspect | Détail concret |
|---|---|
| **Problème** | Besoin d'un point d'entrée de confiance + contenus interactifs |
| **Produit** | Site de révision maths avec 3 démos manipulables inspirées MathAData |
| **Stack actuelle** | **Astro 5** (statique) + **TypeScript** (scripts canvas) + **Tailwind CSS** |
| **Démos** | Classification chiffres, fréquence cardiaque fœtale, dérivée/tangente |
| **Infra** | Déploiement Vercel, CI/CD automatique à chaque push Git |
| **Utilisateurs** | Élèves particuliers — retours directs, itérations |

#### ISDBA — Intervenant Python & SQL *(2024 – aujourd'hui)*

| Aspect | Détail concret |
|---|---|
| **Rôle** | Conception complète des supports pédagogiques pour MBA Finance & Marketing |
| **Livrables** | Notebooks Jupyter sur Google Colab, polycopiés LaTeX, exercices, examens, fil rouge data |
| **Collaboration** | Travail direct avec l'équipe pédagogique, adaptation au niveau de la promotion |

**Ce que ça démontre pour MathAData :** même workflow que vous — co-conception pédagogique, notebooks Jupyter, contenus numériques testés en conditions réelles (salles de classe, Colab, matériel hétérogène).

---

### Projets perso complémentaires (preuves techniques additionnelles)

| Projet | Réalisation | Lien MathAData |
|---|---|---|
| **Cinephoria** | Frontend + backend Python sur VPS, cron jobs, agrégation API, admin serveur | Full-stack autonome, pipeline de données |
| **Optimise Ton CV** | Backend FastAPI + workflow LLM (analyse sémantique CV/offre), frontend Next.js | Workflows IA applicatifs — proche de vos usages agents/LLM |
| **Portfolio** | Astro / TS, déploiement Vercel CI/CD | Maîtrise stack web moderne |

---

### Tableau de correspondance — critère → preuve

| Ce qu'ils demandent | Ma preuve concrète |
|---|---|
| 2–4 ans expérience dev | **~5 ans** CDI Python (Neverhack + ORUS), livraisons CNES, Airbus, DGA |
| Parcours enseignement / EdTech | **12 ans** enseignement + ISDBA + revise-tes-maths.fr + app Next.js |
| Réalisations techniques concrètes | Simulateurs livrés, RAG en prod, site éducatif déployé, app Next.js, notebooks Jupyter |
| Python + données | NumPy, Pandas, Dask, PostgreSQL, volumes centaines de Go |
| Full-stack web | **App Next.js/React/TS**, revise-tes-maths.fr (Astro/TS), Cinephoria, Optimise Ton CV, exploration nextbooks |
| Jupyter / contenus interactifs | Cours ISDBA complet sur Colab + 3 démos canvas sur le site |
| Outils IA modernes | RAG LlamaIndex (ORUS), workflow LLM (Optimise Ton CV), Cursor au quotidien |
| CI/CD, Docker, qualité | GitLab CI, Docker, Pytest, MyPy, SonarQube — pratiqué sur tous les postes pro |
| Petite équipe, autonomie | Projets perso de A à Z ; missions où j'étais souvent seul dev sur le scope |

---

### Réponse préparée — si on demande « tu as l'expérience requise ? »

*"Oui, et de deux façons complémentaires.*

*Côté développement logiciel, j'ai environ **cinq ans** d'expérience en CDI — chez Neverhack puis ORUS — sur du Python backend en conditions réelles : simulateurs livrés pour le CNES et Airbus (API FastAPI, visualisation 3D, parallélisation Dask, Docker, CI GitLab, Pytest), maintenance d'un logiciel critique DGA avec PostgreSQL, et récemment un prototype **RAG** en entreprise.*

*Côté parcours équivalent EdTech, j'ai **douze ans** d'enseignement et j'ai transformé ça en produits concrets : une **app Next.js** de suivi de révision avec diagramme en étoile de maîtrise, **revise-tes-maths.fr** — site que j'ai conçu en Astro/TypeScript avec trois démos interactives inspirées de votre pédagogie — et cette année la conception complète d'un cours Python/SQL en **notebooks Jupyter** pour une école de commerce.*

*Ce qui me semble pertinent pour MathAData, c'est que ces deux fils se rejoignent : je sais livrer du logiciel robuste en petite équipe, et je sais concevoir des contenus pédagogiques interactifs — c'est exactement le poste."*

**Variante courte (~30 sec) :**

*"Cinq ans de dev Python en industrie — simulateurs spatiaux, APIs, CI/CD, RAG. Et en parallèle, douze ans d'enseignement transformés en produits EdTech concrets : une app Next.js de suivi, mon site revise-tes-maths.fr avec des démos inspirées de votre pédagogie, des notebooks Jupyter pour une école de commerce. Je coche le critère des deux côtés."*

---

## Réponses préparées — alignées sur la fiche de poste

> **Fil conducteur :** partir de la **valeur produit** (j'ai déjà construit des outils éducatifs de bout en bout) → reconnaissance honnête des gaps techniques restants → preuve d'apprentissage rapide. Jamais de bluff, jamais se vendre en « simple exécutant backend ».

---

### Product engineering — si on demande « c'est quoi ton profil ? »

*"Mon profil, c'est product engineer éducatif. Je pars toujours d'un problème utilisateur concret — mes élèves qui ne visualisent pas leur progression, un cours Python qui manque de supports adaptés — et je construis la solution : conception, développement, test avec de vrais utilisateurs, itération. Une app Next.js de suivi, revise-tes-maths.fr avec des démos inspirées de votre pédagogie, mes notebooks Colab : ce ne sont pas des side projects techniques, ce sont des produits que j'ai pensés pour des besoins réels. Et j'ai encore des élèves aujourd'hui — je peux faire la même chose avec vos activités MathAData."*

---

### JavaScript / TypeScript / React / Next.js

*"J'ai une expérience concrète de **Next.js/React/TypeScript** : j'ai construit une app de suivi de révision où chaque élève avait sa session, ses thèmes par exercice, et un diagramme en étoile de maîtrise. C'est une vraie app dynamique, pas un exercice technique.*

*Aujourd'hui, revise-tes-maths.fr est en **Astro/TypeScript/Tailwind** — un site vitrine avec des démos interactives en canvas, déployé sur Vercel. J'ai fait un choix produit : acquisition et confiance avant la feature complexe de suivi. Mais la stack est proche de la vôtre : TypeScript, Tailwind, composants, interactivité client.*

*Sur votre stack Next.js, je sais lire, modifier et prototyper vite — j'ai exploré nextbooks, et mes démos sur mon site montrent que je sais construire des activités manipulables. J'utilise Cursor pour accélérer. Ce que je garantis : quand le besoin produit est concret, j'apprends et je livre."*

**Si on demande la différence Astro vs Next.js :**

> *« Astro génère du HTML statique au build — idéal pour un site vitrine rapide. Next.js est full-stack : React + routing + API + base de données — idéal pour une plateforme d'activités comme la vôtre. J'ai utilisé les deux, pour des besoins produit différents. »*

---

### Architectures web modernes

*"J'ai architecturé deux produits web avec des choix différents selon le besoin : une app Next.js dynamique pour le suivi personnalisé, un site Astro statique pour l'acquisition et les contenus. Dans les deux cas, j'ai dû trancher : est-ce que cette feature doit être côté client ou serveur ? Quel impact sur la perf en classe ? Ce sont les bonnes questions pour ce poste."*

**À revoir avant l'entretien :**

| Terme | En bref |
|---|---|
| **SSR** | Page générée à chaque requête côté serveur (Next.js `getServerSideProps`) |
| **SSG** | Pages pré-générées au build — rapides, cacheables (Astro, Next.js static) |
| **CSR** | Rendu dans le navigateur après chargement du JS |
| **API routes Next.js** | Endpoints backend dans le même projet Next (`/pages/api` ou App Router) |

---

### DevOps / CI/CD

*"J'ai une vraie pratique, même si ce n'était pas mon rôle principal. Sur les simulateurs spatiaux : Dockerfile + docker-compose pour des environnements reproductibles. Push sur Git → pipeline GitLab CI : tests automatiques, build prod. Sur revise-tes-maths.fr : push → build Astro → déploiement Vercel automatique. Containeriser, valider avant prod — c'est quelque chose que j'ai pratiqué au quotidien."*

---

### Contexte éducatif réel (salles de classe, réseaux, Capytale)

*"Je n'ai pas d'expérience directe avec Capytale, mais j'ai un avantage que peu de devs ont : j'ai des élèves en ce moment. En cours de Python en groupe, j'ai vu à quel point le matériel varie — machines différentes, configs différentes, parfois ça marche un jour et plus le lendemain. Je sais ce que c'est de faire fonctionner un contenu pédagogique dans un environnement hétérogène. Et je peux tester vos activités avec eux pour remonter exactement ce qui coince en conditions réelles — pas en simulation, en vrai."*

---

### Base de données / schémas / pipeline ETL

*"J'ai structuré les données de mon app de suivi — élèves, sessions, exercices, thèmes, niveaux de maîtrise — et manipulé PostgreSQL en projets perso et pro (DGA). Pas encore DBT ou Metabase, mais j'apprends vite quand le besoin produit est clair — comme je l'ai fait en passant de Python pur à une app Next.js puis à un site Astro complet."*

**Stack MathAData à connaître :** PostgreSQL, Payload CMS, DBT, Metabase, Jupyter.

---

### Accessibilité

*"Pas d'expertise poussée, mais un sujet que je prends au sérieux. En explorant nextbooks, j'ai vu dans la console des alertes Radix UI sur les dialogues. Sur mes démos, j'ai ajouté des `aria-label` sur les canvas. C'est exactement le type de détail que j'aime traiter une fois identifié — par rigueur, pas par prétention d'expertise préalable."*

---

### Workflows IA (MCP, agents, LLM) — si on creuse

*"Cursor est mon IDE principal. J'ai aussi déployé un RAG en entreprise — choix d'embedding, chunking, interface de requête. Je vois les agents IA comme des accélérateurs de développement et de prototypage de contenu, pas comme un substitut à la réflexion pédagogique. D'ailleurs, mes trois démos interactives ont été développées avec Cursor — prototypage rapide, exactement ce que décrit votre fiche de poste."*

---

## Questions à leur poser

**Produit & pédagogie**
- Où en est la migration Capytale / Jupyter → plateforme web ? Quels contenus sont déjà migrés ?
- Comment se passe la co-conception avec l'équipe pédagogique au quotidien (rituels, outils) ?
- Quels retours des ~100 profs formés ont le plus influencé le produit récemment ?

**Technique**
- nextbooks vs la future plateforme — même codebase ou bifurcation ?
- Quels sont les principaux défis perf / accessibilité identifiés pour le déploiement en classe ?
- Comment vous utilisez les agents IA en interne aujourd'hui (MCP, génération de contenu…) ?

**Poste & équipe**
- À quoi ressemble une semaine type pour ce rôle ?
- Quelle est la priorité n°1 des 3 premiers mois ?
- Comment se répartissent les décisions produit vs techniques dans une équipe de 2–3 devs ?

**Mon laboratoire utilisateur (argument fort — à placer tôt)**
- J'ai des élèves actifs aujourd'hui — est-ce que tester vos activités avec eux et remonter du feedback structuré serait utile pour l'équipe ?
- Comment intégrez-vous les retours terrain des profs formés dans la roadmap produit ?
- Y a-t-il un format de feedback utilisateur que vous attendez (observations, bugs, suggestions pédagogiques) ?

---

## Stack technique — référence rapide

| Couche | Outils MathAData | Mon expérience |
|---|---|---|
| **Product** | Co-conception pédagogique, UX activités, tests en classe | 12 ans enseignement, app Next.js, revise-tes-maths.fr, **élèves actifs = labo utilisateur** |
| Front | Next.js, React, TS, Tailwind, Radix | **App Next.js/React/TS** (suivi) + site Astro/TS/Tailwind + exploration nextbooks |
| Back & data | Next.js, Python, Jupyter, PostgreSQL, Payload CMS, DBT, Metabase | Python, Jupyter/Colab, PostgreSQL, SQL |
| Infra | Docker, GitHub Actions, CI/CD, monitoring | Docker, GitLab CI, Vercel CI/CD |
| IA | Claude / LLM, agents, MCP | Cursor, RAG en entreprise |

---

## Checklist veille d'entretien

- [ ] Relire la section **Comprendre la stack web — Astro, React, Next.js, TypeScript** (10 min)
- [ ] Relire la section **L'arc revise-tes-maths — deux produits, une vision** (5 min)
- [ ] Relire la section **Parcours équivalent — réalisations techniques** (5 min)
- [ ] Refaire rapidement l'activité BETA équation réduite (10 min)
- [ ] Tester les 3 démos sur revise-tes-maths.fr (5 min)
- [ ] Préparer 2–3 questions depuis la liste ci-dessus
- [ ] Vérifier connexion / lien visio si entretien à distance
- [ ] Avoir revise-tes-maths.fr ouvert en onglet (démo rapide si demandé)

---
