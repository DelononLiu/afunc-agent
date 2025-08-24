# **🎯 AI Round（AI 圆桌会）MVP 技术方案（2天工时）**

**目标**：用户在 Open WebUI 输入话题 → 后端启动 CrewAI 多 Agent 讨论 → 返回结构化对话流 → Open WebUI 显示为"多位专家轮流发言"

## **✅ 一、整体架构设计**

\+------------------+       \+---------------------+  
|   Open WebUI     | \<-\> | 自定义后端 (FastAPI) |  
\+------------------+       \+----------+----------+  
                                     |  
                                     v  
                             \+-------+--------+  
                             |   CrewAI Agent   |  
                             | (qwen3-coder/glm-4.5) |  
                             \+-------+--------+  
                                     |  
                                     v  
                             \+-------+--------+  
                             |   OpenAI API    |  
                             | (第三方兼容服务) |  
                             \+----------------+

* **Open WebUI**：仅作为前端展示层（不做复杂前端开发）  
* **自定义后端**：替代 Open WebUI 默认后端，处理 /chat/completions 请求  
* **CrewAI**：驱动多 Agent 轮流发言  
* **OpenAI API**：提供模型推理服务（第三方兼容服务，支持 qwen3-coder、glm-4.5 等模型）

## **✅ 二、MVP 功能范围（2天工时）**

| 功能 | 是否实现 | 说明 |
| :---- | :---- | :---- |
| 用户输入话题 | ✅ | 在 Open WebUI 输入框输入 |
| 触发多 Agent 讨论 | ✅ | 3个 Agent 轮流发言 1 轮 |
| 每个 Agent 用不同模型 | ✅ | 通过 OpenAI API 指定不同模型（qwen3-coder/glm-4.5） |
| 显示带角色名的发言 | ✅ | \[领域专家\]：... 格式 |
| Open WebUI 前端不修改 | ✅ | 仅替换后端 API |
| 支持流式输出（可选） | ❌（MVP 不做） | 先做整段返回 |

## **✅ 三、技术栈**

| 组件 | 技术 |
| :---- | :---- |
| 前端 | Open WebUI（现成系统，**不修改代码**） |
| 后端 | FastAPI \+ CrewAI |
| Agent 框架 | CrewAI |
| 模型服务 | OpenAI API（第三方兼容服务） |
| 部署方式 | Python venv（虚拟环境） |

## **✅ 四、Open WebUI 的改动说明（重点！）**

⚠️ **结论：不需要修改 Open WebUI 前端代码！**

### **1\. Open WebUI 如何与后端通信？**

Open WebUI 通过标准 OpenAI-like API 调用后端：

POST /chat/completions  
{  
  "model": "qwen3-coder",  
  "messages": \[  
    {"role": "user", "content": "AI 会取代人类吗？"}  
  \]  
}

只要你的后端返回兼容格式，Open WebUI 就能正常显示。

### **2\. 我们如何"欺骗" Open WebUI？**

我们让后端返回一个 **看起来像单次 completion，但内容是多 Agent 对话** 的响应。

#### **示例返回（标准 OpenAI 格式）：**

{  
  "id": "chat-123",  
  "object": "chat.completion",  
  "created": 1712345678,  
  "model": "roundtable-v1",  
  "choices": \[  
    {  
      "index": 0,  
      "message": {  
        "role": "assistant",  
        "content": "\[领域专家\]：AI 是工具，不会取代人类意志……\\n\\n\[创意思考者\]：但从技术角度看，自动化已取代初级岗位……\\n\\n\[批判性思考者\]：未来就业结构将重塑……"
      },  
      "finish\_reason": "stop"  
    }  
  \]  
}

✅ Open WebUI 会正常显示这段文本，**无需任何前端修改**！

### **3\. 如何让 Open WebUI 调用我们的后端？**

Open WebUI 已部署为现成系统，无需修改代码。只需在 Open WebUI 的配置中，**将大模型接入指向我们的 FastAPI 服务**。

#### **方法：配置 Open WebUI 的大模型接入**

在 Open WebUI 的设置或配置界面：
- 设置 API Base URL 为：`http://your-fastapi-service:8000`
- 配置 API Key（如果需要）

⚠️ 注意：Open WebUI 会通过这个配置调用 /chat/completions 接口，所以可以指向任何兼容 OpenAI API 的服务。

## **✅ 五、CrewAI 后端实现（核心逻辑）**

### **1\. 安装依赖**

pip install crewai fastapi uvicorn pydantic openai

注意：使用 openai 客户端调用 OpenAI API 或兼容服务。

### **2\. main.py：FastAPI \+ CrewAI 服务**

\# main.py  
from fastapi import FastAPI, HTTPException  
from pydantic import BaseModel  
from crewai import Agent, Task, Crew, Process \# Process is explicitly imported here  
import os

app \= FastAPI()

\# 配置 OpenAI API  
os.environ\["OPENAI\_API\_BASE"\] \= "https://api.openai.com/v1"  # 或第三方兼容服务地址  
os.environ\["OPENAI\_API\_KEY"\] \= "your-openai-api-key"  # 替换为实际的 API Key

class ChatRequest(BaseModel):  
    messages: list

