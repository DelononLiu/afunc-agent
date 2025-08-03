---
xyz_name: make-to-cmake-migration
description: 迁移项目构建系统从 Make 到 CMake。
tools: [read, write, bash, grep, glob]
---

### 任务描述
此任务旨在通过协调和调用一系列原子化的 Func，将一个现有使用 Make 构建的 C/C++ 项目迁移到 CMake 构建系统，确保其现代化和跨平台兼容性。

【要求】
- 迁移后的项目应能通过标准的 CMake 工作流成功编译。
- 确保所有原有功能在迁移后不受影响，保持其正确性。
- 在不引入新功能的前提下，尽量保持原有的项目结构和模块划分。

【参考】
- 请遵循项目的**通用编码规范**和**文件组织标准**。
- 请查阅相关的**项目产品需求**和**架构文档**以获取功能细节。

### 任务 TODO List
- [ ] 调用 read-project 和 read-makefile Func，获取项目结构和构建信息。
- [ ] 调用 generate-cmakelists Func，生成新的 `CMakeLists.txt` 文件。
- [ ] 调用 run-cmake-target Func，构建并验证项目，并将结果写入 `自动化测试报告`。
- [ ] 更新 `README.md` 中的构建说明，以适应 CMake。
- [ ] 再次调用 run-cmake-target Func，运行测试并验证功能，并将结果写入 `自动化测试报告`。

### Runtime Context
# 在此区域维护任务的运行时上下文，用于 Funcs 间进行数据传递 
# 初始值通常来自用户输入
project_name: func-add
project_path: `(path to project)`

### 任务交付件
- `CMakeLists.txt` (项目根目录)
- 更新后的 `README.md` (项目根目录)

### 人工审查意见
状态：
详细描述：

### 自动化测试报告
状态：
详细信息: 
