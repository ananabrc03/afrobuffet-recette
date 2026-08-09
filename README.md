# Site Afro Buffet — Les recettes

Site statique (HTML / CSS / JS, sans framework) présentant les recettes Afro Buffet.
Cette version contient la **page d'accueil** et la **famille Accompagnements** (6 fiches).

## Structure

```
index.html                     Accueil (7 familles en toggles, Accompagnements peuplée)
recettes/                      Fiches recette (ablo, alloco, chapati, chikwangue-kwanga, fufu-foufou, riz-jollof)
assets/css/                    style.css (commun) + print.css (impression)
assets/js/                     accueil.js (toggles) + recette.js (partage / impression)
assets/fonts/                  Cherry Bomb One, Fredoka, Poppins (woff2)
assets/patterns/               Fonds SVG par famille
assets/logos/                  Logos Afro Buffet
assets/img/recettes/           Images des plats (détourées)
assets/icons/                  Icônes SVG source (référence ; le site les intègre en sprite inline)
data/                          Données normalisées (JSON)
```

## Déploiement GitHub + Vercel

1. Créer un dépôt GitHub et y pousser **le contenu de ce dossier** (index.html à la racine).
2. Sur Vercel : *New Project* → importer le dépôt.
3. Framework Preset : **Other** (site statique). Build Command : vide. Output Directory : `.` (racine).
4. Deploy. Aucune configuration serveur nécessaire, tous les chemins sont relatifs.

## Notes

- Le lien « Le produit » pointe vers https://afrobuffet.com (nouvel onglet).
- « Toutes les recettes » revient à l'accueil.
- Les familles autres qu'Accompagnements affichent « Bientôt disponible » en attendant leur génération.
- Sans JavaScript, toutes les familles restent ouvertes (le contenu reste lisible).
