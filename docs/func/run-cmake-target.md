name: run-cmake-target
description: 在指定项目目录中执行 CMake 构建或运行目标，并返回结果。
tools: [bash]
capability: |
  此 Func 的能力是在一个 CMake 项目中执行特定的目标。它可以用于构建项目（例如 all）或运行已编译的可执行文件。它会返回执行的状态和完整的日志。
inputs:
  - name: 项目根目录路径
    description: CMake 项目的根目录路径。
  - name: 要执行的 CMake 目标
    description: 例如 'all' 或可执行文件名称。
outputs:
  - name: 执行状态和日志
    description: 一个结构化的 Markdown 格式字符串，包含执行的状态（成功/失败）和完整的日志信息。
constraints:
  - 需确保项目已包含 CMakeLists.txt 文件。
  - 执行 'all' 目标前，需确保 CMake 构建目录已存在。
instructions:
  - 记录日志到文件 prompts.log，内容为：start func {name} 
  - 进入指定的项目根目录。
  - 根据输入的目标，执行相应的 'cmake --build .' 或 './[可执行文件]' 命令。
  - 捕获命令的退出状态码和所有标准输出/错误日志。
  - 将执行结果和日志格式化后输出。
