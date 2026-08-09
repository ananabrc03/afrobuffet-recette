import rawData from '../data/afrobuffet-data.json';
import type { ImageMetadata } from 'astro';

export type TimeBadge = {
  label: string;
  value: string;
  icon: string;
};

export type Recipe = {
  id: string;
  slug: string;
  name: string;
  familyId: string;
  familyName: string;
  familyOrder: number;
  orderInFamily: number;
  countryRegion: string;
  origin: string;
  servings: string;
  difficulty: string;
  times: {
    sourcePreparation: string;
    sourceCooking: string;
    activePreparation: { display: string; schemaDuration: string };
    cooking: { display: string; schemaDuration: string };
    passive: { label: string; value: string; icon: string } | null;
    cardTotalActive: { display: string; schemaDuration: string };
    badges: TimeBadge[];
  };
  utensils: string[];
  ingredients: string[];
  steps: Array<{ text: string; number: number; section?: string }>;
  anecdote: string;
  alternativeRecipes: Array<{ url: string; label: string }>;
  relatedRecipes: string[];
  image: { path: string; width: number; height: number; alt: string };
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
    openGraphType: string;
    schemaType: string;
  };
};

export type Family = {
  id: string;
  name: string;
  primaryColor: string;
  accentColor: string;
  pattern: string;
  initiallyOpen: boolean;
  order: number;
  recipeSlugs: string[];
};

type SiteData = {
  site: {
    name: string;
    language: string;
    canonicalOrigin: string;
    shopUrl: string;
    copyright: string;
    homeIntro: string;
  };
  families: Family[];
  recipes: Recipe[];
};

export const data = rawData as SiteData;
export const PILOT_FAMILY = 'snacks';
export const pilotRecipes = data.recipes
  .filter((recipe) => recipe.familyId === PILOT_FAMILY)
  .sort((a, b) => a.orderInFamily - b.orderInFamily);

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/recipes/**/*.png',
  { eager: true },
);

export function getRecipeImage(recipe: Recipe): ImageMetadata {
  const key = `../assets/images/recipes/${recipe.familyId}/${recipe.slug}.png`;
  const image = imageModules[key]?.default;
  if (!image) throw new Error(`Image introuvable pour la recette ${recipe.slug}: ${key}`);
  return image;
}

export function getFamily(id: string): Family {
  const family = data.families.find((item) => item.id === id);
  if (!family) throw new Error(`Famille inconnue : ${id}`);
  return family;
}

export function getPilotRelated(recipe: Recipe): Recipe[] {
  const available = new Map(pilotRecipes.map((item) => [item.slug, item]));
  const selected: Recipe[] = [];

  for (const slug of recipe.relatedRecipes) {
    const related = available.get(slug);
    if (related && related.slug !== recipe.slug && !selected.includes(related)) selected.push(related);
  }

  for (const candidate of pilotRecipes) {
    if (selected.length >= 4) break;
    if (candidate.slug !== recipe.slug && !selected.includes(candidate)) selected.push(candidate);
  }

  return selected.slice(0, 4);
}

export function assertPilotData(): void {
  if (data.families.length !== 7) throw new Error('Le lot pilote exige exactement sept familles.');
  if (pilotRecipes.length !== 6) throw new Error('Le lot pilote exige exactement six recettes Snacks.');
  const slugs = new Set(pilotRecipes.map((recipe) => recipe.slug));
  if (slugs.size !== pilotRecipes.length) throw new Error('Les slugs Snacks ne sont pas uniques.');
  pilotRecipes.forEach(getRecipeImage);
}
