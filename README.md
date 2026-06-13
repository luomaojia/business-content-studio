# 本地小商家内容工作台

一个面向本地餐饮、夜宵、美业、咖啡、宠物和健身商家的内容工作台 MVP。

用户输入店铺资料、产品卖点和活动优惠后，应用会在本地生成：

- 7 天社媒发布日历
- 朋友圈/小红书/短视频文案
- 短视频脚本
- 点评回复模板
- TXT 和 JSON 内容包导出
- 可安装到桌面的 PWA App
- 可选 LLM API 生成模式，支持自定义兼容接口

## 技术栈

- Vite
- React
- TypeScript
- Vitest
- localStorage
- Web App Manifest
- Service Worker
- Netlify Functions

## 文案生成方式

默认使用本地模板生成，不需要联网或 API Key。

如果需要更灵活的 AI 文案，可以在页面左侧切换到 `LLM API`：

- API 地址：填写任意 OpenAI Chat Completions 兼容接口地址。
- 模型：填写对应供应商的模型名。
- API Key：仅保存在当前浏览器会话中，不写入仓库。
- 自定义请求头：可用 JSON 补充不同网关需要的请求头。

线上部署通过 Netlify Function `/api/generate-content` 转发请求，避免浏览器跨域限制。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://127.0.0.1:5173/`。

## 在线访问

[https://business-content-studio.netlify.app](https://business-content-studio.netlify.app)

## 直接下载

- [下载可部署 App 构建包](https://github.com/luomaojia/business-content-studio/releases/download/v0.1.0/business-content-studio-webapp-v0.1.0.zip)
- [下载完整源码 ZIP](https://github.com/luomaojia/business-content-studio/archive/refs/tags/v0.1.0.zip)
- [查看 GitHub Release](https://github.com/luomaojia/business-content-studio/releases/tag/v0.1.0)

## 作为 App 安装

生产构建后，应用会注册 service worker，并提供 iOS、Android、Windows 都能使用的 PWA 安装入口：

```bash
npm run build
npm run preview
```

平台支持：

- iOS / iPadOS：用 Safari 打开站点，点击分享按钮，选择“添加到主屏幕”。
- Android：用 Chrome 打开站点，点击浏览器菜单或页面安装提示，选择“安装应用”。
- Windows：用 Edge 或 Chrome 打开站点，点击地址栏安装图标，安装后以独立窗口运行。

安装后应用会缓存核心页面和图标，断网时仍可打开已缓存的工作台。

## 验证

```bash
npm test
npm run build
```
