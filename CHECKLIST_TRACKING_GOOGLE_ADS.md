# ✅ Checklist Tracking Google Ads - Landing Page

## 🎯 Objectif
S'assurer que toutes les conversions et événements sont correctement trackés pour optimiser les campagnes Google Ads.

---

## 📋 AVANT LE LANCEMENT

### 1. Configuration Google Ads Tag
- [ ] **Google Ads Tag installé** dans `Layout.astro` (déjà fait ✅)
- [ ] **ID Google Ads vérifié** : `AW-17870752943` (vérifier que c'est le bon)
- [ ] **Tag testé** avec Google Tag Assistant (extension Chrome)

### 2. Conversion principale : Formulaire de contact
- [ ] **Créer conversion dans Google Ads** :
  - Type : "Soumission de formulaire"
  - Nom : "Formulaire contact landing Google Ads"
  - Catégorie : "Lead"
  - Valeur : 1 (ou valeur moyenne d'un lead)
  - Comptage : "Une"
  - Fenêtre de conversion : 30 jours
  - Fenêtre d'attribution : 30 jours

- [ ] **Récupérer l'ID de conversion** :
  - Format : `AW-XXXXXXXXX/YYYYYYYYYYYYYYYY`
  - Exemple : `AW-17870752943/AbCdEfGhIjKlMnOpQrStUvWxYz`

- [ ] **Configurer dans `ContactFormSimple.astro`** :
  - Ligne 144 : Remplacer `'AW-CONVERSION_ID/CONVERSION_LABEL'` par votre ID réel
  - Vérifier que le code s'exécute après soumission réussie

- [ ] **Tester la conversion** :
  - Soumettre le formulaire
  - Vérifier dans Google Ads → Conversions (peut prendre 24h)
  - Utiliser Google Tag Assistant pour vérifier en temps réel

### 3. Événements secondaires (Engagement)

#### Clics CTA
- [ ] **WhatsApp Hero** : Tracké ✅ (ligne ~60 de cours-maths-google-ads.astro)
- [ ] **Call Hero** : Tracké ✅ (ligne ~75)
- [ ] **WhatsApp Final** : Tracké ✅ (ligne ~450)
- [ ] **Call Final** : Tracked ✅ (ligne ~465)
- [ ] **Form Final** : Tracké ✅ (ligne ~480)

**Vérifier** : Chaque CTA a un `onclick` avec `gtag('event', 'click', ...)`

#### Scroll Depth
- [ ] **Code présent** ✅ (script en bas de cours-maths-google-ads.astro)
- [ ] **Seuils configurés** : 25%, 50%, 75%, 100% ✅
- [ ] **Créer événements dans Google Ads** :
  - Google Ads → Outils → Conversions → Nouveau
  - Type : "Autre"
  - Nom : "Scroll 25%", "Scroll 50%", "Scroll 75%", "Scroll 100%"
  - Catégorie : "Engagement"

#### Temps sur page
- [ ] **Code présent** ✅ (script en bas)
- [ ] **Seuil configuré** : 30 secondes ✅
- [ ] **Créer événement dans Google Ads** :
  - Nom : "Temps sur page 30s+"
  - Catégorie : "Engagement"

### 4. UTM Parameters
- [ ] **Vérifier que Google Ads ajoute automatiquement les UTM** :
  - `utm_source=google`
  - `utm_medium=cpc`
  - `utm_campaign=[nom_campagne]`
  - `utm_term=[mot_clé]`
  - `utm_content=[id_annonce]`

- [ ] **Tester avec un lien de test** :
  ```
  https://revise-tes-maths.fr/cours-maths-google-ads?utm_source=google&utm_medium=cpc&utm_campaign=test&utm_term=test&utm_content=test
  ```

### 5. Page Speed
- [ ] **Tester avec PageSpeed Insights** :
  - URL : https://pagespeed.web.dev/
  - Objectif : Score > 90 (mobile et desktop)
  - Actions si score < 90 :
    - Optimiser les images (WebP, lazy loading)
    - Minifier CSS/JS
    - Réduire les polices (charger seulement les poids nécessaires)

- [ ] **Vérifier Core Web Vitals** :
  - LCP (Largest Contentful Paint) : < 2.5s
  - FID (First Input Delay) : < 100ms
  - CLS (Cumulative Layout Shift) : < 0.1

---

## 📊 APRÈS LE LANCEMENT (Monitoring)

### Semaine 1
- [ ] **Vérifier conversions quotidiennement** :
  - Google Ads → Conversions
  - Comparer avec les soumissions réelles du formulaire
  - Si écart > 20%, investiguer

- [ ] **Vérifier événements engagement** :
  - Google Ads → Outils → Conversions
  - Vérifier que scroll depth et temps sur page sont trackés

- [ ] **Analyser taux de conversion** :
  - Objectif : > 3% (formulaire soumis / visiteurs)
  - Si < 1% : problème de tracking ou de landing page

### Semaine 2-4
- [ ] **Optimiser selon données** :
  - Identifier CTA le plus cliqué (WhatsApp vs Appel vs Formulaire)
  - Identifier section la plus scrollée
  - Ajuster la page en conséquence

- [ ] **Comparer avec autres pages** :
  - Si plusieurs landing pages, comparer taux de conversion
  - Garder la meilleure et améliorer les autres

---

## 🔧 OUTILS DE VÉRIFICATION

### 1. Google Tag Assistant
- Extension Chrome : https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk
- **Utilisation** :
  1. Activer l'extension
  2. Visiter la landing page
  3. Vérifier que tous les tags sont détectés
  4. Tester les événements (clic CTA, scroll, etc.)

### 2. Google Analytics (si installé)
- Vérifier événements dans GA4 → Événements
- Comparer avec Google Ads pour cohérence

### 3. Google Ads Conversion Tracking
- Google Ads → Outils → Conversions
- Vérifier que les conversions apparaissent dans les 24-48h

### 4. Test en conditions réelles
- [ ] **Créer une campagne de test** avec budget minimal (5€)
- [ ] **Cliquer sur votre propre annonce** (une fois)
- [ ] **Soumettre le formulaire**
- [ ] **Vérifier que la conversion apparaît** dans Google Ads

---

## ⚠️ PROBLÈMES COURANTS ET SOLUTIONS

### Problème 1 : Conversions ne s'enregistrent pas
**Causes possibles** :
- ID de conversion incorrect
- Code JavaScript non exécuté
- Bloqueur de pub activé

**Solutions** :
1. Vérifier ID dans Google Tag Assistant
2. Vérifier console navigateur (erreurs JS)
3. Tester sans bloqueur de pub

### Problème 2 : Conversions en double
**Cause** : Code de conversion appelé plusieurs fois

**Solution** : Vérifier que le code n'est appelé qu'une fois après soumission réussie

### Problème 3 : Événements engagement ne s'enregistrent pas
**Cause** : Code JavaScript non chargé ou erreur

**Solution** : Vérifier console navigateur et Google Tag Assistant

### Problème 4 : UTM parameters manquants
**Cause** : Configuration Google Ads incorrecte

**Solution** : Vérifier paramètres de suivi dans Google Ads → Paramètres de suivi

---

## 📈 OBJECTIFS DE PERFORMANCE

### Taux de conversion cible
- **Minimum** : 2% (formulaire soumis / visiteurs)
- **Objectif** : 5%
- **Excellent** : 10%+

### Coût par conversion cible
- **Maximum acceptable** : 50€
- **Objectif** : 30€
- **Excellent** : < 20€

### Taux de rebond
- **Maximum acceptable** : 60%
- **Objectif** : 40%
- **Excellent** : < 30%

### Temps moyen sur page
- **Minimum** : 1 minute
- **Objectif** : 2 minutes
- **Excellent** : 3+ minutes

---

## ✅ CHECKLIST FINALE AVANT GO-LIVE

- [ ] Google Ads Tag installé et testé
- [ ] Conversion principale configurée et testée
- [ ] Événements engagement configurés
- [ ] UTM parameters vérifiés
- [ ] Page Speed > 90
- [ ] Test de conversion réussi (formulaire soumis)
- [ ] Test de tous les CTA (WhatsApp, Appel, Formulaire)
- [ ] Test sur mobile (sticky CTA fonctionne)
- [ ] Test sur desktop (formulaire sticky fonctionne)
- [ ] Vérification console navigateur (pas d'erreurs JS)
- [ ] Google Tag Assistant : tous les tags détectés

---

## 📞 SUPPORT

Si problème de tracking :
1. Vérifier Google Tag Assistant
2. Vérifier console navigateur
3. Vérifier Google Ads → Conversions
4. Contacter support Google Ads si nécessaire

**Documentation Google** :
- https://support.google.com/google-ads/answer/1722054
- https://support.google.com/tagmanager/answer/6102821
