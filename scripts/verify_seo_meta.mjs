import http from 'http';

const specs = [
  {
    url: '/',
    expectedTitle: '杏花云机场官网 - Clash机场订阅、全球代理节点与客户端指南',
    expectedH1Pattern: /杏花云/,
  },
  {
    url: '/story/',
    expectedTitle: '杏花云品牌物语｜XingHua Cloud与杏花少女的云端旅程',
    expectedH1: '杏花物语 · 与杏子一起探索云端世界',
  },
  {
    url: '/nodes/',
    expectedTitle: '杏花云全球代理节点｜香港、日本、新加坡与美国节点指南',
    expectedH1: '杏花云全球网络节点与云端连接花园',
  },
  {
    url: '/pricing/',
    expectedTitle: '杏花云机场套餐价格｜3元月付、12元年付与1000GB流量购买入口',
    expectedH1: '杏花云六款流量套餐与订阅购买方案',
  },
  {
    url: '/calculator/',
    expectedTitle: '杏花云流量计算器｜每月GB预算、套餐推荐与年度成本分析',
    expectedH1: '杏子智能流量预算与套餐推荐助手',
  },
  {
    url: '/clients/',
    expectedTitle: '杏花云Clash订阅指南｜Clash Verge、Clash Meta、Mihomo与VLESS客户端',
    expectedH1: '杏花云Clash客户端安装与节点订阅指南',
  },
  {
    url: '/articles/',
    expectedTitle: '杏花云原创阅读中心｜2026 Clash机场推荐、节点订阅与客户端指南',
    expectedH1: '杏花图书馆 · 全球网络与Clash原创知识中心',
  },
  {
    url: '/about/',
    expectedTitle: '关于杏花云 XingHua Cloud｜品牌定位、全球网络与高性价比订阅服务',
    expectedH1: '关于杏花云 · 轻盈连接全球数字生活',
  },
  {
    url: '/faq/',
    expectedTitle: '杏花云常见问题｜Clash订阅、VLESS客户端与设备连接解答',
    expectedH1: '杏花云常见问题解答 · Clash与订阅FAQ',
  },
  {
    url: '/articles/clash-airport-client-selection-2026/',
    expectedTitlePattern: /2026 Clash机场推荐/,
    expectedH1Pattern: /2026 Clash机场推荐/,
  },
  {
    url: '/articles/clash-node-purchase-guide/',
    expectedTitlePattern: /Clash节点购买指南/,
    expectedH1Pattern: /Clash节点购买指南/,
  },
  {
    url: '/articles/stable-clash-subscription/',
    expectedTitlePattern: /稳定Clash订阅推荐2026/,
    expectedH1Pattern: /稳定Clash订阅推荐2026/,
  },
  {
    url: '/articles/clash-verge-airport-guide/',
    expectedTitlePattern: /Clash Verge机场推荐/,
    expectedH1Pattern: /Clash Verge机场推荐/,
  },
  {
    url: '/articles/clash-meta-node-guide/',
    expectedTitlePattern: /Clash Meta节点推荐/,
    expectedH1Pattern: /Clash Meta节点推荐/,
  },
  {
    url: '/articles/unlimited-device-airport-guide/',
    expectedTitlePattern: /不限设备机场推荐指南/,
    expectedH1Pattern: /不限设备机场推荐指南/,
  },
];

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:4325' + url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  console.log('--- 🔍 Validating Exact Title, H1 & Canonical Specs ---');
  let failures = 0;

  for (const spec of specs) {
    const html = await fetchHtml(spec.url);
    const titleMatch = html.match(/<title>([^<]*)<\/title>/);
    const title = titleMatch ? titleMatch[1].trim() : 'NONE';
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'NONE';
    const canonMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/);
    const canonical = canonMatch ? canonMatch[1] : 'NONE';

    let titleOk = true;
    if (spec.expectedTitle && title !== spec.expectedTitle) titleOk = false;
    if (spec.expectedTitlePattern && !spec.expectedTitlePattern.test(title)) titleOk = false;

    let h1Ok = true;
    if (spec.expectedH1 && h1 !== spec.expectedH1) h1Ok = false;
    if (spec.expectedH1Pattern && !spec.expectedH1Pattern.test(h1)) h1Ok = false;

    const canonOk = canonical === `https://xinghuayun.buzz${spec.url}`;

    if (!titleOk || !h1Ok || !canonOk) {
      console.error(`❌ Mismatch on ${spec.url}:`);
      if (!titleOk) console.error(`  Title: '${title}' (Expected: '${spec.expectedTitle || spec.expectedTitlePattern}')`);
      if (!h1Ok) console.error(`  H1: '${h1}' (Expected: '${spec.expectedH1 || spec.expectedH1Pattern}')`);
      if (!canonOk) console.error(`  Canonical: '${canonical}' (Expected: 'https://xinghuayun.buzz${spec.url}')`);
      failures++;
    } else {
      console.log(`✅ Passed: ${spec.url}\n   Title: ${title}\n   H1: ${h1}\n   Canonical: ${canonical}`);
    }
  }

  if (failures === 0) {
    console.log('\n🎉 ALL 15 URLS PERFECTLY MATCH REQUIRED TITLES, H1S, AND CANONICALS!');
  } else {
    console.error(`\n❌ Total failures: ${failures}`);
    process.exit(1);
  }
}

run();
