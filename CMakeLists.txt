cmake_minimum_required(VERSION 3.20)
project(funcagent LANGUAGES C)

# 设置编译选项
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Wall -Wextra")

# 包含头文件目录
include_directories(include)

# 添加子目录
add_subdirectory(src)
add_subdirectory(test)