/**
 * Cross-Site FAQ Comprehensive Audit Script
 * Validates C01 (xinghuayun.mom), C02 (xinghuacloud.cfd), C03 (xinghuayun.buzz)
 */

import fs from 'fs';
import path from 'path';

const sitePaths = {
  C01: 'c:/Users/USERR/Desktop/落地页/xinghuayun.mom',
  C02: 'c:/Users/USERR/Desktop/落地页/xinghuacloud.cfd',
  C03: 'c:/Users/USERR/Desktop/落地页/xinghuayun.buzz'
};

console.log('🌸 === Starting Cross-Site 3-Domain FAQ & SEO Audit ===\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${message}`);
  } else {
    failedTests++;
    console.error(`  ❌ [FAIL] ${message}`);
  }
}

// 1. Audit C01 (xinghuayun.mom)
console.log('--- 1. Auditing C01: xinghuayun.mom (Apricot Bloom Conversion) ---');
const c01Html = fs.readFileSync(path.join(sitePaths.C01, 'index.html'), 'utf8');
const c01Faqs = JSON.parse(fs.readFileSync(path.join(sitePaths.C01, 'src/data/faqs.json'), 'utf8'));

assert(c01Faqs.length === 8, `C01 data has exactly 8 FAQs (found ${c01Faqs.length})`);
assert(c01Html.includes('杏花云品牌与套餐常见问题'), 'C01 HTML contains required FAQ Title');
assert(c01Html.includes('深入了解杏花云的品牌定位、套餐价格、流量配置及购买方式，选择适合自身网络需求的订阅方案。'), 'C01 HTML contains required FAQ Subtitle');

// Check C01 HTML details elements
const c01DetailsCount = (c01Html.match(/<details\s+class="faq-item"/g) || []).length;
assert(c01DetailsCount === 8, `C01 HTML has exactly 8 <details class="faq-item"> (found ${c01DetailsCount})`);

// Ensure none are open by default
const c01OpenDetails = (c01Html.match(/<details[^>]*\bopen\b[^>]*>/g) || []).length;
assert(c01OpenDetails === 0, `C01 has 0 <details> open by default (all collapsed)`);

// Check C01 JSON-LD FAQPage
const c01JsonLdMatch = c01Html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
let c01FaqSchemaFound = false;
if (c01JsonLdMatch) {
  for (const script of c01JsonLdMatch) {
    const raw = script.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    try {
      const data = JSON.parse(raw);
      if (data['@type'] === 'FAQPage') {
        c01FaqSchemaFound = true;
        assert(data.mainEntity.length === 8, `C01 FAQPage JSON-LD has exactly 8 questions (found ${data.mainEntity.length})`);
      }
    } catch (e) {}
  }
}
assert(c01FaqSchemaFound, 'C01 has valid FAQPage schema');

// 2. Audit C02 (xinghuacloud.cfd)
console.log('\n--- 2. Auditing C02: xinghuacloud.cfd (Apricot Nebula MAX) ---');
const c02Html = fs.readFileSync(path.join(sitePaths.C02, 'index.html'), 'utf8');
const c02Faqs = (await import('file:///' + path.join(sitePaths.C02, 'src/data/faqs.js').replace(/\\/g, '/'))).homeFaqs;

assert(c02Faqs.length === 8, `C02 data has exactly 8 FAQs (found ${c02Faqs.length})`);
assert(c02Html.includes('杏花云网络技术与节点常见问题'), 'C02 HTML contains required FAQ Title');
assert(c02Html.includes('探索杏花云的VLESS网络协议、多地区节点、流量倍率及网络连接质量。'), 'C02 HTML contains required FAQ Subtitle');

// Check C02 HTML details elements
const c02DetailsCount = (c02Html.match(/<details\s+class="faq-item"/g) || []).length;
assert(c02DetailsCount === 8, `C02 HTML has exactly 8 <details class="faq-item"> (found ${c02DetailsCount})`);

// Ensure none are open by default
const c02OpenDetails = (c02Html.match(/<details[^>]*\bopen\b[^>]*>/g) || []).length;
assert(c02OpenDetails === 0, `C02 has 0 <details> open by default (all collapsed)`);

// Check C02 JSON-LD FAQPage
const c02JsonLdMatch = c02Html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
let c02FaqSchemaFound = false;
if (c02JsonLdMatch) {
  for (const script of c02JsonLdMatch) {
    const raw = script.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    try {
      const data = JSON.parse(raw);
      if (data['@type'] === 'FAQPage') {
        c02FaqSchemaFound = true;
        assert(data.mainEntity.length === 8, `C02 FAQPage JSON-LD has exactly 8 questions (found ${data.mainEntity.length})`);
      }
    } catch (e) {}
  }
}
assert(c02FaqSchemaFound, 'C02 has valid FAQPage schema');

// 3. Audit C03 (xinghuayun.buzz)
console.log('\n--- 3. Auditing C03: xinghuayun.buzz (Blossom Girl MAX) ---');
const c03Html = fs.readFileSync(path.join(sitePaths.C03, 'dist/index.html'), 'utf8');
const c03Faqs = JSON.parse(fs.readFileSync(path.join(sitePaths.C03, 'src/data/faqs.json'), 'utf8'));

assert(c03Faqs.length === 8, `C03 data has exactly 8 FAQs (found ${c03Faqs.length})`);
assert(c03Html.includes('杏花云Clash客户端与订阅常见问题'), 'C03 HTML contains required FAQ Title');
assert(c03Html.includes('跟随杏花少女了解Clash订阅、VLESS客户端、多平台设备配置及常见连接问题。'), 'C03 HTML contains required FAQ Subtitle');

// Check C03 HTML details elements
const c03DetailsCount = (c03Html.match(/<details\s+class="[^"]*faq-item/g) || []).length;
assert(c03DetailsCount === 8, `C03 HTML has exactly 8 <details ...faq-item> (found ${c03DetailsCount})`);

// Ensure none are open by default
const c03OpenDetails = (c03Html.match(/<details[^>]*\bopen\b[^>]*>/g) || []).length;
assert(c03OpenDetails === 0, `C03 has 0 <details> open by default (all collapsed)`);

// Check C03 JSON-LD FAQPage
const c03JsonLdMatch = c03Html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
let c03FaqSchemaFound = false;
if (c03JsonLdMatch) {
  for (const script of c03JsonLdMatch) {
    const raw = script.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    try {
      const data = JSON.parse(raw);
      if (data['@type'] === 'FAQPage') {
        c03FaqSchemaFound = true;
        assert(data.mainEntity.length === 8, `C03 FAQPage JSON-LD has exactly 8 questions (found ${data.mainEntity.length})`);
      }
    } catch (e) {}
  }
}
assert(c03FaqSchemaFound, 'C03 has valid FAQPage schema');

// 4. Cross-Site Uniqueness & Differentiation Audit (24 Unique Questions)
console.log('\n--- 4. Cross-Site Differentiation & 24 Unique Questions Audit ---');
const allQuestions = [
  ...c01Faqs.map(f => f.question),
  ...c02Faqs.map(f => f.q),
  ...c03Faqs.map(f => f.question)
];

assert(allQuestions.length === 24, `Total questions across 3 sites is exactly 24 (found ${allQuestions.length})`);
const uniqueQuestions = new Set(allQuestions);
assert(uniqueQuestions.size === 24, `All 24 questions are 100% unique with 0 duplicates (unique count: ${uniqueQuestions.size})`);

console.log(`\n========================================`);
console.log(`AUDIT FINISHED: Total: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests}`);
console.log(`========================================\n`);

if (failedTests > 0) {
  process.exit(1);
}
