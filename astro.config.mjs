// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://xinghuayun.buzz',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin/') && !page.includes('/scratch/'),
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
    }),
  ],
  build: {
    format: 'directory',
  },
  compressHTML: true,
});
