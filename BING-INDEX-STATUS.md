# 杏花云 (xinghuayun.buzz) Bing 索引收录状态与站长平台验证档案

- **官网域名**：https://xinghuayun.buzz/
- **项目代号**：XingHuaCloud-C03
- **文档最后更新**：2026年11月20日

---

## 1. 站长权限与所有权验证准备状态

| 验证机制 | 配置文件或代码位置 | 验证内容与状态 | 生产环境就绪度 |
|---|---|---|:---:|
| **XML 物理文件验证** | `public/BingSiteAuth.xml` (构建后位于 `dist/BingSiteAuth.xml`) | `<users><user>XINGHUAYUN_BUZZ_BING_VERIFICATION_TOKEN</user></users>` | ✅ 就绪（上线后可填入真实Token） |
| **Meta 标签验证** | `src/layouts/Layout.astro` 页面 `<head>` 内 | `<meta name="msvalidate.01" content="XINGHUAYUN_BUZZ_BING_VERIFICATION_TOKEN" />` | ✅ 就绪（10个正式页面全覆盖） |
| **IndexNow 自动推送** | `public/41e7f3b8902c48f2b1d0932c9e887f42.txt` + `scripts/indexnow.mjs` | 标准 32 位 Hex Key 与全自动化推流脚本 | ✅ 就绪（一键可向 IndexNow API 提交） |
| **Sitemap 索引宣告** | `dist/sitemap.xml` + `public/robots.txt` | `Sitemap: https://xinghuayun.buzz/sitemap.xml` | ✅ 就绪（10个正式URL全部列出） |

---

## 2. 待提交与收录追踪之 10 大正式 URL 资产清单

| 页面类别 | 生产环境绝对 URL | 页面标题 (Title) | 规范化 Canonical | HTTP 预期 |
|---|---|---|---|:---:|
| **首页** | `https://xinghuayun.buzz/` | 杏花云机场 - Clash机场订阅、全球代理节点与客户端指南 | 自身绝对地址 | 200 OK |
| **关于页面** | `https://xinghuayun.buzz/about/` | 关于杏花云 XingHua Cloud｜品牌理念、客户端服务与数字网络生活 | 自身绝对地址 | 200 OK |
| **客户端中心**| `https://xinghuayun.buzz/clients/` | 杏花云客户端指南｜Clash Verge、Clash Meta、Mihomo与VLESS订阅 | 自身绝对地址 | 200 OK |
| **文章中心** | `https://xinghuayun.buzz/articles/`| 杏花云原创阅读中心｜Clash使用指南、节点购买与网络知识 | 自身绝对地址 | 200 OK |
| **原创文章13**| `https://xinghuayun.buzz/articles/clash-airport-client-selection-2026/` | 2026 Clash机场推荐｜按客户端、VLESS订阅与设备需求选择机场 | 自身绝对地址 | 200 OK |
| **原创文章14**| `https://xinghuayun.buzz/articles/clash-node-purchase-guide/` | Clash节点购买指南｜订阅格式、流量套餐与节点选择注意事项 | 自身绝对地址 | 200 OK |
| **原创文章15**| `https://xinghuayun.buzz/articles/stable-clash-subscription/` | 稳定Clash订阅推荐2026｜订阅更新、节点质量与连接稳定性分析 | 自身绝对地址 | 200 OK |
| **原创文章16**| `https://xinghuayun.buzz/articles/clash-verge-airport-guide/` | Clash Verge机场推荐｜Clash Verge Rev客户端与VLESS订阅指南 | 自身绝对地址 | 200 OK |
| **原创文章17**| `https://xinghuayun.buzz/articles/clash-meta-node-guide/` | Clash Meta节点推荐｜Mihomo内核、VLESS协议与全球节点选择 | 自身绝对地址 | 200 OK |
| **原创文章18**| `https://xinghuayun.buzz/articles/unlimited-device-airport-guide/` | 不限设备机场推荐指南｜2台、3台、5台与不限设备套餐如何选择 | 自身绝对地址 | 200 OK |

---

## 3. 上线部署后 Bing Webmaster 实操动作清单

1. 域名解析生效后，进入 Bing Webmaster Tools 添加 `https://xinghuayun.buzz/`；
2. 复制 Bing 分配的专属 Token，替换 `BingSiteAuth.xml` 与 `Layout.astro` 中的占位符，完成所有权校验；
3. 在 Sitemaps 提交模块中提交 `https://xinghuayun.buzz/sitemap.xml`；
4. 运行 `node scripts/indexnow.mjs`，向 IndexNow 协议主动广播 10 个正式页面更新；
5. 针对首页与客户端中心执行「URL Inspection（网址检查）」，检查实时抓取渲染快照。
