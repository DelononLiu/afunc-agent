# AFunc 任务组织规范

## 概述

AFunc 项目采用分层、分域的任务组织方式。系统预定义任务按功能领域组织，便于管理和查找。

## 目录结构

```
afunc/                      # AFunc 核心目录
├── afuncs/                 # 系统预定义 AFunc
├── tasks/                  # 系统预定义任务 (按领域划分)
│   ├── core/               # 核心任务
│   ├── development/        # 开发相关任务
│   ├── documentation/      # 文档相关任务
│   └── ...                 # 其他领域任务
└── templates/              # 模板文件
```

## 任务分类

系统预定义任务按功能领域组织在 `afunc/tasks/` 目录下：

- `core/`: AFunc 核心功能任务，如项目初始化、基本操作等
- `development/`: AFunc 开发相关任务，如添加新 AFunc、功能开发等
- `documentation/`: 文档编写和维护任务
- `testing/`: 测试相关任务
- ...

## 任务命名规范

为了便于识别和管理，任务文件采用以下命名规范：
- 使用数字前缀进行排序，如 `00-`, `01-`, `02-` 等
- 使用连字符 `-` 分隔单词
- 文件名应简洁明了地描述任务内容
- 示例：`00-init-project.md`, `01-add-new-afunc.md`

## 使用建议

1. 在 AFunc 开发仓库中，系统任务应按功能领域组织在 `afunc/tasks/` 目录下
2. 当用户在自己的项目中使用 AFunc 时，应将自定义任务放在项目根目录的 `.afunc/tasks/` 中
3. 建议按业务领域或功能模块组织任务目录
4. 建议在任务的描述中明确标注任务的适用场景和领域

## 示例

### AFunc 系统任务示例
`afunc/tasks/core/00-init-project.md`
`afunc/tasks/development/01-add-new-afunc.md`
`afunc/tasks/documentation/00-update-readme.md`