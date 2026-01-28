# Guide complet Google Ads - revise-tes-maths.fr

## 🎯 Objectif
Faire apparaître le site pour : "cours de maths paris", "cours de maths visio"

---

## 📊 Structure des 3 campagnes

| Campagne | Budget/mois | CPC max | Landing page | Ciblage |
|----------|-------------|---------|--------------|---------|
| **Visio** | 100-200€ | 3€ | `/cours-maths-visio` | Toute la France |
| **Paris** | 100-200€ | 4€ | `/cours-paris` | Paris + région (rayon 10-15km) |

**Budget total** : 300-600€/mois (15-21€/jour)

---

## 🚀 Création du compte et première campagne

### Étape 1 : Créer le compte
1. Allez sur [ads.google.com](https://ads.google.com)
2. Objectif : "Obtenir plus d'appels ou de visites sur votre site web"
3. Site web : `https://revise-tes-maths.fr`
4. Pays : France, Fuseau : Europe/Paris
5. Ajoutez votre carte bancaire

### Étape 2 : Créer la campagne Visio
1. **Créer une campagne** → Type "Recherche"
2. **Nom** : `Cours de maths visio`
3. **Réseaux** : ✅ Google Recherche uniquement
4. **Budget quotidien** : `5-7€`
5. **Enchère** : CPC manuel, max `3€`

### Étape 3 : Groupe d'annonces
**Nom** : `Visio - Correspondance exacte`

**Mots-clés** (correspondance exacte `[mot-clé]`) :
```
[cours de maths visio]
[cours de maths en visio]
[prof maths visio]
```

**Annonce 1** :
- Titre 1 : `Cours de Maths en Visio`
- Titre 2 : `Prof Expérimenté | 100%`
- Titre 3 : `Réussite Brevet & Bac`
- Description 1 : `Accompagnement personnalisé en visioconférence. Collège & Lycée. Premier échange gratuit.`
- Description 2 : `Ingénieur systèmes spatiaux. Cours adaptés à votre niveau. Réponse sous 24h.`
- URL : `https://revise-tes-maths.fr/cours-maths-visio`

**Annonce 2** :
- Titre 1 : `Prof Maths Visio`
- Titre 2 : `Cours en Ligne | Flexible`
- Titre 3 : `7j/7 | Premier Échange Gratuit`
- Description 1 : `Cours de maths à distance adaptés à votre niveau. Accompagnement rigoureux collège & lycée.`
- Description 2 : `100% de réussite au Brevet et Bac. Horaires flexibles. Réponse garantie sous 24h.`
- URL : `https://revise-tes-maths.fr/cours-maths-visio`

### Étape 4 : Extensions (obligatoires)
**Sitelinks** :
- Cours en visio → `/cours-maths-visio`
- Annales corrigées → `/annales`
- Tarifs → `/tarifs`
- À propos → `/a-propos`

**Snippets structurés** :
- Premier échange gratuit
- Réponse sous 24h
- Horaires flexibles 7j/7
- 100% de réussite au Brevet et Bac

**Téléphone** : `+33 6 16 63 51 87`

---

## 🏙️ Campagne Paris (dupliquer Visio)

### Modifications
- **Nom** : `Cours de maths Paris`
- **Budget** : `5-7€/jour`, CPC max : `4€`
- **Ciblage** : Paris (75) 10km, 92/93/94 15km, 77/78/91/95 10km

**Mots-clés** :
```
[cours de maths paris]
[prof maths paris]
```

**Annonce 1** :
- Titre 1 : `Cours de Maths à Paris`
- Titre 2 : `En Visio | Flexible & Efficace`
- Titre 3 : `Prof Expérimenté | 100% Réussite`
- Description 1 : `Cours de maths en visioconférence pour Paris et région. Accompagnement personnalisé collège & lycée.`
- Description 2 : `Premier échange gratuit. Réponse sous 24h. Horaires flexibles 7j/7.`
- URL : `https://revise-tes-maths.fr/cours-paris`

**Annonce 2** :
- Titre 1 : `Prof Maths Paris`
- Titre 2 : `Cours en Ligne | 100% Réussite`
- Titre 3 : `Disponible Paris & Région`
- Description 1 : `Accompagnement rigoureux en visio. Disponible pour Paris et toute la France. Premier échange gratuit.`
- Description 2 : `Ingénieur systèmes spatiaux. Cours adaptés à votre niveau. Réponse garantie sous 24h.`
- URL : `https://revise-tes-maths.fr/cours-paris`

---


## ⚙️ Configuration avancée

### Mots-clés négatifs (à ajouter partout)
```
gratuit
pdf
exercices
cours en ligne gratuit
annales
télécharger
```

### Horaires d'affichage
- **Lundi-Vendredi 17h-21h** : 100% (après l'école)
- **Samedi-Dimanche 9h-20h** : 100% (week-end)
- **Lundi-Vendredi 9h-17h** : 50% (réduire)

---

## 📊 Tag de conversion

### Installation
1. **Outils** → **Conversions** → **Nouvel objectif**
2. Type : "Site web" → "Soumission de formulaire"
3. Nom : "Formulaire de contact"
4. Copiez le code fourni par Google

**Code à ajouter dans `Layout.astro`** (dans `<head>`) :
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX');
</script>
```
**Remplacez `AW-XXXXXXXXX`** par votre ID Google Ads.

---

## 🚀 Lancement

### Checklist avant activation
- [ ] 3 campagnes créées
- [ ] Mots-clés ajoutés (correspondance exacte)
- [ ] 2 annonces par groupe minimum
- [ ] Extensions configurées
- [ ] Mots-clés négatifs ajoutés
- [ ] Horaires configurés
- [ ] Tag de conversion installé
- [ ] Budgets définis

### Activation
1. Activez les 3 campagnes (bouton pause/play)
2. **Commencez avec budget réduit** (50% du budget cible)
3. Surveillez quotidiennement les 3 premiers jours

---

## 📈 Optimisation (après 1-2 semaines)

### Objectifs de performance
- **CTR** : > 3%
- **CPC moyen** : < 4€
- **Taux de conversion** : > 5%
- **Coût par conversion** : < 80€

### Actions
- **Pauser** mots-clés avec CTR < 1%
- **Augmenter** enchères pour mots-clés performants
- **Créer** nouvelles variantes d'annonces
- **Ajouter** mots-clés négatifs au fur et à mesure

---

## ⚠️ Points d'attention

### Concurrence
- **Paris** : Très concurrentiel, enchères élevées
- **Visio** : Niche moins saturée, opportunité

### Saisonnalité
- **Pic** : Sept-Oct (rentrée), Jan-Fév (examens), Mai-Juin (Brevet/Bac)
- **Baisse** : Juillet-Août (vacances)
- **Ajustez** les budgets selon la période

---

## 📞 Support

- [Centre d'aide Google Ads](https://support.google.com/google-ads)
- [Planificateur de mots-clés](https://ads.google.com/aw/keywordplanner)

---

## ✅ Résumé rapide

**3 campagnes** : Visio, Paris  
**Budget** : 15-21€/jour (450-630€/mois)  
**Mots-clés** : Correspondance exacte uniquement  
**Annonces** : 2 par groupe minimum  
**Extensions** : Sitelinks + Snippets + Téléphone  
**Mots-clés négatifs** : Ajouter partout  
**Tag conversion** : Installer avant lancement  

**Bon courage ! 🚀**


