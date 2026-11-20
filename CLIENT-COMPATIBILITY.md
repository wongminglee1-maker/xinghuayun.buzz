# 杏花云 (XingHua Cloud) 跨平台客户端与 VLESS 协议兼容性全景手册

- **适用网站**：https://xinghuayun.buzz/clients/
- **更新日期**：2026年11月20日

---

## 1. 协议核心与内核技术现状

杏花云核心采用现代无状态 **VLESS 协议**。
由于早期经典版 Clash 内核（Dreamacro 原版）在数年前停更，其原生并不包含 VLESS 的解析逻辑。若要使用 Clash 客户端导入杏花云订阅，必须采用基于 **Mihomo（原 Clash Meta）内核** 构建的现代开源分支客户端。

---

## 2. 操作系统与主流客户端适配评测

### 1. Windows 10 / Windows 11
- **最佳推荐客户端**：**Clash Verge Rev**（内置最新 Mihomo 内核）
- **备选客户端**：v2rayN (基于 Xray 内核) / Flclash
- **兼容状态**：完全原生支持 VLESS、XTLS 与 gRPC 传输。
- **配置要点**：
  1. 建议在客户端中启用「Service Mode」服务模式，以便获取 Windows 虚拟网卡接管权限。
  2. 启用「Tun 模式」，解决非系统代理类软件（如游戏、终端开发）的分流。

### 2. macOS (Apple Silicon M系列 & Intel)
- **最佳推荐客户端**：**Clash Verge Rev for Mac**
- **备选客户端**：Sing-box macOS 图形客户端 / Flclash
- **兼容状态**：完全原生支持，提供针对 aarch64 (M1-M4) 与 x64 的独立二进制发行包。
- **配置要点**：首次启动需在 macOS「系统设置」→「隐私与安全性」中授权打开。

### 3. Android
- **最佳推荐客户端**：**Clash Meta for Android (CMFA)** 或 **Flclash**
- **备选客户端**：v2rayNG
- **兼容状态**：完美支持 VLESS。
- **配置要点**：在应用设置中开启“分应用代理”，将银行、微信等国内应用设为直连（Bypass），避免不必要的流量消耗与风控提示。

### 4. iOS / iPadOS
- **最佳推荐客户端**：**Shadowrocket (小火箭)** / **Sing-box**
- **获取途径**：需使用非国区 Apple ID（美区/港区/日区等）在 App Store 检索下载。
- **兼容状态**：原生支持 VLESS 协议与 Clash 格式分流规则。

---

## 3. 官方可信下载发布渠道索引 (Verified Channels)

| 软件名称 | 代码托管与官方发布源 (GitHub) | 安全防伪校验建议 |
|---|---|---|
| Clash Verge Rev | `https://github.com/clash-verge-rev/clash-verge-rev/releases` | 认准官方开发者签名，核对 SHA256 哈希值 |
| Mihomo (内核) | `https://github.com/MetaCubeX/mihomo/releases` | 官方 releases 页面二进制文件 |
| Clash Meta for Android | `https://github.com/MetaCubeX/ClashMetaForAndroid/releases` | 认准 MetaCubeX 官方发布之 APK 安装包 |
| v2rayN | `https://github.com/2dust/v2rayN/releases` | 认准 2dust 官方 releases 包 |
| Sing-box | `https://github.com/SagerNet/sing-box/releases` | 官方跨平台安装包 |

*严正警告：严禁从非官方授权的网盘、第三方软件下载站获取所谓的“破解绿色安装包”，防止遭遇木马嗅探与订阅私钥失窃。*
