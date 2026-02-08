# 🚀 Landing Page Google Ads - Version V2 (A/B Test)

## 🎯 Objectif V2

Créer **2 variantes de hero** pour tester quelle approche convertit le mieux :
- **Variante A** : Orientée bénéfices/émotions (confiance, réussite)
- **Variante B** : Orientée problèmes/solutions (difficultés, résultats)

## 📋 Variante A : "Bénéfices/Émotions"

### Hero Section
```html
<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
  Votre enfant va reprendre confiance en maths
</h1>

<p class="text-lg md:text-xl text-gray-700 mb-2 font-medium">
  Accompagnement Terminale et préparation Bac avec un prof expérimenté
</p>

<p class="text-base md:text-lg text-gray-600 mb-6 lg:mb-8">
  Méthode structurée • Résultats mesurables • Suivi personnalisé
</p>

<!-- Badge d'urgence (optionnel) -->
<div class="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
  ⚠️ Places limitées ce mois-ci
</div>
```

### Points de différenciation :
- **Tonalité** : Positive, rassurante, orientée réussite
- **Focus** : Confiance, progression, accompagnement
- **Urgence** : Badge "Places limitées" (optionnel)
- **CTA** : "Commencer maintenant" (plus direct)

## 📋 Variante B : "Problèmes/Solutions"

### Hero Section
```html
<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
  Votre enfant perd des points en maths malgré le travail ?
</h1>

<p class="text-lg md:text-xl text-gray-700 mb-2 font-medium">
  Un prof expérimenté peut changer la donne avant le Bac
</p>

<p class="text-base md:text-lg text-gray-600 mb-6 lg:mb-8">
  Cours Terminale • Préparation Bac • Résultats garantis
</p>

<!-- Liste problèmes courts -->
<ul class="space-y-2 mb-6 text-sm text-gray-700">
  <li class="flex items-start gap-2">
    <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
    </svg>
    Les notes stagnent malgré les efforts
  </li>
  <li class="flex items-start gap-2">
    <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
    </svg>
    Le Bac approche et le stress monte
  </li>
  <li class="flex items-start gap-2">
    <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
    </svg>
    Les bases ne sont pas solides
  </li>
</ul>
```

### Points de différenciation :
- **Tonalité** : Directe, orientée problèmes, empathique
- **Focus** : Difficultés actuelles, urgence Bac
- **CTA** : "Obtenir de l'aide maintenant" (plus orienté solution)

## 🔬 Implémentation A/B Test

### Option 1 : Google Optimize (recommandé)
1. Créer 2 variantes dans Google Optimize
2. Cibler 50% du trafic sur chaque variante
3. Objectif : Taux de conversion (formulaire soumis)

### Option 2 : Google Ads Experiments
1. Créer 2 landing pages :
   - `/cours-maths-google-ads` (Variante A)
   - `/cours-maths-google-ads-v2` (Variante B)
2. Créer 2 groupes d'annonces identiques
3. Lier chaque groupe à sa landing page
4. Comparer les performances après 2 semaines

### Option 3 : JavaScript simple (quick test)
```javascript
// Dans cours-maths-google-ads.astro
<script>
  // Random A/B test (50/50)
  const variant = Math.random() < 0.5 ? 'A' : 'B';
  
  if (variant === 'B') {
    // Changer le H1
    const h1 = document.querySelector('#hero h1');
    if (h1) {
      h1.textContent = "Votre enfant perd des points en maths malgré le travail ?";
    }
    
    // Track variant
    if (typeof gtag !== 'undefined') {
      gtag('event', 'ab_test', {
        'event_category': 'Experiment',
        'event_label': 'Variant B',
        'value': 1
      });
    }
  } else {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'ab_test', {
        'event_category': 'Experiment',
        'event_label': 'Variant A',
        'value': 1
      });
    }
  }
</script>
```

## 📊 Métriques à comparer

### KPIs principaux :
1. **Taux de conversion** (formulaire soumis / visiteurs)
2. **Taux de clic CTA** (WhatsApp, Appel, Formulaire)
3. **Temps moyen sur page**
4. **Taux de rebond**
5. **Scroll depth** (quelle variante fait rester plus longtemps)

### Seuil de significativité :
- **Minimum 100 conversions** par variante avant de conclure
- **Durée minimale** : 2 semaines
- **Significativité statistique** : 95% de confiance

## 🎯 Recommandations

### Si Variante A gagne :
- Tonalité positive fonctionne mieux
- Focus sur bénéfices et confiance
- Garder cette approche et tester d'autres éléments (CTA, couleurs)

### Si Variante B gagne :
- Tonalité problème/solution plus efficace
- Focus sur difficultés et urgence
- Tester d'autres problèmes spécifiques

### Si égalité :
- Tester d'autres éléments :
  - Couleur CTA (vert vs bleu vs noir)
  - Position formulaire (droite vs gauche vs centre)
  - Longueur du texte hero
  - Présence/absence de badge urgence

## 🚀 Autres tests à envisager (V3)

1. **CTA couleur** : Vert WhatsApp vs Bleu vs Noir
2. **Position formulaire** : Sticky droite vs Inline vs Popup
3. **Longueur hero** : Court vs Long avec plus de détails
4. **Témoignages** : 3 courts vs 1 long détaillé
5. **Urgence** : Avec badge "Places limitées" vs Sans
