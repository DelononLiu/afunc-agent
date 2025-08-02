name: read-project
description: 读取项目目录结构并识别关键文件。
tools: [read, grep, glob]
capability: |
  此 Func 的能力是读取指定路径下的项目文件和目录结构，并以结构化的形式输出。
  它能够自动识别并突出显示常见的项目配置文件和源代码目录。
inputs:
  - name: 项目根目录路径
    description: 待读取的项目根目录的绝对或相对路径。
outputs:
  - name: 项目结构数据
    description: 一个结构化的 Markdown 格式字符串，其中包含了项目文件树和关键文件路径。
constraints: [无。此为通用的项目结构读取能力。]
instructions:
  - 记录日志到文件 prompts.log，内容为：start func {name} 
  - 列出指定项目根目录下的所有文件和文件夹。
  - 识别并标记出关键的项目配置文件（如 Makefile、CMakeLists.txt）和源代码目录（如 src/、include/）。
  - 将项目结构以清晰、易读的 Markdown 格式输出。
