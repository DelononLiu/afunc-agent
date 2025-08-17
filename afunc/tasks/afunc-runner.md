---
task_name: afunc-runner
description: 一个通用的任务模板，用于执行通过 Runtime Context 指定的 AFunc。
tools: [] # 工具由被调用的 AFunc 决定
---

### 任务描述
此任务是一个通用的 AFunc 执行器。它从自身的 `Runtime Context` 中读取 `target_afunc_name` 和 `target_afunc_inputs`，然后调用该 AFunc。

### 任务 TODO List
- [ ] 调用 `target_afunc_name` AFunc，并传入 `target_afunc_inputs` 作为输入。

### Runtime Context
# 用于 AFuncs 间传递数据。
# 此任务的 Runtime Context 应包含以下由外部注入的初始值：
# target_afunc_name: "要调用的 AFunc 名称"
# target_afunc_inputs:
#   # 这里应包含目标 AFunc 所需的所有输入参数
target_afunc_name: ""
target_afunc_inputs: {}
# AFunc 的输出将根据其 'outputs' 定义自动填充到此处。

### 任务交付件
- 被调用 AFunc 的所有输出和交付件。