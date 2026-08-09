import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://afrobuffet.fr',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  image: {
    responsiveStyles: true,
  },
});
