# R21B 項目

這是一個基於 Vue 3 開發的網頁應用項目。

## 技術堆棧

- 前端框架：Vue 3
- 開發語言：TypeScript
- 狀態管理：Vuex 4
- 路由管理：Vue Router 4
- UI 框架：Bootstrap 5 (透過 Bootstrap-Vue-3)
- 樣式處理：SCSS/Sass
- 模板引擎：Pug
- 部署平台：GitHub Pages

## 項目結構

```
R21B/
├── src/               # 源代碼目錄
│   ├── assets/        # 靜態資源
│   ├── components/    # 組件
│   ├── data/          # 數據文件
│   ├── enum/          # 枚舉定義
│   ├── interfaces/    # TypeScript 接口
│   ├── router/        # 路由配置
│   ├── store/         # Vuex 狀態管理
│   ├── views/         # 視圖組件
│   ├── App.vue        # 主應用組件
│   └── main.ts        # 入口文件
├── public/            # 公共資源目錄
├── backend/           # 後端代碼目錄
└── dist/              # 構建輸出目錄
```

## 安裝與運行

### 安裝依賴

```bash
npm install
```

### 開發環境運行

```bash
npm run serve
```

### 構建生產版本

```bash
npm run build
```

### 部署到 GitHub Pages

```bash
npm run deploy
```

## 開發指南

- 使用 `npm run format` 格式化代碼
- 使用 `npm run lint` 檢查代碼風格

## 許可證

本項目為私有項目，未經授權不得使用。