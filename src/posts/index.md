# 文章列表

這裡會集中所有文章的入口。

<PostList />

## 撰寫新文章方式

在 `src/posts/` 新增一個 `.md` 檔案即可，例如：

```md
---
title: 新文章標題
date: 2026-03-28
description: 簡短摘要
tags:
  - C#
  - 測試
series: 系列名稱
seriesOrder: 1
---

# 新文章標題

文章內容寫在這裡。
```

首頁與這個列表頁都會自動讀取 `src/posts/*.md`，並依照 front matter 的 `date` 由新到舊排序。
如果文章有 `tags`，列表頁會顯示標籤，點擊標籤即可篩選同標籤文章；一篇文章可以同時加入多個標籤。
如果文章屬於同一系列，可以加上 `series` 與 `seriesOrder`，文章頁底部會依序顯示上一篇與下一篇。
