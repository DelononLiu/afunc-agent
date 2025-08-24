# 任务名称：AI圆桌会环境搭建

## 任务描述
搭建 Python venv + CrewAI + FastAPI 开发环境，跑通单个 Agent 调用，为后续的多 Agent 实现奠定基础。

## 任务交付件
- ai-round-env/：Python 虚拟环境目录
- main.py：FastAPI + CrewAI 服务主文件
- requirements.txt：项目依赖列表
- .env.example：环境变量配置示例
- 单个 Agent 调用测试成功

## 任务 TODO List
- [ ] 调用 `setup_python_venv` afunc，创建 Python 虚拟环境并安装依赖 (CrewAI, FastAPI, uvicorn, pydantic, openai)
- [ ] 调用 `implement_crewai_agents` afunc，实现单个 Agent 调用 CrewAI
- [ ] 调用 `run_openai_api` afunc，参数：`"你好，请简单介绍一下自己。"`，验证返回的 `content`

## 验证与反馈
### 人工审查意见 (可选)
- 状态：
- 详细描述：

### 自动化测试报告 (可选)
- 状态：
- 详细信息：

## Runtime Context
```json
{
  "env_setup_status": "",
  "dependencies_installed": false,
  "agent_test_result": "",
  "api_endpoint_test": ""
}
