# 📝 Guide : Intégrer les avis Google Business

## ✅ Solution actuelle (Manuelle)

Le composant `GoogleReviews.astro` affiche actuellement :
- ✅ Le nombre total d'avis (à mettre à jour manuellement)
- ✅ La note moyenne (5.0)
- ✅ 3 avis d'exemple (à mettre à jour manuellement)
- ✅ Lien vers votre page Google Business

### Comment mettre à jour les avis manuellement

1. Ouvrez `src/components/GoogleReviews.astro`
2. Modifiez les valeurs aux lignes 8-9 :
   ```typescript
   const totalReviews = 15; // Changez ce nombre
   const averageRating = 5.0; // Changez si nécessaire
   ```
3. Modifiez les avis d'exemple (lignes 12-30) avec vos vrais avis Google

---

## 🚀 Solution automatique (API Google Places)

Pour récupérer automatiquement les avis depuis Google Business, vous devez configurer l'API Google Places.

### Étape 1 : Créer une clé API Google

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un projet ou sélectionnez un projet existant
3. Activez l'API "Places API"
4. Créez une clé API (Credentials → Create Credentials → API Key)
5. **Important** : Restreignez la clé API à "Places API" uniquement

### Étape 2 : Récupérer votre Place ID

Votre Place ID est déjà dans l'URL :
```
0x224c99ae96b77c43:0xe5bd93728c5d4644
```

### Étape 3 : Configurer dans Astro

1. Ajoutez votre clé API dans `.env` :
   ```
   GOOGLE_PLACES_API_KEY=votre_cle_api_ici
   ```

2. Le composant pourra alors récupérer automatiquement :
   - Le nombre total d'avis
   - La note moyenne
   - Les 5 derniers avis

### Coût de l'API

- **Gratuit** : 1000 requêtes/mois
- **Payant** : ~0.017€ par requête après

Pour un site avec peu de trafic, le quota gratuit suffit largement.

---

## 📋 Checklist

- [ ] Mettre à jour `totalReviews` dans `GoogleReviews.astro`
- [ ] Mettre à jour les avis d'exemple avec vos vrais avis
- [ ] (Optionnel) Configurer l'API Google Places pour automatisation

---

## 💡 Recommandation

**Pour l'instant** : Utilisez la version manuelle et mettez à jour les avis tous les mois.

**Plus tard** : Si vous avez beaucoup d'avis qui changent souvent, configurez l'API pour automatiser.
