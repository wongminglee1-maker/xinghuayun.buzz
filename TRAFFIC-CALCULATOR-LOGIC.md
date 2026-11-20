# 杏花云 (XingHua Cloud) 流量预算计算器算法逻辑与测算公式说明书

- **模块标识**：Blossom Traffic Calculator · 杏花流量预算中心
- **组件位置**：`src/components/TrafficCalculator.astro`
- **文档维护日期**：2026年11月20日

---

## 1. 用户输入变量体系 (Input Parameters)

| 参数变量名 | 界面显示名称 | 取值范围 | 默认初始值 | 行业基准模型消耗标准 |
|---|---|---|---|---|
| `webHours` | 网页与社交通讯时长 | 0 – 10 小时/天 | 2.0 小时 | 约 **0.15 GB / 小时**（普通图文浏览、即时聊天） |
| `aiHours` | AI 工具交互时长 (ChatGPT等) | 0 – 8 小时/天 | 1.0 小时 | 约 **0.08 GB / 小时**（文本与轻度代码交互） |
| `videoHours` | 流媒体视频观看时长 | 0 – 12 小时/天 | 2.0 小时 | 根据清晰度动态确定每小时码率 |
| `videoRate` | 视频画质清晰度 | 720P / 1080P / 4K | 1080P (1.8) | 720P: **0.9 GB/h**; 1080P: **1.8 GB/h**; 4K: **7.0 GB/h** |
| `meetingHours` | 远程视频会议 / 语音协作 | 0 – 6 小时/天 | 1.0 小时 | 约 **0.80 GB / 小时**（双向 720P/1080P 压缩码率） |
| `downloadMonthly` | 月度大文件/游戏更新 | 0 – 300 GB/月 | 20 GB | 离散大文件消耗 |
| `activeDays` | 每月有效联网天数 | 5 – 30 天/月 | 30 天 | 适应周末断网或全勤使用不同习惯 |

---

## 2. 核心数学计算公式 (Mathematical Formulation)

### 2.1 每日预估消耗量 (Daily Traffic)
$$\text{Daily Traffic (GB)} = (\text{webHours} \times 0.15) + (\text{aiHours} \times 0.08) + (\text{videoHours} \times \text{videoRate}) + (\text{meetingHours} \times 0.8)$$

### 2.2 月度预估总消耗量 (Monthly Traffic)
$$\text{Monthly Traffic (GB)} = \text{round}\left( \text{Daily Traffic} \times \text{activeDays} + \text{downloadMonthly} \right)$$

### 2.3 年度预估总消耗量 (Yearly Traffic)
$$\text{Yearly Traffic (GB)} = \text{Monthly Traffic} \times 12$$

### 2.4 各场景流量占比构成 (Percentage Breakdown)
- 视频占比：$P_{\text{video}} = \frac{\text{videoHours} \times \text{videoRate} \times \text{activeDays}}{\text{Monthly Traffic}} \times 100\%$
- 会议占比：$P_{\text{meeting}} = \frac{\text{meetingHours} \times 0.8 \times \text{activeDays}}{\text{Monthly Traffic}} \times 100\%$
- 浏览占比：$P_{\text{web}} = \frac{\text{webHours} \times 0.15 \times \text{activeDays}}{\text{Monthly Traffic}} \times 100\%$
- 下载占比：$P_{\text{download}} = \frac{\text{downloadMonthly}}{\text{Monthly Traffic}} \times 100\%$
- AI占比：$P_{\text{ai}} = \max\left(0, 100\% - (P_{\text{video}} + P_{\text{meeting}} + P_{\text{web}} + P_{\text{download}})\right)$

---

## 3. 套餐匹配算法梯队 (Plan Matching Ladder)

```
Monthly Traffic ≤ 50 GB  ──► 推荐「年付50G」初绽杏花 (年付¥12，折合¥1/月)
Monthly Traffic ≤ 100 GB ──► 推荐「年付100G」双花晨露 (年付¥24，折合¥2/月)
Monthly Traffic ≤ 200 GB ──► 推荐「轻量版」春日花枝 (月付¥3，灵活无绑定)
Monthly Traffic ≤ 500 GB ──► 推荐「标准版」杏花庭院 (月付¥6，主力平衡款)
Monthly Traffic ≤ 1000 GB ──► 推荐「专业版」千花盛放 (月付¥10，千GB大流量)
Monthly Traffic > 1000 GB ──► 提示「超出单套餐月流量」，建议按需规划多个账号
```

### 一次性 365天流量包 (1000GB) 特殊判断逻辑：
- 若用户属于低频使用（例如月活跃天数较少），且全年累计消耗预计在 1000GB 以内，系统额外提示：**“您也可以考虑一次性支付 ¥20 的 365天流量包，整年总计 1000GB，无需承担每月清零损耗。”**
- 若全年消耗明显高于 1000GB，则明确提示不建议选择一次性流量包，周期套餐更具性价比。
