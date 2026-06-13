# 本地小商家内容工作台

一个面向本地餐饮、夜宵、美业、咖啡、宠物和健身商家的内容工作台 MVP。

用户输入店铺资料、产品卖点和活动优惠后，应用会生成：

- 7 天社媒发布日历
- 朋友圈、小红书、短视频文案
- 短视频脚本
- 点评回复模板
- TXT 和 JSON 内容包导出
- 可选 LLM API 生成模式，支持自定义兼容接口

## 技术栈

- Vite
- React
- TypeScript
- Vitest
- localStorage
- Netlify Functions

## 文案生成方式

默认使用本地模板生成，不需要联网或 API Key。

本地模板库内置 12 套内容角度，并按自然周自动轮换；同一周生成结果保持稳定，下一周会换一组表达方式，适合持续做朋友圈、小红书和短视频选题。

如果需要更灵活的 AI 文案，可以在页面左侧切换到 `LLM API`：

- API 地址：填写任意 OpenAI Chat Completions 兼容接口地址。
- 模型：填写对应供应商的模型名。
- API Key：仅保存在当前浏览器会话中，不写入仓库。
- 自定义请求头：可用 JSON 补充不同网关需要的请求头。

线上部署通过 Netlify Function `/api/generate-content` 转发请求，避免浏览器跨域限制。

### LLM API providers

页面内置三个选项：

- `DeepSeek`：自动填入 `https://api.deepseek.com/chat/completions` 和 `deepseek-v4-flash`，默认使用 `Authorization: Bearer <API Key>`。
- `MiMo`：自动填入 `https://api.xiaomimimo.com/v1/chat/completions` 和 `mimo-v2.5-pro`，默认使用 `api-key: <API Key>`。
- `自定义兼容接口`：适合 OpenAI Chat Completions 兼容网关，必要时可在高级设置里补充 JSON 请求头。

## 多语言

页面顶部可切换语言，当前支持：

- 中文
- English
- 日本語
- 한국어
- Español
- Français
- Deutsch
- Português
- العربية

切换语言后，界面文案、模板生成结果、导出 TXT 字段和 LLM 生成提示都会跟随目标语言。阿拉伯语会自动切换为 RTL 方向。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://127.0.0.1:5173/`。

## 在线访问

[https://business-content-studio.netlify.app](https://business-content-studio.netlify.app)

## 验证

```bash
npm test
npm run build
```
