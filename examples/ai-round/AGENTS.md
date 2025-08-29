# ai-round 项目概况

## 项目概述 (Project Overview)

**项目名称**：AI Round（AI 圆桌会）

**项目目标**：实现用户在 Open WebUI 输入话题 → 后端启动 CrewAI 多 Agent 讨论 → 返回结构化对话流 → Open WebUI 显示为"多位专家轮流发言"。

**核心功能**：
- 用户输入话题触发多 Agent 讨论
- 3个 Agent（领域专家、创意思考者、批判性思考者）轮流发言
- 每个 Agent 使用不同模型（qwen3-coder、glm-4.5等）
- 返回带角色名的结构化对话流
- 兼容 OpenAI API 格式，无需修改 Open WebUI 前端

**MVP 范围**：2天工时完成基础功能，包括环境搭建、单 Agent 实现、多 Agent 轮流发言、API 封装和 Open WebUI 集成。

**技术栈**：FastAPI + CrewAI + OpenAI API + Python venv

## 技术架构 (Architecture Overview)

### 整体架构
```
+------------------+       +---------------------+
|   Open WebUI     | <---> | 自定义后端 (FastAPI) |
+------------------+       +----------+----------+
                                     |
                                     v
                             +-------+--------+
                             |   CrewAI Agent   |
                             | (多角色讨论系统)  |
                             +-------+--------+
                                     |
                                     v
                             +-------+--------+
                             |   OpenAI API    |
                             | (第三方兼容服务) |
                             +----------------+
```

### 组件说明
- **Open WebUI**：前端展示层，负责用户交互和对话显示，无需修改代码
- **FastAPI 后端**：替代 Open WebUI 默认后端，处理 /chat/completions 请求
- **CrewAI Agent**：驱动多 Agent 轮流发言，支持不同角色和模型配置
- **OpenAI API**：提供模型推理服务，支持 qwen3-coder、glm-4.5 等第三方兼容服务

### 数据流向
1. 用户在 Open WebUI 输入话题
2. Open WebUI 发送 POST 请求到 FastAPI 后端的 /chat/completions 端点
3. FastAPI 解析请求，提取用户输入的话题
4. 创建 CrewAI 多 Agent 团队，配置不同角色和模型
5. Agent 们按顺序轮流发言，生成讨论内容
6. 将多 Agent 讨论结果封装为 OpenAI 兼容格式的响应
7. Open WebUI 接收响应并显示为"多位专家轮流发言"

### 核心技术要点
- **API 兼容性**：后端返回标准 OpenAI 格式，确保 Open WebUI 正常显示
- **Agent 协作**：使用 CrewAI 的 Process.sequential 实现顺序发言
- **模型配置**：通过 LLM 参数为不同 Agent 指定不同模型
- **响应格式**：返回 `[角色名]：发言内容` 格式的文本

## 开发指南 (Development Guide)

### 开发环境（Development Environment）

#### 环境要求
- Python 3.9+
- 虚拟环境（推荐使用 venv）
- 有效的 OpenAI API 密钥或第三方兼容服务

#### 开发环境
- 虚拟环境目录： {PROJECT_ROOT_PATH}/.venv/
- 依赖： requirements.txt
- 环境变量： {PROJECT_ROOT_PATH}/.env


#### 项目结构
```
ai-round/
├── main.py                 # FastAPI + CrewAI 服务主文件
├── requirements.txt        # 依赖列表
├── .env                   # 环境变量配置
├── AGENTS.md             # AI 项目概况文档
├── AI圆桌会MVP技术方案.md # 技术方案文档
├── afunc/                # AFunc 框架目录
│   ├── afuncs/          # AFunc 定义文件
│   └── templates/       # 模板文件
└── local_afunc/         # 本地 AFunc 任务
    └── tasks/           # 任务定义文件
```

### 开发命令 (Development Commands)

#### 开发服务器启动
```bash
# 启动 FastAPI 开发服务器
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# 或使用 Python 直接运行
python main.py
```

#### API 文档访问
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

#### 测试命令
```bash
# 健康检查
curl http://localhost:8000/health

# 测试聊天接口
curl -X POST "http://localhost:8000/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "你好，请介绍一下自己"}],
    "model": "gpt-3.5-turbo"
  }'
```

#### 调试命令
```bash
# 启用详细日志
export DEBUG=True
uvicorn main:app --reload --log-level debug

# 查看依赖版本
pip list
```

### 运行与部署 (Running & Deployment)

#### 本地运行
1. 确保虚拟环境已激活
2. 环境变量已正确配置
3. 启动服务：`uvicorn main:app --host 0.0.0.0 --port 8000`
4. 访问 http://localhost:8000/health 确认服务正常

#### 生产部署
1. **使用 Gunicorn + Uvicorn**
   ```bash
   pip install gunicorn
   gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
   ```

2. **使用 Docker**
   ```dockerfile
   FROM python:3.9-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
   ```

3. **环境变量管理**
   - 生产环境使用环境变量或配置管理工具
   - 确保 OPENAI_API_KEY 安全存储
   - 设置 DEBUG=False

