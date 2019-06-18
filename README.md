## 1. 作品简介
  向日葵学习计划是针对校园学习场景的计划管理小程序，包含制定计划、计划每日提醒、分享和借鉴他人的计划、助力同学、查看排行榜、获取阳光值等功能，旨在帮助同学们高效学习、交流学习经验、成为更好的自己！
## 2. 实现思路/架构图/流程图
- 主要页面实现思路

###### “今天”的实现思路
![首页思路](https://github.com/wp19990105/wx_Sunflower/blob/%E5%90%91%E6%97%A5%E8%91%B5/image/%E4%BB%8A%E5%A4%A9.jpg)
###### “发现”的实现思路
![“发现”思路](https://github.com/wp19990105/wx_Sunflower/blob/%E5%90%91%E6%97%A5%E8%91%B5/image/%E5%8F%91%E7%8E%B0.jpg)
###### “计划详情”的实现思路
![“详情”思路](https://github.com/wp19990105/wx_Sunflower/blob/%E5%90%91%E6%97%A5%E8%91%B5/image/%E8%AE%A1%E5%88%92%E8%AF%A6%E6%83%85.jpg)

- 架构图

###### 信息架构
![信息架构](https://github.com/wp19990105/wx_Sunflower/blob/%E5%90%91%E6%97%A5%E8%91%B5/image/%E4%BF%A1%E6%81%AF%E6%9E%B6%E6%9E%84.png)
###### 功能结构
![功能结构](https://github.com/wp19990105/wx_Sunflower/blob/%E5%90%91%E6%97%A5%E8%91%B5/image/%E5%8A%9F%E8%83%BD%E7%BB%93%E6%9E%84.png)
###### 功能描述
子功能点 | 子功能描述 | 所属模块
------------- | ------------- | -------------
日周月项目趋势 | 实时获取github社区流行项目 | Github Trending
项目README查阅 | 查阅该项目的README（支持仓库markdown文件的跳转浏览）| Github Trending
用户（组织）信息浏览 | 查看项目所属组织或用户相关的信息及关联的其他项目 | Github Trending
用户及仓库搜索查阅 | 通过关键词对github中的用户及项目进行搜索 | Github Trending
图文介绍 | 以图文（封面加标题）的方式获取新闻资讯列表 | Developer News
语音播报 | 以语音播报（标题加语音）的方式获取新闻内容 | Developer News
详细内容阅读 | 进入新闻详细页面,阅读新闻内容，作者和出处 | Developer News
每日签到 | 记录自己的打卡签到记录 | Code Everyday
每日5题 | 小程序每天随机为用户分配5道题，供用户零碎时间刷题 | Code Everyday
收藏和笔记 | 用户可以对每日分配的题目进行收藏以及做笔记,并在个人中心查阅 | Code Everyday
题库分类查询 | 对题库进行标签以及难易程度分类便于用户针对性的整理和查询 | Code Everyday

- 流程图

###### 主要功能流程
![主要功能流程](https://github.com/wp19990105/wx_Sunflower/blob/%E5%90%91%E6%97%A5%E8%91%B5/image/%E6%B5%81%E7%A8%8B%E5%9B%BE.png)
## 3.项目效果图例
## 4.源码链接
