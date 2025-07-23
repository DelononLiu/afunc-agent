# 添加源文件
add_library(funcagent STATIC add.c)

# 包含头文件路径
target_include_directories(funcagent PUBLIC ${CMAKE_SOURCE_DIR}/include)