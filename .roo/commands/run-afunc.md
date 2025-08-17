---
description: 直接运行一个指定的 AFunc。使用方法：在本命令后追加 AFunc 名称和 YAML 格式的输入参数。
argument-hint: <afunc-name> <yaml-inputs>
---

# Run AFunc - 显式指令执行模式

此指令要求 afunc-agent 运行一个指定的 AFunc。请严格按照以下步骤操作：
1.  **指定 AFunc**: 在下面的 `target_afunc_name` 字段中，填写你想要运行的 AFunc 的 `afunc_name` (例如:`echo-message`)。
2.  **指定输入**: 在下面的 `target_afunc_inputs` 字段下，以 YAML 格式提供该 AFunc 所需的输入参数。
3.  **执行**: afunc-agent 将使用 `afunc/tasks/afunc-runner.md` 任务来执行此调用。


### 任务输入 (Inputs for afunc-runner)

target_afunc_name: "在此处填写 AFunc 名称, 例如：`<afunc-name>`"
target_afunc_inputs:  "在此下方以 YAML 格式填写输入参数，例如：`<yaml-inputs>`"
