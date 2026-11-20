import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

// 1. Ensure sitemap.xml exists in dist
const sitemap0 = path.join(distDir, 'sitemap-0.xml');
const sitemapXml = path.join(distDir, 'sitemap.xml');

if (fs.existsSync(sitemap0)) {
  fs.copyFileSync(sitemap0, sitemapXml);
  console.log('✅ Copied dist/sitemap-0.xml -> dist/sitemap.xml');
} else {
  console.warn('⚠️ dist/sitemap-0.xml not found.');
}

// 2. Audit all generated HTML files for SEO hygiene
const expectedPages = [
  'index.html',
  'about/index.html',
  'clients/index.html',
  'articles/index.html',
  'articles/clash-airport-client-selection-2026/index.html',
  'articles/clash-node-purchase-guide/index.html',
  'articles/stable-clash-subscription/index.html',
  'articles/clash-verge-airport-guide/index.html',
  'articles/clash-meta-node-guide/index.html',
  'articles/unlimited-device-airport-guide/index.html',
];

console.log('\n--- 🔍 Running Full SEO Build Audit ---');

let auditErrors = 0;

expectedPages.forEach(relPath => {
  const fullPath = path.join(distDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Missing expected file: ${relPath}`);
    auditErrors++;
    return;
  }

  const html = fs.readFileSync(fullPath, 'utf8');

  // Check noindex
  if (html.includes('noindex')) {
    console.error(`❌ Found forbidden 'noindex' in: ${relPath}`);
    auditErrors++;
  }

  // Check title
  if (!html.includes('<title>') || !html.includes('</title>')) {
    console.error(`❌ Missing or broken <title> tag in: ${relPath}`);
    auditErrors++;
  }

  // Check canonical
  if (!html.includes('rel="canonical"')) {
    console.error(`❌ Missing canonical link in: ${relPath}`);
    auditErrors++;
  }

  // Check JSON-LD
  if (!html.includes('application/ld+json')) {
    console.error(`❌ Missing JSON-LD structured data in: ${relPath}`);
    auditErrors++;
  }

  // Check H1
  if (!html.includes('<h1')) {
    console.error(`❌ Missing H1 tag in: ${relPath}`);
    auditErrors++;
  }

  console.log(`✅ Passed audit: /${relPath.replace('/index.html', '/').replace('index.html', '')}`);
});

if (auditErrors === 0) {
  console.log('\n🎉 ALL 10 PRODUCTION PAGES PASSED STATIC SEO AUDIT WITH ZERO DEFECTS!\n');
} else {
  console.error(`\n❌ Total SEO audit issues found: ${auditErrors}\n`);
  process.exit(1);
}
