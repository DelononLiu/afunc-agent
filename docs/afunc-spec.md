# AFunc 规范 (Specification)

## 概述 (Overview)

本文档定义了 AFunc (Agentic Function) 的标准结构和内容要求。所有新的 AFunc 都应遵循此规范，以确保其在 AFunc Agent 系统中的一致性和可执行性。

## 文件结构 (File Structure)

一个标准的 AFunc 文件是一个 `.yaml` 文件，其内容遵循以下结构：

```yaml
# 必需 (Required)
afunc_name: unique-afunc-name
description: AFunc 的简要描述。
tools: [list, of, required, tools] # 基础工具(read, write, bash, grep, glob)无需声明
capability: |
  AFunc 的核心能力的详细描述。应清晰地说明该 AFunc 能做什么，以及它如何与其他 AFunc 或系统组件交互。
  
# 可选 (Optional)  
# inputs: # 输入参数列表
#   - name: input_name_1
#     description: 输入参数1的描述。
#   - name: input_name_2
#     description: 输入参数2的描述。

# 可选 (Optional)
# outputs: # 输出结果列表
#   - name: output_name_1
#     description: 输出结果1的描述。
#   - name: output_name_2
#     description: 输出结果2的描述。

# 可选 (Optional)
# constraints: # 执行约束条件
#   - 约束条件1的描述。
#   - 约束条件2的描述。

# 必需 (Required)
instructions:
  - 第一条明确、精确的执行指令。指令可以包含变量，如 {input_name_1}, {task_name}, {project_path}。
  - 第二条明确、精确的执行指令。
  # ... 更多指令
```

## 字段详解 (Field Details)

### `afunc_name` (必需)

*   **类型**: String
*   **描述**: AFunc 的唯一标识符。必须使用小写字母、数字和连字符 (`-`) 组成，且以字母开头。例如 `generate-document`, `read-project`。
*   **命名约定**: 应能清晰反映 AFunc 的功能。

### `description` (必需)

*   **类型**: String
*   **描述**: 对 AFunc 功能的简要、清晰的描述。通常是一句话。

### `tools` (必需)

*   **类型**: List of Strings
*   **描述**: AFunc 执行过程中需要使用的特殊工具列表。**注意**：AFunc Mode 本身支持的基础工具 `read`, `write`, `bash`, `grep`, `glob` 无需在此声明。只有需要使用其他特殊工具时，才需要在此列出。
*   **示例**: `tools: [curl, jq]`

### `capability` (必需)

*   **类型**: String (多行)
*   **描述**: 对 AFunc 核心能力的详细、准确的描述。应说明该 AFunc 的职责范围、它能处理什么类型的任务、以及它可能产生的输出。这有助于其他开发者（或AI）理解该 AFunc 的用途。

### `inputs` (可选)

*   **类型**: List of Objects
*   **描述**: AFunc 执行所需的输入参数列表。每个输入项是一个包含 `name` 和 `description` 的对象。
    *   `name`: (String) 输入参数的名称。
    *   `description`: (String) 输入参数的详细描述，说明其用途和期望的格式。

### `outputs` (可选)

*   **类型**: List of Objects
*   **描述**: AFunc 执行完成后产生的输出结果列表。每个输出项是一个包含 `name` 和 `description` 的对象。
    *   `name`: (String) 输出结果的名称。
    *   `description`: (String) 输出结果的详细描述，说明其内容和格式。

### `constraints` (可选)

*   **类型**: List of Strings
*   **描述**: AFunc 执行时必须满足的约束条件或前提。例如，需要特定的文件存在，或者需要在特定的目录下运行。

### `instructions` (必需)

*   **类型**: List of Strings
*   **描述**: AFunc 的核心执行步骤。这是一组精确的、为 AI 执行器设计的指令。每一条指令都应该是明确的、可执行的动作。指令可以包含变量（如 `{input_name}`, `{task_name}`, `{project_path}`），这些变量将在执行时被具体值替换。
*   **重要**: 这些指令将被 AFunc Agent 严格按顺序执行。指令的清晰度和准确性直接影响 AFunc 的执行效果。

## 最佳实践 (Best Practices)

1.  **清晰性**: 所有描述和指令都应尽可能清晰、无歧义。
2.  **一致性**: 遵循本文档定义的结构和命名约定。
3.  **模块化**: 设计 AFunc 时，应使其功能尽可能单一和独立，便于组合和复用。
4.  **健壮性**: 在 `constraints` 中明确前提条件，并在 `instructions` 中考虑错误处理（如果适用）。
5.  **可测试性**: 设计 `inputs` 和 `outputs` 时，应考虑如何验证 AFunc 的执行结果。