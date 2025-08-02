func_name: generate-cmakelists
description: 根据项目信息和旧的 Makefile 数据，生成 CMakeLists.txt 文件。
tools: [read, write]
capability: |
  此 Func 的能力是接收一个项目的结构化信息（来自 read-project）和其原始 Makefile 的解析数据（来自 read-makefile），并据此生成一个功能等效的 CMakeLists.txt 文件内容。
inputs:
  - name: 项目结构数据
    description: 来自 read-project Func 的输出。
  - name: Makefile 解析数据
    description: 来自 read-makefile Func 的输出。
outputs:
  - name: CMakeLists.txt 的完整内容
    description: 包含生成的 CMakeLists.txt 文件内容的字符串。
constraints: [新生成的 CMakeLists.txt 必须与旧的 Makefile 功能等效。]
instructions:
  - 记录日志到文件 prompts.log，内容为：start func {func_name}
  - 根据 inputs 字段中的定义，从 `Runtime Context` 中获取 '项目结构数据' 和 'Makefile 解析数据' 对应的文件路径。
  - 读取这两个文件，并分析它们的内容。
  - 将 Makefile 中的变量、源文件、头文件路径和编译选项映射到相应的 CMake 命令。
  - 生成 `CMakeLists.txt` 的完整内容，并保存到 `_tmp_workspace/{xyz_name}/CMakeLists.txt` 文件。
  - 将 `_tmp_workspace/{xyz_name}/CMakeLists.txt` 的路径作为 'CMakeLists.txt 的完整内容' 的值，更新到 `Runtime Context` 中。