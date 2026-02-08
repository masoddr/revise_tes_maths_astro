# 📋 Plan Complet - Landing Page Google Ads Optimisée

## 🎯 Résumé de la mission

Refondre la landing page `/cours-maths-google-ads` pour :
- ✅ Augmenter le taux de conversion (WhatsApp / appel / formulaire)
- ✅ Réduire la friction
- ✅ Filtrer les visiteurs non qualifiés
- ✅ Optimiser pour Google Ads (mots-clés ciblés)

---

## 📁 Fichiers créés

### 1. Landing Page V1 (Production)
**Fichier** : `src/pages/cours-maths-google-ads.astro`

**Contenu** :
- Hero optimisé above-the-fold avec triple CTA
- Sections : Témoignages, Comment ça marche, Pour qui/Pas pour qui, Tarifs, FAQ
- Tracking Google Ads intégré (conversions, événements)
- Design responsive mobile-first
- Placeholders pour témoignages et métriques

### 2. Documentation V1
**Fichier** : `LANDING_PAGE_GOOGLE_ADS_V1.md`

**Contenu** :
- Structure détaillée
- Placeholders à remplir
- Instructions de configuration

### 3. Proposition V2 (A/B Test)
**Fichier** : `LANDING_PAGE_GOOGLE_ADS_V2.md`

**Contenu** :
- 2 variantes de hero (Bénéfices vs Problèmes)
- Instructions d'implémentation A/B test
- Métriques à comparer

### 4. Checklist Tracking
**Fichier** : `CHECKLIST_TRACKING_GOOGLE_ADS.md`

**Contenu** :
- Checklist complète avant/après lancement
- Configuration Google Ads
- Outils de vérification
- Objectifs de performance

---

## 🚀 Plan d'action immédiat

### Étape 1 : Remplir les placeholders (30 min)

#### Témoignages (3)
Ouvrir `src/pages/cours-maths-google-ads.astro`, lignes 10-25 :
```javascript
const testimonials = [
  {
    prenom: "Marie", // Exemple
    classe: "Terminale S",
    resultat: "Passé de 9/20 à 16/20 en 4 mois grâce à l'accompagnement structuré"
  },
  // ... 2 autres
];
```

#### Métriques (3)
Lignes 27-31 :
```javascript
const metrics = {
  progressionMoyenne: "+3,5 points", // Exemple
  tauxSatisfaction: "98%",
  nbElevesSuivis: "150+"
};
```

#### Tarifs
Lignes ~330-350 :
- À l'heure : "À partir de 45 €/h" (exemple)
- Pack mensuel : "180 €/mois (4 cours de 1h30)"

### Étape 2 : Configurer le tracking Google Ads (15 min)

1. **Aller dans Google Ads** :
   - Outils → Conversions → Nouveau
   - Type : "Soumission de formulaire"
   - Nom : "Formulaire contact landing Google Ads"
   - Récupérer l'ID : `AW-XXXXXXXXX/YYYYYYYYYYYYYYYY`

2. **Configurer dans le code** :
   - Ouvrir `src/components/ContactFormSimple.astro`
   - Ligne 144 : Remplacer `'AW-CONVERSION_ID/CONVERSION_LABEL'` par votre ID réel

3. **Tester** :
   - Soumettre le formulaire
   - Vérifier dans Google Tag Assistant (extension Chrome)
   - Vérifier dans Google Ads → Conversions (peut prendre 24h)

### Étape 3 : Tester la page (10 min)

