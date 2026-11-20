# 杏花云 (xinghuayun.buzz) 生产环境部署与 Cloudflare 边缘网络配置指南

- **网站域名**：https://xinghuayun.buzz/
- **构建输出目录**：`dist/`
- **构建命令**：`npm run build`

---

## 1. 静态构建产物结构核准

执行 `npm run build` 后，系统在 `dist/` 目录下生成纯静态产物：
```
dist/
├── index.html                                 # 首页静态预渲染文件 (含36个FAQ及完整正文)
├── about/index.html                           # 关于杏花云独立页面 (1,760字)
├── clients/index.html                         # Clash客户端独立知识中心 (1,720字)
├── articles/index.html                        # 原创阅读中心索引
├── articles/clash-airport-client-selection-2026/index.html
├── articles/clash-node-purchase-guide/index.html
├── articles/stable-clash-subscription/index.html
├── articles/clash-verge-airport-guide/index.html
├── articles/clash-meta-node-guide/index.html
├── articles/unlimited-device-airport-guide/index.html
├── robots.txt                                 # 爬虫引导文件
├── sitemap.xml                                # 全站标准地图
├── BingSiteAuth.xml                           # 必应站长物理校验文件
├── 41e7f3b8902c48f2b1d0932c9e887f42.txt       # IndexNow 标准授权文件
├── favicon.svg                                # 高清矢量图标
└── _astro/                                    # CSS 与轻量交互脚本资产
```

---

## 2. Cloudflare Pages 快速部署步骤

1. **关联 Git 仓库**：在 Cloudflare Dashboard 中选择「Workers & Pages」→「Create application」→「Pages」；
2. **构建参数配置**：
   - **Framework preset**：Astro
   - **Build command**：`npm run build`
   - **Build output directory**：`dist`
   - **Node.js Version**：在环境变量中添加 `NODE_VERSION=22` 或更高版本；
3. **自定义域名绑定**：添加 `xinghuayun.buzz`，Cloudflare 将自动配置 Universal SSL 边缘证书。

---

## 3. Cloudflare 安全规则与 Bingbot 爬虫放行配置

为确保搜索引擎（尤其是 Bingbot）能够无阻碍抓取，请在 Cloudflare WAF 中核查以下设置：

1. **搜索引擎防火墙规则放行 (Verified Bots Bypass)**：
   在「Security」→「WAF」中新建规则：
   - 规则表达式：`(cf.client.bot)`
   - 动作：`Skip (Bypass all remaining security features)`
   - **目的**：确保经过验证的合法搜索引擎爬虫（Bingbot、Googlebot等）绝对不会被 Cloudflare 验证码（Turnstile/Captcha）拦截。
2. **强制全站 HTTPS 与重定向**：
   - 开启「Always Use HTTPS」；
   - 开启「Automatic HTTPS Rewrites」；
   - 检查并杜绝 HTTP/HTTPS 循环重定向。
3. **HTTP 缓存与响应头优化 (`_headers`)**：
   在 `public/_headers` 中可配置：
   ```http
   /*
     X-Content-Type-Options: nosniff
     X-Frame-Options: SAMEORIGIN
     Referrer-Policy: strict-origin-when-cross-origin

   /_astro/*
     Cache-Control: public, max-age=31536000, immutable

   /*.html
     Cache-Control: public, max-age=0, must-revalidate
   ```
