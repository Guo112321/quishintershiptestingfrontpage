###  成员信息展示与编辑

一个基于 **Next.js + TypeScript + Tailwind CSS** 的前端应用，用于展示和编辑用户的个人信息与兴趣标签。

---

## 🚀 项目简介
本项目模拟一个小型社交空间：
- 左侧为成员侧边栏（展示头像、心情、单身与在线状态）  
- 点击成员进入详情页 `/user/[id]`
- “本人”可编辑昵称、兴趣标签和心情  
- 兴趣标签支持多选与分类筛选  
- 自动跳转 `/user → /user/1`

---

## 🏗️ 技术栈
- **Next.js 15 (App Router)**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- 自定义状态管理 (`UsersProvider`)
- 静态数据源：`/data/data.ts` 和 `/data/userData.ts`

---

## 🧩 主要功能
| 模块 | 功能描述 |
|------|-----------|
| Sidebar | 展示所有成员头像与状态 |
| User Detail | 展示单个用户的详细资料 |
| Edit Dialog | 编辑本人昵称、头像、兴趣和心情 |
| Data | 使用本地数据模拟数据库（可扩展到 API） |

---

## ⚙️ 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 打开 http://localhost:3000