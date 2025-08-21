# AFunc Agent 项目概况

## 1. 项目概述 (Project Overview)

**AFunc Agent** (Agentic Function Agent) 是一个探索AI辅助编程开发流程的实验性项目。其核心是通过标准化的迭代流程，验证AI在软件开发全生命周期中的应用效果。

### 1.1. 核心目标 (Core Goals)
- **验证AI编程流程**: 建立可复用、可复现的AI辅助开发标准流程。
- **模板驱动开发**: 通过标准化模板（AFuncs, Tasks）提高AI输出的一致性和质量。
- **全流程覆盖**: 从需求文档生成到代码实现、测试验证的端到端AI协作。
- **实现一句话需求**: 经过多轮迭代和优化后，基于模板和流程，最终实现通过“一句话需求”驱动完成整个开发流程。

### 1.2. 开发模式 (Development Mode)
项目采用“一句话需求”工作流，通过标准化的迭代流程，实现从模糊需求到高质量代码和文档的转化。其核心工作流如下：

1.  **启动与设计 **(知识积累)
    *   **输入**: 一句话需求。
    *   **动作**: 与 AI 共同分析需求，完成功能设计（接口、模型、任务拆解）。
    *   **产出**: 完整的功能设计文档。

2.  **代码实现 **(高效执行)
    *   **输入**: 功能设计文档、项目规范 (RULES.md)。
    *   **动作**: AI 根据文档和规范，自动生成代码。
    *   **产出**: 符合要求的代码文件。

3.  **测试与迭代 **(验证完善)
    *   **动作**: 人工测试代码，发现 Bug 或不足，向 AI 提出具体修改意见。
    *   **产出**: 经过验证和优化的最终代码。

4.  **归档与知识积累 **(闭环优化)
    *   **动作**: 完善设计文档复盘，更新项目规范 (RULES.md)，归档所有交付件。
    *   **产出**: 更新的知识库和可追溯的项目资产。

### 1.2. 核心机制
- **Task任务拆解**: 将复杂的开发任务分解为具体、可执行的小任务。
- **AFunc执行机制**: 通过标准化的AFunc（Agentic Function）来实现任务的具体执行步骤，确保执行的一致性和可复用性。
- **数据/文档驱动**: 以结构化的数据和模板化的文档为核心驱动，实现任务间的标准化协作，提升交付输出的质量和一致性。


