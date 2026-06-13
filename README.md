# 本地小商家内容工作台

一个面向本地餐饮、夜宵、美业、咖啡、宠物和健身商家的内容工作台 MVP。

用户输入店铺资料、产品卖点和活动优惠后，应用会在本地生成：

- 7 天社媒发布日历
- 朋友圈/小红书/短视频文案
- 短视频脚本
- 点评回复模板
- TXT 和 JSON 内容包导出
- 可安装到桌面的 PWA App

## 技术栈

- Vite
- React
- TypeScript
- Vitest
- localStorage
- Web App Manifest
- Service Worker

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://127.0.0.1:5173/`。

## 作为 App 安装

生产构建后，应用会注册 service worker 并提供浏览器安装入口：

```bash
npm run build
npm run preview
```

打开预览地址后，可在 Chrome、Edge 或 Android 浏览器中选择“安装应用”或“添加到主屏幕”。安装后应用会以独立窗口运行，并缓存核心页面，断网时仍可打开已缓存的工作台。

## 验证

```bash
npm test
npm run build
```

首版不接数据库、不接登录、不接真实 AI API，重点验证小商家是否愿意为一周内容包付费。
