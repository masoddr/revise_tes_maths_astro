# 🎯 Landing Page Google Ads - Version V1

## ✅ Structure créée

### Above the fold (Hero)
- **H1 optimisé SEO** : "Cours de maths Terminale et préparation au Bac"
- **Badge de crédibilité** : "Prof ingénieur • 10+ ans d'expérience"
- **Sous-titre orienté bénéfices** : "Accompagnement structuré pour progresser rapidement"
- **Triple CTA** :
  - WhatsApp (vert, prioritaire)
  - Appel gratuit 10 min (bordure noire)
  - Formulaire court (sticky sur desktop)
- **Trust signals** : "Réponse sous 24h • Sans engagement • Aucun démarchage"
- **3 métriques sociales** (placeholders à remplir)

### Sections principales

1. **Témoignages courts** (3 témoignages format: prénom + classe + résultat)
2. **Comment ça marche** (3 étapes visuelles)
3. **Pour qui / Pas pour qui** (qualification des visiteurs)
4. **Tarifs** (2 formules avec placeholders)
5. **FAQ** (7 questions orientées objections)
6. **CTA final** (triple option + formulaire complet)

## 🔍 Optimisation SEO intégrée

### Mots-clés Google Ads naturellement intégrés :
- ✅ "cours maths terminale"
- ✅ "préparation bac maths"
- ✅ "prof maths à domicile"
- ✅ "cours intensifs bac"
- ✅ "soutien scolaire maths"

### Emplacements des mots-clés :
- H1, H2, H3
- Paragraphes de contenu
- FAQ
- Section "Pour qui"

## 📝 Placeholders à remplir

### Témoignages (3)
```javascript
{
  prenom: "[[A REMPLIR]]",
  classe: "[[A REMPLIR]]", // Ex: "Terminale S"
  resultat: "[[A REMPLIR]]" // Ex: "Passé de 8/20 à 15/20 en 3 mois"
}
```

### Métriques (3)
- `progressionMoyenne`: "[[A REMPLIR]]" // Ex: "+3,5 points"
- `tauxSatisfaction`: "[[A REMPLIR]]" // Ex: "98%"
- `nbElevesSuivis`: "[[A REMPLIR]]" // Ex: "150+"

### Tarifs
- À l'heure : "À partir de [[A REMPLIR]] €/h"
- Pack mensuel : "[[A REMPLIR]] €/mois ([[A REMPLIR]] cours de [[A REMPLIR]]h)"

## 🎨 Design

- **Mobile-first** : responsive dès 320px
- **Sticky CTA mobile** : bouton WhatsApp flottant en bas à gauche
- **Formulaire sticky desktop** : reste visible lors du scroll
- **Couleurs** : bleu (#2563eb) pour accent, vert (#25D366) pour WhatsApp
- **Typographie** : hiérarchie claire (H1: 3xl-5xl, H2: 2xl-3xl)

## 📊 Tracking Google Ads intégré

### Événements trackés :
- ✅ Clics CTA (WhatsApp, Appel, Formulaire)
- ✅ Soumission formulaire (conversion principale)
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Temps sur page (>30 secondes)

### Code à configurer :
Dans `ContactFormSimple.astro`, ligne 144, remplacer :
```javascript
'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'
```
Par votre ID de conversion Google Ads réel.

## 🚀 Prochaines étapes

1. **Remplir les placeholders** avec de vraies données
2. **Configurer le tracking Google Ads** (ID de conversion)
3. **Tester sur mobile** (vérifier sticky CTA)
4. **Lancer campagne Google Ads** avec cette landing page
5. **Monitorer conversions** dans Google Ads