- [ ] Ouvrir `/cours-maths-google-ads` sur mobile
- [ ] Vérifier que le bouton WhatsApp sticky apparaît en bas
- [ ] Tester les 3 CTA (WhatsApp, Appel, Formulaire)
- [ ] Vérifier que le formulaire s'affiche correctement
- [ ] Vérifier console navigateur (pas d'erreurs JS)

### Étape 4 : Lancer la campagne Google Ads

- [ ] Créer/modifier campagne Google Ads
- [ ] Pointer vers `/cours-maths-google-ads`
- [ ] Configurer mots-clés ciblés :
  - `[cours maths terminale]`
  - `[préparation bac maths]`
  - `[prof maths à domicile]`
  - `[cours intensifs bac]`
  - `[soutien scolaire maths]`
- [ ] Lancer avec budget test (50€ pour commencer)

---

## 📊 Structure de la landing page V1

### Above the fold (Hero)
```
┌─────────────────────────────────────┐
│ Badge: "Prof ingénieur • 10+ ans"  │
│ H1: "Cours de maths Terminale..."   │
│ Sous-titre + Bénéfices             │
│                                     │
│ [WhatsApp] [Appel] [Formulaire]     │
│ Trust signals (3)                   │
│                                     │
│ Métriques (3 chiffres)              │
└─────────────────────────────────────┘
```

### Sections principales
1. **Témoignages** (3 courts)
2. **Comment ça marche** (3 étapes)
3. **Pour qui / Pas pour qui** (qualification)
4. **Tarifs** (2 formules)
5. **FAQ** (7 questions)
6. **CTA Final** (triple option + formulaire)

---

## 🎨 Optimisations CRO intégrées

### Réduction de friction
- ✅ Formulaire court (2 champs : Prénom + Téléphone)
- ✅ Triple CTA (WhatsApp, Appel, Formulaire)
- ✅ Sticky CTA mobile (WhatsApp toujours visible)
- ✅ Formulaire sticky desktop (reste visible au scroll)
- ✅ Trust signals visibles (Réponse sous 24h, Sans engagement)

### Qualification des visiteurs
- ✅ Section "Pour qui / Pas pour qui" (filtre les non-qualifiés)
- ✅ FAQ orientée objections (prix, visio, niveau, etc.)
- ✅ Microcopy anti-spam ("Aucun démarchage")

### Preuves sociales
- ✅ 3 témoignages courts
- ✅ 3 métriques (progression, satisfaction, élèves suivis)
- ✅ Badge crédibilité (Prof ingénieur, 10+ ans)

### Optimisation SEO
- ✅ Mots-clés Google Ads intégrés naturellement
- ✅ H1 optimisé : "Cours de maths Terminale et préparation au Bac"
- ✅ Structure sémantique (H2, H3)
- ✅ Meta description optimisée

---

## 📈 Objectifs de performance

### Taux de conversion
- **Minimum acceptable** : 2%
- **Objectif** : 5%
- **Excellent** : 10%+

### Coût par conversion
- **Maximum acceptable** : 50€
- **Objectif** : 30€
- **Excellent** : < 20€

### Temps sur page
- **Minimum** : 1 minute
- **Objectif** : 2 minutes
- **Excellent** : 3+ minutes

---

## 🔬 Tests à envisager (V2)

### A/B Test Hero
- **Variante A** : Orientée bénéfices/émotions
- **Variante B** : Orientée problèmes/solutions
- **Durée** : 2 semaines minimum
- **Seuil** : 100 conversions par variante

### Autres tests possibles
1. Couleur CTA (vert vs bleu vs noir)
2. Position formulaire (sticky vs inline)
3. Longueur hero (court vs long)
4. Présence badge urgence ("Places limitées")

---

## 📞 Support et ressources

### Documentation créée
- `LANDING_PAGE_GOOGLE_ADS_V1.md` : Structure et placeholders
- `LANDING_PAGE_GOOGLE_ADS_V2.md` : Proposition A/B test
- `CHECKLIST_TRACKING_GOOGLE_ADS.md` : Checklist complète

### Outils recommandés
- **Google Tag Assistant** : Vérifier tracking
- **PageSpeed Insights** : Optimiser vitesse
- **Google Ads Experiments** : A/B testing

### Prochaines étapes après lancement
1. Monitorer conversions quotidiennement (semaine 1)
2. Analyser données engagement (scroll, temps)
3. Optimiser selon résultats (semaine 2-4)
4. Lancer A/B test V2 si besoin

---

## ✅ Checklist finale avant go-live

- [ ] Placeholders remplis (témoignages, métriques, tarifs)
- [ ] Tracking Google Ads configuré et testé
- [ ] Page testée sur mobile et desktop
- [ ] Console navigateur vérifiée (pas d'erreurs)
- [ ] Google Tag Assistant : tous les tags détectés
- [ ] Page Speed > 90 (PageSpeed Insights)
- [ ] Campagne Google Ads créée/modifiée
- [ ] Mots-clés configurés avec correspondance exacte `[mot-clé]`

---

**Date de création** : 8 février 2026  
**Version** : V1 (Production Ready)  
**Statut** : ✅ Prêt à déployer (après remplissage placeholders)