#### Open WebUI 集成
1. 在 Open WebUI 配置界面设置：
   - API Base URL: `http://your-fastapi-service:8000`
   - API Key: 相应的 API 密钥（如果需要）

2. 测试集成：
   - 在 Open WebUI 输入话题
   - 观察是否返回多 Agent 讨论结果
   - 确认格式显示正确

#### 监控与日志
- 使用 FastAPI 的内置日志系统
- 可集成 Prometheus 进行监控
- 建议设置日志轮转和错误报警

## 代码规范 (Code Standards)

### Python 代码风格
- **PEP 8 规范**：严格遵循 Python 官方代码风格指南
- **缩进**：使用 4 个空格，不使用制表符
- **行长度**：每行不超过 79 个字符，注释不超过 72 个字符
- **空行**：函数间使用 2 个空行，类间使用 2 个空行
- **导入**：标准库、第三方库、本地模块分三组，每组间空一行

### 注释规范
- **模块文档字符串**：每个模块必须有文档字符串，说明模块用途
- **类文档字符串**：描述类的用途和主要功能
- **函数文档字符串**：包含参数说明、返回值说明、异常说明
- **行内注释**：解释复杂的业务逻辑，避免显而易见的注释

### 命名规范
- **函数名**：使用 snake_case，动词开头，如 `create_agent()`
- **类名**：使用 PascalCase，如 `ChatCompletionRequest`
- **变量名**：使用 snake_case，具有描述性，如 `user_message`
- **常量**：使用大写 SNAKE_CASE，如 `OPENAI_API_KEY`
- **私有成员**：使用下划线前缀，如 `_private_method`

### 错误处理
- **异常处理**：使用 try-except 块，捕获特定异常
- **错误消息**：提供清晰的错误信息，便于调试
- **日志记录**：使用 logging 模块记录错误和重要事件
- **HTTP 错误**：使用 FastAPI 的 HTTPException 返回适当的 HTTP 状态码

### API 设计规范
- **RESTful 设计**：遵循 REST 架构风格
- **JSON 格式**：请求和响应使用 JSON 格式
- **状态码**：使用正确的 HTTP 状态码
- **版本控制**：API 路径包含版本号，如 `/v1/chat/completions`
- **数据验证**：使用 Pydantic 模型进行请求和响应验证

### 测试规范
- **单元测试**：每个函数和类都应有对应的单元测试
- **测试覆盖率**：保持高测试覆盖率
- **测试命名**：使用描述性的测试名称，如 `test_agent_creation()`
- **Mock 对象**：适当使用 mock 对象隔离外部依赖

### 文档规范
- **代码文档**：保持代码文档的及时更新
- **API 文档**：使用 FastAPI 自动生成的 Swagger 文档
- **README 文件**：项目根目录包含详细的 README
- **变更日志**：维护 CHANGELOG.md 记录版本变更

## 项目状态 (Project Status)

### 当前实现状态
**开发阶段**：MVP 开发中，已完成基础框架搭建，正在实现多 Agent 功能

**当前版本**：v1.0.0（开发中）

**最后更新**：2025年8月27日

### 功能特性（Features）
- [ ] **环境搭建**：Python venv + CrewAI + FastAPI 环境配置完成
- [ ] **依赖管理**：requirements.txt 和 .env 配置完成
- [ ] **基础框架**：FastAPI 服务框架搭建完成
- [ ] **单 Agent 实现**：单个 Agent 调用 CrewAI 功能已完成
- [ ] **API 端点**：/v1/chat/completions 端点已实现
- [ ] **OpenAI 集成**：OpenAI API 客户端集成完成
- [ ] **响应格式**：基本 OpenAI 兼容响应格式实现
- [ ] **错误处理**：基础错误处理和日志记录
- [ ] **健康检查**：/health 端点实现
- [ ] **多 Agent 轮流发言**：3个 Agent（领域专家、创意思考者、批判性思考者）按顺序发言
- [ ] **不同模型支持**：为不同 Agent 配置不同模型（qwen3-coder、glm-4.5）
- [ ] **角色标识**：返回格式中包含角色名标识 `[角色名]：发言内容`
- [ ] **任务协作**：CrewAI Task 协作流程优化
- [ ] **流式输出**：可选的流式响应功能（MVP 后续优化）
- [ ] **性能优化**：响应时间和资源使用优化
- [ ] **测试覆盖**：完整的单元测试和集成测试
- [ ] **文档完善**：API 文档和部署文档完善

### 技术债务
- 需要改进错误处理的详细程度
- API 响应格式的 token 使用统计需要完善
- 日志系统需要更详细的配置
- 配置管理可以更加灵活

### 已知问题
- 当前只支持单个 Agent，多 Agent 功能正在开发中
- 响应格式需要进一步优化以支持多角色显示
- 某些边缘情况的错误处理需要完善
- 性能测试尚未进行

### 里程碑计划
- **MVP v1.0**：基础多 Agent 功能（2周内）
- **v1.1**：流式输出和性能优化（1个月后）
- **v1.2**：完整测试覆盖和文档完善（2个月后）
- **v2.0**：高级功能和扩展（3个月后）
