# 杏花云 (XingHua Cloud) Bing 搜索引擎收录与关键词排名长效追踪机制

- **监控目标站点**：https://xinghuayun.buzz/
- **监控主体**：Bing Webmaster Tools (必应站长平台)
- **建立日期**：2026年11月20日

---

## 1. 监控核心指标大纲 (KPIs)

1. **页面覆盖与抓取收录类**：
   - 本站正式可索引页面总数：**10 个**
   - Bing 已发现 URL 总数 (Discovered URLs)
   - Bing 已建立索引 URL 总数 (Indexed URLs)
   - 未索引 URL 及原因分类 (Crawled but not indexed, Excluded)
   - 抓取异常与 HTTP 错误 URL 数量 (Crawl Anomalies)
2. **搜索可见性与关键词表现类**：
   - 品牌核心词（杏花云、杏花云机场、杏花云官网）总展示次数 (Impressions)
   - 品牌核心词平均排名位置 (Average Position)
   - 进入搜索结果首页前三位（Top 1–3）的关键词数量
   - Clash 专题长尾关键词覆盖与展现量
   - 自然搜索点击率 (Search CTR)
3. **商业导购转化类**：
   - 客户端中心与原创长文带来的自然搜索流量
   - 商业购买入口点击量（Affiliate CTA Clicks）
   - 用户自然搜索访问的整体跳出率与停留时长

---

## 2. 5大关键追踪阶段时间表 (Milestone Cadence)

```
[上线部署完成]
      │
      ├── Day 07 ──── 初始收录与抓取审计 (核实 Bingbot 首次完整抓取与首页索引状态)
      │
      ├── Day 14 ──── 目录级收录爬坡期 (核查 /about/、/clients/ 与 6 篇原创长文索引)
      │
      ├── Day 30 ──── 品牌词首屏攻坚期 (追踪“杏花云”、“杏花云机场”排名进入前页)
      │
      ├── Day 60 ──── Clash 专题长尾爆发期 (重点追踪 Clash Verge、Mihomo 等专题词排名)
      │
      └── Day 90 ──── 排名固化与持续运营期 (稳固核心词首页第 1–3 名，分析点击转化)
```

---

## 3. 标准化搜索排名日志记录模板 (Log Schema)

每次执行人工或自动化核验时，均需按照下表严格记录真实观测数据，杜绝伪造数据：

| 记录日期 | 检索关键词 (Query) | 搜索区域 (Market) | 终端设备 | 目标排名页面 URL | 实际排名位次 | 点击/展现数据源 | 异常排查备注 |
|---|---|---|---|---|:---:|---|---|
| YYYY-MM-DD | 杏花云 | zh-CN (中国) | 桌面端 | `https://xinghuayun.buzz/` | 待测 | Bing Webmaster API | 观察首页抓取快照 |
| YYYY-MM-DD | 杏花云机场 | zh-CN (中国) | 移动端 | `https://xinghuayun.buzz/` | 待测 | Bing Webmaster API | 移动端展现核验 |
| YYYY-MM-DD | 2026 Clash机场推荐 | 全球中文 | 桌面端 | `.../clash-airport-client-selection-2026/` | 待测 | Bing Search Console | 专题词展现测试 |
| YYYY-MM-DD | Clash Verge机场 | 全球中文 | 桌面端 | `.../clash-verge-airport-guide/` | 待测 | Bing Search Console | 长尾覆盖评估 |

---

## 4. 真实性与客观态度声明

本机制属于长效技术监测流程规划，**绝不代表或承诺在特定日期内 100% 获取必应首页排名**。自然搜索排名受搜索引擎算法演进、外部竞争生态及域名初始权重综合影响。本项目坚持通过持续的高质量原创内容输出、严苛的静态渲染与合规的 Bing Webmaster 协作，最大化提升长期稳定的自然搜索可见度。
