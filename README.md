# InterviewCopilot - AI 模拟面试官

## 1. 项目简介 (Project Overview)
InterviewCopilot 是一款基于 LLM (大语言模型) 的移动端 H5 模拟面试应用。旨在通过角色扮演（Role-Play）的方式，帮助求职者在真实的对话语境中演练面试技巧，并获得即时的评分与反馈。

**核心价值：** 解决求职者“面试怯场”、“不知道怎么回答”的痛点，提供低成本、高频次的实战演练环境。

## 2. 核心功能点 (Key Features)

### 2.1 智能面试配置 (Setup)
* **职位解析：** 用户输入或粘贴目标职位描述 (JD)，系统自动提取关键技能点。
* **简历匹配：** (可选) 用户上传简历信息，AI 根据简历与 JD 的匹配度生成个性化面试题。
* **风格定制：** 支持选择面试官风格（如：亲和型 HR、严厉型技术总监、压力面专家）。

### 2.2 沉浸式模拟对话 (Chat Interview)
* **流式交互 (Streaming):** 采用 SSE (Server-Sent Events) 技术，实现 AI 回复的“打字机”效果，降低等待焦虑，还原真实对话节奏。
* **语音转文字 (STT):** (规划中) 支持用户直接语音回答，系统自动转为文字发送。
* **上下文记忆：** 能够基于之前的对话内容进行追问（Context-Aware），而非单次问答。

### 2.3 智能评分与反馈 (Feedback)
* **多维度评分：** 面试结束后，从“逻辑性”、“专业度”、“沟通技巧”三个维度生成雷达图评分。
* **回答优化：** 针对每一个问题，AI 提供“参考的高分回答”建议，帮助用户复盘。

### 2.4 面试历史归档 (History)
* **云端存储：** 自动保存所有的面试对话记录，方便用户随时回顾。

## 3. 技术架构 (Tech Stack)

* **前端 (Frontend):** React 18, Vite, TypeScript, Ant Design Mobile
* **后端 (Backend):** NestJS (Node.js), Prisma ORM
* **数据库 (Database):** MySQL 8.0
* **AI 引擎 (AI Engine):** DeepSeek / OpenAI API
* **运维 (DevOps):** Docker, Nginx, GitHub Actions

---
