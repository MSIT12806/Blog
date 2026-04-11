---
layout: home

hero:
  name: Robin
  text: 從心理學走進軟體工程
  tagline: 我用 C#、ASP.NET Core、Vue 與 SQL 建構系統，也在這裡整理軟體工程、FHIR 與產品思考的學習歷程。
  image:
    src: /mark.svg
    alt: Robin
  actions:
    - theme: brand
      text: 接案合作
      link: /services
    - theme: alt
      text: 文章列表
      link: /posts/
  # 履歷頁入口暫時隱藏。
  # 如需恢復，重新加入以下 action：
  # - theme: brand
  #   text: 先認識我
  #   link: /profile

features:
  - title: 系統開發
    details: 以 ASP.NET、ASP.NET Core、Vue、SQL Server 與 PostgreSQL 為主，處理過校務、報表與行政流程系統。
  - title: 單次交付
    details: 偏好需求明確、可在一個專案週期內完成的小型系統或內部工具，不以長期駐點維護為主。
  - title: 工程方法
    details: 持續實踐 Clean Architecture、DDD、BDD 與可維護的模組設計，而不只追求功能上線。
---

## 接案方向

如果你正在找能解決特定流程問題的小型系統開發，我現在有開放單次型接案合作。

[查看接案頁面](/services)

<!--
履歷頁導流文案暫時隱藏。
如需恢復：

## 先從哪裡開始

如果你是第一次來，建議先看 [認識我](/profile)。

那一頁會比傳統履歷更完整地說明我的背景、工作方法，以及我為什麼特別關注醫療、教育與對人有幫助的系統。
-->

## 最新文章

<PostList :limit="5" />

[查看所有文章](/posts/)

## 這個網站會持續整理

1. C# / ASP.NET Core 開發經驗。
2. 系統設計與軟體工程實踐。
3. FHIR 與醫療資訊學習筆記。
4. 關於需求理解、產品思考與團隊合作的觀察。