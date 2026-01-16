# Comment ajouter les logos des universités

Pour afficher les logos au lieu du texte, remplacez dans `src/components/UniversitiesBanner.astro` :

## Pour Bocconi :
Remplacez :
```astro
<span class="text-2xl md:text-3xl font-serif font-semibold">Bocconi</span>
```

Par :
```astro
<img 
  src="/logos/bocconi.svg" 
  alt="Bocconi University" 
  class="h-full opacity-90 hover:opacity-100 transition-opacity"
/>
```

## Pour King's College :
Remplacez :
```astro
<span class="text-xl md:text-2xl font-serif font-semibold text-center leading-tight">
  King's<br />College
</span>
```

Par :
```astro
<img 
  src="/logos/kings.svg" 
  alt="King's College London" 
  class="h-full opacity-90 hover:opacity-100 transition-opacity"
/>
```

## Pour McGill :
Remplacez :
```astro
<span class="text-2xl md:text-3xl font-serif font-semibold">McGill</span>
```

Par :
```astro
<img 
  src="/logos/mcgill.svg" 
  alt="McGill University" 
  class="h-full opacity-90 hover:opacity-100 transition-opacity"
/>
```

Les logos doivent être au format SVG et placés dans ce dossier (`public/logos/`).



