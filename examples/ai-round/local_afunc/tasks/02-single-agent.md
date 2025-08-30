# 任务名称：AI圆桌会单 Agent 实现

## 任务描述
实现单个 Agent 调用 CrewAI，创建 FastAPI + CrewAI 服务主文件，并进行测试验证。

## 任务交付件
- ${PROJECT_ROOT_PATH}/agent.py：FastAPI + CrewAI 服务主文件
- ${PROJECT_ROOT_PATH}/tests/test_agent_service.py

## 任务 TODO List
- [ ] 调用 `implement-crewai-agents` AFUNC，输入：code_filepath=${PROJECT_ROOT_PATH}/agent.py collaboration_mode=single
- [ ] 调用 `generate-service-test-script` AFUNC，输入：service_file=${PROJECT_ROOT_PATH}/agent.py output_file=${PROJECT_ROOT_PATH}/tests/test_agent_service.py
- [ ] 调用 `test-agent-service` AFUNC，输入 test_script=${PROJECT_ROOT_PATH}/tests/test_agent_service.py


## 验证与反馈
### 自动化测试报告
- 测试状态：
- 测试状态：

## Runtime Context
PROJECT_ROOT_PATH=(替换为 项目根目录)
venv_path=${PROJECT_ROOT_PATH}/.venv/
agent_py_path=
multi_agent_logic=
test_py_path=
test_status=
test_output=
