---
task_name: test-echo-message-simple
description: 一个简单的测试任务，用于测试 afunc-agent 模式和 echo-message AFunc。
tools: [bash]
---

### 任务描述
此任务旨在通过调用 `echo-message` AFunc 来验证 afunc-agent 模式是否能正确解析和执行 AFunc。

【要求】
- 成功调用 `echo-message` AFunc 并传递消息 "Hello, AFunc Agent!"。
- AFunc 应正确回显消息并更新 Runtime Context。

【参考】
- `afunc/afuncs/echo-message.yaml`

### 任务 TODO List
- [ ] 调用 `echo-message` AFunc，输入消息 "Hello, AFunc Agent!"。

### Runtime Context
# 在此区域维护任务的运行时上下文，用于 AFuncs 间进行数据传递


### 任务交付件
- `prompts.log` 文件中的日志记录。
- Runtime Context 中被更新的 `echoed_message` 字段。

### 人工审查意见
状态：
描述：

### 自动化测试报告
状态：
描述: 