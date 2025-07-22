# 添加静态库
add_library(funcagent STATIC add.c)

# 设置库安装路径
install(TARGETS funcagent
        ARCHIVE DESTINATION lib)