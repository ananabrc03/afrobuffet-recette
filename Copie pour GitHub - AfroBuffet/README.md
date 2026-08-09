# AfroBuffet — lot pilote Snacks

Site statique Astro présentant la page d'accueil AfroBuffet et les six fiches recettes de la famille Snacks.

## Commandes

```bash
pnpm install
pnpm dev
pnpm test
pnpm preview
```

- `pnpm dev` lance le site local.
- `pnpm test:data` vérifie le périmètre et l'intégrité des données du pilote.
- `pnpm test:build` vérifie les routes générées et les liens internes du build.
- `pnpm build` vérifie TypeScript puis génère le site statique dans `dist/`.
- `pnpm preview` affiche le build final localement.

## Données et ajout d'une recette

La source de vérité est `src/data/afrobuffet-data.json`. Les composants ne contiennent aucun texte de recette en dur. Le lot pilote filtre volontairement la génération aux six recettes Snacks. L'activation des autres familles se fera en retirant ce filtre une fois le design validé, sans changer les composants.

Chaque image doit être placée dans `src/assets/images/recipes/<famille>/<slug>.png` et correspondre au slug déjà normalisé dans le JSON.

## Déploiement

Le projet produit un site entièrement statique, compatible avec Vercel sans configuration supplémentaire. Le domaine canonique configuré est `https://afrobuffet.fr`.
