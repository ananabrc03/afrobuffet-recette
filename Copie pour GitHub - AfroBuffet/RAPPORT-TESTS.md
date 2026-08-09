# Rapport de tests — lot pilote Snacks

Date : 9 août 2026

## Résultat

Le lot pilote est validé localement.

- Données : 7 familles et exactement 6 recettes Snacks validées.
- Génération : accueil, page 404 et 6 fiches Snacks, soit 8 pages HTML.
- Routes : Akara, Brick (Brik), Khouti, Pastels, Rolex et Suya.
- Liens internes : aucun lien cassé détecté.
- Recommandations : 4 recettes valides par fiche, sans recommander la recette courante.
- Responsive : contrôlé de 320 à 1440 px sur l’accueil et la fiche Akara.
- Mobile : aucun débordement de page ; aperçu de 36 px de la carte suivante ; progression du rail fonctionnelle.
- Accessibilité technique : aucun échec TypeScript/Astro ; navigation sémantique, lien d’évitement, focus visible et libellés accessibles intégrés.
- SEO : métadonnées, URL canonique, JSON-LD Recipe, sitemap et robots.txt générés.
- Images : variantes AVIF avec repli WebP générées au build.
- Navigateur : aucune erreur de console ni surcouche d’erreur détectée pendant les contrôles.

## Commandes de contrôle

```bash
pnpm test:data
pnpm build
pnpm test:build
```

## Publication

Aucun dépôt GitHub et aucun projet ou déploiement Vercel n’a été créé. La publication reste à la charge de la propriétaire du projet.