## 2. 技术选型 (Technology Stack)
- **核心引擎**: [Roo Code](https://code.roo.app/) VSCode 插件，作为AI Agent的执行和交互平台。
- **配置与模板语言**: 主要使用 YAML 和 Markdown 来定义AFunc、Task和模板。
- **版本控制**: Git。

## 3. 目录结构与组件 (Directory Structure & Components)

```
afunc-agent/
├── afunc/                   # AFunc 核心目录
│   ├── afuncs/              # 系统预定义的 AFunc (Agentic Functions)
│   ├── tasks/               # 系统预定义的任务 (按领域划分)
│   └── templates/           # 模板文件 (用于生成文档和任务)
├── docs/                    # 项目文档
├── examples/                # 使用示例
├── script/                  # 辅助脚本
├── .roo/                    # Roo Code 插件相关配置或命令
└── ...                      # 其他通用文件 (README, LICENSE等)
```

### 3.1. 组件详细说明 (Component Details)
- **`afunc/afuncs/`**: 存放 `.yaml` 文件，每个文件定义一个可重用的 AFunc，明确其能力、输入、输出和执行指令。
- **`afunc/tasks/`**: 存放 `.md` 文件，每个文件定义一个具体的、可执行的开发任务，包含任务描述、待办清单、运行时上下文和交付件。
- **`afunc/templates/`**: 存放用于生成文档或任务的模板文件，确保输出的一致性。

## 4. 核心概念 (Core Concepts)

### 4.1. AFunc (Agentic Function) 概念与模板结构
- **概念**: AFunc 是项目的核心单元，代表一个由 AI 驱动的、可重用的功能模块。它将复杂的任务分解为标准化、可调用的步骤。
- **模板结构**:
    ```markdown
    ---
    name: example-afunc-name
    description: 一个示例 AFunc 的描述
    tools: [read, write, bash] # AFunc 所需的工具列表
    ---
    
    ### 任务描述
    ... # 详细的背景、目的和约束条件说明。
    
    ### 任务 TODO List
    - [ ] 步骤 1
    - [ ] 步骤 2
    
    ### 任务交付件
    - `output.txt` # 任务完成后预期的产出文件列表。
    ```

### 4.2. 任务 (Task) 概念与模板结构
- **概念**: Task 是一个具体的开发目标，由一个或多个 AFunc 协作完成。它为 AI 提供了明确的执行上下文和目标。
- **模板结构**:
    ```markdown
    ---
    task_name: example-task-name
    description: 一个示例任务的描述
    tools: [bash]
    ---
    
    ### 任务描述
    ... # 任务的背景、要求和参考信息。
    
    ### 任务 TODO List
    - [ ] 调用 `some-afunc` AFunc 并完成某项操作。
    
    ### Runtime Context
    # 在此区域维护任务的运行时上下文，用于 AFuncs 间进行数据传递。
    # afunc_output: ""
    
    ### 任务交付件
    - `some-output-file.txt` # 任务完成后预期的产出。
    
    ### 人工审查意见
    状态：
    描述：
    
    ### 自动化测试报告
    状态：
    描述:
    ```

## 5. 开发流程与规范 (Development Process & Standards)

### 5.1. 流程标准化 (Standardized Process)
项目通过多轮迭代（Iteration）不断演进。每轮迭代遵循固定的5阶段结构：
1.  **0、模板准备** - 准备或复用开发所需的AFunc和Task模板。
2.  **1、文档生成** - AI根据任务要求生成PRD、架构设计等文档。
3.  **2、代码实现** - AI根据文档和任务要求生成代码和测试。
4.  **3、提示词优化** - 根据执行结果，优化AFunc的提示词、指令和模板。
5.  **4、验证入库** - 对AI的产出进行偏差分析、问题修复和质量验证，最终固化成果。

### 5.2. 任务组织与命名规范
- **组织**: 系统预定义任务按功能领域（如 `core/`, `development/`, `documentation/`）组织在 `afunc/tasks/` 目录下。
- **命名**: 使用数字前缀（如 `00-`, `01-`）进行排序，使用连字符分隔单词，文件名应简洁明了。

### 5.3. AFunc 能力与指令定义
- AFunc 的 `capability` 字段描述其核心功能。
- AFunc 的 `instructions` 字段是一套精确的、为AI设计的执行指令，可以看作是与AI交互的“智能协议”，确保执行的准确性和一致性。

## 6. 运行与部署 (Running & Deployment)
- **快速开始**:
    1.  安装 VSCode。
    2.  安装并配置 [Roo Code](https://code.roo.app/) 插件。
    3.  在 Roo Code 中加载项目任务（如 `afunc/tasks/test-echo.md`）并执行。

## 7. 自动化与验证 (Automation & Validation)
- 任务模板中包含“自动化测试报告”部分，强调对AI产出进行自动化验证的重要性。
- “验证入库”阶段是流程中的关键一环，确保质量。

## 8. 项目当前状态 (Current Status)

### 8.1. 当前阶段 (Current Stage)
实验性项目 (Experimental)。项目仍处于早期探索和验证阶段，核心概念和流程正在不断迭代和完善中。

### 8.2. 最新更新 (Recent Updates)
- 引入了标准化的 AFunc (Agentic Function) 概念和模板结构。
- 明确了基于任务驱动的开发模式和5阶段迭代流程。
- 通过 `test-echo` 等基础任务验证了基本的 AFunc 执行机制。

### 8.3. 已知问题 (Known Issues)
- 项目依赖于特定的 IDE 插件 (Roo Code)，限制了其通用性。
- AFunc 和 Task 的模板结构仍在演进中，可能存在不完善之处。
- 缺乏更复杂的端到端示例来全面验证流程的有效性。
- 自动化验证机制尚未完全建立。

### 8.4. 未来计划 (Future Plans)
- 探索更复杂的任务分解与 AFunc 编排机制。
- 丰富 AFunc 库，覆盖更多软件开发场景（如代码重构、测试生成）。
- 优化与 Roo Code 插件的交互方式，提升执行效率和稳定性。
- 积累更多案例，验证“一句话需求”到全流程自动化的可行性。

### 8.5. 健康状况 (Health)
积极开发中 (Actively Developed)。项目核心团队正投入精力进行概念验证和流程优化。

## 9. 其他 (Others)
- **许可证**: MIT License。
- **贡献指南**: 详见 `README.md`。
- **变更日志**: 详见 `CHANGELOG.md`。