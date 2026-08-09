import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import data from '../src/data/afrobuffet-data.json' with { type: 'json' };

const dist = resolve('dist');
const errors = [];
const expectedSlugs = data.recipes
  .filter((recipe) => recipe.familyId === 'snacks')
  .map((recipe) => recipe.slug)
  .sort();

const expectedFiles = [
  resolve(dist, 'index.html'),
  resolve(dist, '404.html'),
  ...expectedSlugs.map((slug) => resolve(dist, 'recettes', slug, 'index.html')),
];

for (const file of expectedFiles) {
  if (!existsSync(file)) errors.push(`Page attendue absente : ${file}`);
}

const recipesDirectory = resolve(dist, 'recettes');
const generatedSlugs = existsSync(recipesDirectory)
  ? readdirSync(recipesDirectory, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort()
  : [];

if (JSON.stringify(generatedSlugs) !== JSON.stringify(expectedSlugs)) {
  errors.push(`Routes recettes inattendues : ${generatedSlugs.join(', ')}`);
}

for (const file of expectedFiles.filter((path) => existsSync(path))) {
  const html = readFileSync(file, 'utf8');
  const internalLinks = [...html.matchAll(/href="(\/(?!\/)[^"#?]*)(?:[#?][^"]*)?"/g)]
    .map((match) => match[1])
    .filter((href) => !href.startsWith('/_astro/') && !href.startsWith('/assets/'));

  for (const href of internalLinks) {
    const target = href === '/'
      ? resolve(dist, 'index.html')
      : resolve(dist, href.replace(/^\//, ''), href.endsWith('/') ? 'index.html' : '');
    if (!existsSync(target)) errors.push(`Lien interne cassé dans ${file} : ${href}`);
  }
}

const sitemap = resolve(dist, 'sitemap-0.xml');
if (!existsSync(sitemap)) errors.push('Sitemap absent.');
if (!existsSync(resolve(dist, 'robots.txt'))) errors.push('robots.txt absent.');

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Build valide : ${expectedFiles.length} pages contrôlées, ${generatedSlugs.length} fiches Snacks, aucun lien interne cassé.`);
