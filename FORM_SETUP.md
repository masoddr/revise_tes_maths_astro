# Configuration du Formulaire de Contact

Ce document explique comment configurer le formulaire de contact pour qu'il fonctionne avec Vercel.

## 🎯 Solution Recommandée : Web3Forms

Le formulaire utilise actuellement **Web3Forms**, un service gratuit et illimité qui fonctionne parfaitement avec les sites statiques hébergés sur Vercel.

### Configuration Web3Forms

1. **Obtenir une clé d'accès** :
   - Allez sur https://web3forms.com
   - Entrez votre adresse email
   - Cliquez sur "Get Access Key"
   - Copiez la clé d'accès générée

2. **Configurer la clé dans Vercel** :
   - Dans votre projet Vercel, allez dans **Settings** → **Environment Variables**
   - Ajoutez une variable :
     - **Name** : `PUBLIC_WEB3FORMS_ACCESS_KEY`
     - **Value** : votre clé d'accès
   - Sélectionnez tous les environnements (Production, Preview, Development)
   - Cliquez sur **Save**

3. **Configuration locale (optionnel)** :
   - Créez un fichier `.env` à la racine du projet :
   ```
   PUBLIC_WEB3FORMS_ACCESS_KEY=votre_cle_d_acces_ici
   ```
   - Ajoutez `.env` à votre `.gitignore` pour ne pas commiter la clé

4. **Redéployer** :
   - Après avoir ajouté la variable d'environnement, redéployez votre site sur Vercel

### Fonctionnalités Web3Forms

- ✅ **Gratuit et illimité** (pas de limite de soumissions)
- ✅ **Protection anti-spam** intégrée
- ✅ **Reçus par email** directement dans votre boîte mail
- ✅ **Pas de backend nécessaire** (fonctionne avec sites statiques)
- ✅ **Compatible Vercel** (aucune configuration supplémentaire)

---

## 🔄 Alternatives Gratuites

Si vous préférez utiliser un autre service, voici des alternatives :

### Option 2 : Formspree

**Limite** : 50 soumissions/mois (gratuit)

1. Créez un compte sur https://formspree.io
2. Créez un nouveau formulaire
3. Obtenez votre endpoint (ex: `https://formspree.io/f/YOUR_FORM_ID`)
4. Modifiez `ContactForm.astro` pour utiliser l'endpoint Formspree

**Avantages** :
- Interface de gestion des soumissions
- Webhooks disponibles
- Protection anti-spam

### Option 3 : EmailJS

**Limite** : 200 emails/mois (gratuit)

1. Créez un compte sur https://www.emailjs.com
2. Configurez un service email (Gmail, Outlook, etc.)
3. Créez un template d'email
4. Obtenez votre `service_id`, `template_id`, et `public_key`
5. Modifiez le script dans `ContactForm.astro` pour utiliser EmailJS

**Avantages** :
- Envoi direct depuis le navigateur
- Pas de backend nécessaire
- Templates d'email personnalisables

### Option 4 : Resend (avec API Route Vercel)

**Limite** : 3000 emails/mois (gratuit)

Cette option nécessite de créer une API route Vercel (Serverless Function).

1. Créez un compte sur https://resend.com
2. Obtenez votre clé API
3. Créez une API route dans `src/pages/api/contact.ts` (ou `.js`)
4. Modifiez le formulaire pour envoyer à `/api/contact`

**Avantages** :
- Très généreux (3000 emails/mois)
- API moderne et rapide
- Bon pour les projets qui grandissent

---

## 🧪 Tester le Formulaire

1. Remplissez le formulaire sur votre site
2. Vérifiez que vous recevez bien l'email
3. Vérifiez que le message de confirmation s'affiche correctement

---

## 📝 Notes Importantes

- **Sécurité** : Ne commitez jamais votre clé d'accès dans le code source
- **Variables d'environnement** : Utilisez toujours `PUBLIC_` comme préfixe pour les variables accessibles côté client dans Astro
- **Spam** : Web3Forms inclut une protection anti-spam automatique
- **Backup** : Considérez sauvegarder les soumissions importantes ailleurs (base de données, etc.)

---

## 🆘 Dépannage

### Le formulaire ne fonctionne pas

1. Vérifiez que la variable d'environnement est bien configurée dans Vercel
2. Vérifiez que vous avez redéployé après avoir ajouté la variable
3. Ouvrez la console du navigateur (F12) pour voir les erreurs
4. Vérifiez que votre clé Web3Forms est valide sur https://web3forms.com

### Les emails ne sont pas reçus

1. Vérifiez votre dossier spam
2. Vérifiez que l'adresse email dans Web3Forms est correcte
3. Vérifiez les logs sur web3forms.com (section "Submissions")

