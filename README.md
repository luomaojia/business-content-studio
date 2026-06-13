# 本地小商家内容工作台

一个面向本地餐饮、夜宵、美业、咖啡、宠物和健身商家的内容工作台 MVP。

用户输入店铺资料、产品卖点和活动优惠后，应用会在本地生成：

- 7 天社媒发布日历
- 朋友圈/小红书/短视频文案
- 短视频脚本
- 点评回复模板
- TXT 和 JSON 内容包导出

## 技术栈

- Vite
- React
- TypeScript
- Vitest
- localStorage

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://127.0.0.1:5173/`。

## 验证

```bash
npm test
npm run build
```

首版不接数据库、不接登录、不接真实 AI API，重点验证小商家是否愿意为一周内容包付费。
