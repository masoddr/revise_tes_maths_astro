# DevBook — Landing page “Accompagnement premium” (revise-tes-maths.fr)
> Objectif : page sobre, sérieuse, orientée conversion (demande d’entretien) sans ton “vendeur”.

---

## 0) Principes UX (à respecter)
- **1 CTA principal** partout : `Demander un entretien`
- **Ton** : calme, institutionnel, précis (éviter superlatifs marketing).
- **Preuve** : années d’expérience + destinations d’études (McGill, Bocconi, King’s).
- **Lecture** : phrases courtes, sections nettes, listes courtes (3–5 items max).
- **Accessibilité** : titres H1/H2 corrects, boutons visibles, contrastes élevés.

---

## 1) Structure de page (sections)
1. `Hero`
2. `Approche`
3. `Disciplines`
4. `Pour qui`
5. `Plateforme`
6. `Organisation`
7. `Stages`
8. `Premier contact`
9. `Footer` (mentions + contact)

---

## 2) Copywriting final (texte exact à intégrer)
### 2.1 HERO
**Titre (H1)**  
Accompagnement académique exigeant en mathématiques et sciences

**Sous-titre**  
Collège & lycée – suivi individuel

**Paragraphe**  
Depuis plus de 9 ans, j’accompagne des élèves de collèges et lycées privés dans leur progression en mathématiques et en sciences, avec une exigence méthodologique alignée sur les standards des meilleures formations françaises et internationales.

**Preuve**  
Certains de mes élèves ont intégré :  
- McGill University  
- Bocconi University  
- King’s College London

**Accroche**  
Un accompagnement sérieux, structuré et durable — pensé pour des élèves capables et des familles impliquées.

**CTA (bouton)**  
→ Demander un entretien

---

### 2.2 UNE APPROCHE FONDÉE SUR LA RIGUEUR ET LA DURÉE
**Titre (H2)**  
Une approche fondée sur la rigueur et la durée

**Sous-titre (H3)**  
Bien plus que du soutien scolaire

**Paragraphe**  
Mon travail ne consiste pas à « faire les exercices à la place de l’élève ».  
Il s’agit d’un accompagnement intellectuel exigeant, construit dans le temps, avec trois objectifs principaux :

**Liste**
- Consolider les bases théoriques  
- Développer une méthode de travail solide et autonome  
- Préparer sereinement les échéances académiques (examens, spécialités, post-bac)

**Phrase de clôture**  
Chaque élève est suivi individuellement, avec une progression adaptée à son niveau, à son établissement et à ses objectifs.

---

### 2.3 DISCIPLINES ENSEIGNÉES
**Titre (H2)**  
Disciplines enseignées

**Liste**
- Mathématiques  
- Physique – Chimie  
- Initiation et approfondissement en Python (algorithmique, logique, rigueur)

**Note**  
Du collège à la terminale, avec une attention particulière portée aux classes à enjeux (3e, Première, Terminale).

---

### 2.4 POUR QUI EST CET ACCOMPAGNEMENT
**Titre (H2)**  
Pour qui est cet accompagnement

**Bloc 1 (H3)**  
Cet accompagnement s’adresse à des élèves :

- Scolarisés dans des établissements exigeants  
- Capables de s’investir régulièrement  
- Souhaitant acquérir une vraie autonomie intellectuelle

**Bloc 2 (H3)**  
Il convient aux familles :

- Qui recherchent un suivi sérieux sur la durée  
- Qui privilégient la qualité à la quantité  
- Qui attendent un cadre clair, structuré et exigeant

**Phrase de cadrage**  
Cet accompagnement n’est volontairement pas pensé pour des demandes ponctuelles ou du soutien scolaire généraliste.

---

### 2.5 UNE PLATEFORME DE TRAVAIL DÉDIÉE AUX ÉLÈVES SUIVIS
**Titre (H2)**  
Une plateforme de travail dédiée aux élèves suivis

**Paragraphe**  
Les élèves que j’accompagne ont accès à une plateforme de travail exclusive, intégrée au suivi pédagogique.

**Liste**
- Des exercices ciblés par chapitre, de la 3e à la Terminale  
- L’accès aux annales des examens (jusqu’aux 10 dernières années pour le bac)  
- Un suivi précis du travail réalisé  
- Une vision claire des notions maîtrisées et à consolider

**Phrase de clôture**  
Cette plateforme n’est pas un produit autonome : elle fait partie intégrante de l’accompagnement.

---

### 2.6 ORGANISATION DES COURS
**Titre (H2)**  
Organisation des cours

**Liste**
- Cours hebdomadaires réguliers (présentiel ou visio selon les situations)  
- Suivi sur l’année scolaire  
- Échanges possibles avec les familles lorsque nécessaire  
- Ajustement du rythme selon les périodes clés

---

### 2.7 STAGES INTENSIFS PENDANT LES VACANCES
**Titre (H2)**  
Stages intensifs pendant les vacances

**Paragraphe**  
Des stages de révision et de consolidation sont proposés pendant les vacances scolaires :

**Liste**
- Remise à niveau ciblée  
- Approfondissement méthodologique  
- Préparation aux échéances importantes (brevet, bac, spécialités)

**Formats (mini-liste)**
- Individuel  
- Mini-groupes très restreints (même niveau, mêmes objectifs)

---

### 2.8 PREMIER CONTACT
**Titre (H2)**  
Premier contact

**Paragraphe**  
Afin de garantir un accompagnement de qualité, je prends le temps d’échanger avec chaque famille en amont.

**Paragraphe + liste**  
Un premier entretien permet de :
- Comprendre le parcours de l’élève  
- Clarifier les attentes  
- Vérifier l’adéquation avec ma méthode de travail

**CTA (bouton)**  
→ Demander un entretien

---

## 3) Spécifications UI/Design (sobre)
- Fond clair (blanc cassé), texte anthracite, 1 couleur d’accent.
- Largeur max contenu : 960–1040px
- Titres : hiérarchie nette (H1 grand, H2 moyen, H3 petit)
- Sections : alternance “bloc texte” + “carte” (cards discrètes)
- CTA : bouton plein + rappel en bas de page
- Aucun compteur, aucune promesse chiffrée agressive.

---

## 4) Composants (Astro ou Nuxt) — checklist
- `HeroSection`
- `Section` générique (title/subtitle/body)
- `BulletList`
- `Card` (pour “Plateforme”, “Organisation”, “Stages”)
- `CTAButton` + `CTAInline`
- `ContactForm` (minimal : classe, établissement, objectif, dispo, contact)

---

## 5) Formulaire (champs conseillés)
- Classe (select)
- Établissement (input)
- Objectif (select : Progression générale /  Préparation au bac / Python)
- Disponibilités (textarea)
- Email + téléphone

Message de confirmation :  
“Merci. Je reviens vers vous sous 48h ouvrées pour proposer un créneau d’échange.”

---

## 6) TODO technique (pour Cursor)
- Créer page `/` ou `/presentation` avec cette structure.
- Ajouter ancres : `#approche #disciplines #plateforme #stages #contact`
- Ajouter un `SEO` minimal : title, description, open graph.
- Mettre le CTA en sticky sur mobile (optionnel, discret).

---