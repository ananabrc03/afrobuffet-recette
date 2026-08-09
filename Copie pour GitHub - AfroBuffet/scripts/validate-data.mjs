import data from '../src/data/afrobuffet-data.json' with { type: 'json' };
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const errors = [];
const snacks = data.recipes.filter((recipe) => recipe.familyId === 'snacks');
const slugs = new Set(snacks.map((recipe) => recipe.slug));

if (data.families.length !== 7) errors.push('Le site doit contenir exactement 7 familles.');
if (snacks.length !== 6) errors.push('Le pilote doit contenir exactement 6 recettes Snacks.');
if (slugs.size !== snacks.length) errors.push('Les slugs Snacks doivent être uniques.');

for (const recipe of snacks) {
  const image = resolve('src/assets/images/recipes', recipe.familyId, `${recipe.slug}.png`);
  if (!existsSync(image)) errors.push(`Image absente : ${image}`);
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Données valides : ${snacks.length} recettes Snacks, ${data.families.length} familles.`);
