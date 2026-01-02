# Configuration WhatsApp

## Comment configurer le bouton WhatsApp

Le bouton WhatsApp flottant apparaît uniquement sur mobile (écrans < 768px) et permet aux visiteurs de vous contacter directement.

### Format du numéro de téléphone

Le numéro doit être au format international **sans le signe +** :
- Format attendu : `33123456789` (33 pour la France + numéro sans le 0 initial)
- Exemple : `33612345678` pour un numéro français commençant par 06 12 34 56 78

### Comment l'ajouter

Dans vos pages Astro, passez le numéro via les props du Layout :

```astro
---
import Layout from '../layouts/Layout.astro';
// ...
---

<Layout 
  title="..."
  description="..."
  whatsappPhone="33612345678"
  whatsappMessage="Bonjour, je souhaite en savoir plus sur votre accompagnement en mathématiques."
>
  <!-- Contenu de la page -->
</Layout>
```

### Message par défaut

Si vous ne spécifiez pas de message, le message par défaut sera :
> "Bonjour, je souhaite en savoir plus sur votre accompagnement en mathématiques."

Vous pouvez le personnaliser avec la prop `whatsappMessage`.

### Exemple complet

```astro
<Layout 
  title="Accompagnement académique en mathématiques et sciences | revise-tes-maths.fr"
  description="..."
  whatsappPhone="33612345678"
  whatsappMessage="Bonjour, j'aimerais prendre rendez-vous pour un premier entretien."
>
  <!-- Votre contenu -->
</Layout>
```