def create\_roundtable\_crew(topic: str):  
    domain_expert \= Agent(  
        role="领域专家",  
        goal="提供专业领域的知识和见解",  
        backstory="你拥有深厚的专业知识和经验，能够从专业角度提供深入的见解和分析。",  
        llm="openai/qwen3-coder",  
        verbose=True  
    )
    creative_thinker \= Agent(  
        role="创意思考者",  
        goal="提供创新思路和跳出常规的思维",  
        backstory="你擅长创新思维，能够提供突破常规的想法和解决方案，挑战传统思维模式。",  
        llm="openai/glm-4.5",  
        verbose=True  
    )
    critical_thinker \= Agent(  
        role="批判性思考者",  
        goal="质疑假设，发现潜在问题，提供不同视角",  
        backstory="你具备批判性思维能力，能够从不同角度审视问题，发现潜在风险和改进空间。",  
        llm="openai/qwen3-coder",  
        verbose=True  
    )

    task1 \= Task(description=f"讨论话题：{topic}，你是领域专家，请先发言。", agent=domain_expert)
    task2 \= Task(description=f"讨论话题：{topic}，你是创意思考者，请回应。", agent=creative_thinker)
    task3 \= Task(description=f"讨论话题：{topic}，你是批判性思考者，请总结。", agent=critical_thinker)

    return Crew(  
        agents=[domain_expert, creative_thinker, critical_thinker],  
        tasks=[task1, task2, task3],  
        process=Process.sequential,  
        verbose=2  
    )

@app.post("/chat/completions")  
async def chat\_completions(request: ChatRequest):  
    try:  
        \# 提取用户最后一条消息作为话题  
        user\_message \= request.messages\[-1\]\["content"\]

        \# 创建圆桌讨论  
        crew \= create\_roundtable\_crew(user\_message)  
        result \= crew.kickoff()

        \# 构造 OpenAI 兼容响应  
        return {  
            "id": "roundtable-1",  
            "object": "chat.completion",  
            "created": 1712345678,  
            "model": "roundtable-v1",  
            "choices": \[  
                {  
                    "index": 0,  
                    "message": {  
                        "role": "assistant",  
                        "content": str(result)  
                    },  
                    "finish\_reason": "stop"  
                }  
            \]  
        }  
    except Exception as e:  
        raise HTTPException(status\_code=500, detail=str(e))

## **✅ 六、Python venv 部署方式**

### **1. 创建虚拟环境**

```bash
# 创建虚拟环境
python -m venv ai-round-env

# 激活虚拟环境
# Linux/Mac:
source ai-round-env/bin/activate
# Windows:
ai-round-env\Scripts\activate
```

### **2. 安装依赖**

```bash
# 安装所需依赖
pip install crewai fastapi uvicorn pydantic openai
```

### **3. 配置环境变量**

创建 `.env` 文件：

```bash
# .env 文件内容
OPENAI_API_BASE=https://api.openai.com/v1  # 或第三方兼容服务地址
OPENAI_API_KEY=your-openai-api-key        # 替换为实际的 API Key
```

### **4. 运行服务**

```bash
# 启动 FastAPI 服务
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### **5. 配置 Open WebUI**

Open WebUI 已部署为现成系统，只需在配置中：
- 设置 API Base URL 为：`http://your-fastapi-service:8000`
- 配置相应的 API Key

✅ 配置完成后，访问 Open WebUI，输入话题，就能看到三位专家"讨论"。

## **✅ 七、MVP 开发计划（2天）**

| 时间 | 任务 |
| :---- | :---- |
| **Day 1 上午** | 搭建环境：Python venv \+ CrewAI \+ FastAPI，跑通单个 Agent 调用 |
| **Day 1 下午** | 实现多 Agent 轮流发言，测试返回格式 |
| **Day 2 上午** | 封装为 /chat/completions API，返回 OpenAI 格式 |
| **Day 2 下午** | 集成 Open WebUI，测试端到端流程，输出文档 |

## **✅ 八、后续优化方向（MVP 之后）**

| 功能 | 说明 |
| :---- | :---- |
| 流式输出 | 使用 CrewAI 的 step\_callback 实时推送 |
| 角色头像 | 修改 Open WebUI 前端，解析 \[角色\] 加图标（需改前端） |
| 主持人机制 | 加一个 Agent 控制讨论节奏 |
| 话题拆解 | 先让一个 Agent 拆解问题，再分给其他人 |
| 保存历史 | 存储每次"圆桌会议"记录 |

## **✅ 九、交付物（MVP 完成后）**

1. main.py（FastAPI \+ CrewAI 服务）  
2. requirements.txt（依赖列表）  
3. .env.example（环境变量配置示例）  
4. 部署文档（含如何启动、如何测试）  
5. 截图：Open WebUI 显示多 Agent 讨论

## **🚀 总结**

* **不需要修改 Open WebUI 前端代码**，只需替换后端。  
* **CrewAI 是 MVP 最佳选择**：简单、灵活、支持 OpenAI API。  
* **核心技巧**：返回 \[角色\]: 内容 格式的文本，Open WebUI 自动显示。  
* **2天完全可交付**。

🎯 **一句话收尾**：  

"小灵助理，从双击 Shift 开始。"
