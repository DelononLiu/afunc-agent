cmake_minimum_required(VERSION 3.20)
project(funcagent)

# 设置编译器标志
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Wall -Werror")

# 添加子目录
add_subdirectory(src)
add_subdirectory(test)