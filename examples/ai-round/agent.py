"""
FastAPI + CrewAI 服务主文件
实现单个 Agent 调用 CrewAI
"""

import os
import logging
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from crewai import Agent, Task, Crew

# 加载 .env 文件
load_dotenv()

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 初始化 FastAPI 应用
app = FastAPI(title="AI Round - Single Agent API", description="单个 Agent 调用 CrewAI 的 API")

# 定义请求和响应模型
class Message(BaseModel):
    role: str
    content: str

class ChatCompletionRequest(BaseModel):
    messages: List[Message]
    model: str

class ChatCompletionResponse(BaseModel):
    id: str
    object: str
    created: int
    model: str
    choices: List[Dict[str, Any]]
    usage: Dict[str, int]

# 创建单个 Agent
def create_single_agent():
    """创建单个 Agent"""
    agent = Agent(
        role="AI Assistant",
        goal="Provide helpful and accurate responses to user queries",
        backstory="You are a helpful AI assistant designed to provide informative and engaging responses.",
        verbose=True,
        allow_delegation=False
    )
    return agent

# 创建任务
def create_task(agent: Agent, user_input: str):
    """为 Agent 创建任务"""
    task = Task(
        description=f"Respond to the user's query: {user_input}",
        agent=agent,
        expected_output="A helpful and accurate response to the user's query."
    )
    return task

# 处理用户请求并生成响应
def process_request(user_input: str):
    """处理用户请求并生成响应"""
    try:
        # 创建 Agent
        agent = create_single_agent()
        
        # 创建任务
        task = create_task(agent, user_input)
        
        # 创建 Crew 并执行任务
        crew = Crew(
            agents=[agent],
            tasks=[task],
            verbose=2
        )
        
        # 执行任务
        result = crew.kickoff()
        
        return result
    except Exception as e:
        logger.error(f"Error processing request: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# API 端点
@app.post("/v1/chat/completions", response_model=ChatCompletionResponse)
async def chat_completions(request: ChatCompletionRequest):
    """处理聊天完成请求"""
    logger.info(f"Received request: {request}")
    
    # 提取用户输入
    user_input = ""
    for message in request.messages:
        if message.role == "user":
            user_input = message.content
            break
    
    if not user_input:
        raise HTTPException(status_code=400, detail="No user message found in request")
    
    # 处理请求并生成响应
    response_content = process_request(user_input)
    
    # 构造 OpenAI 兼容的响应
    response = ChatCompletionResponse(
        id="chatcmpl-1234567890",
        object="chat.completion",
        created=1234567890,
        model=request.model,
        choices=[
            {
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": response_content
                },
                "finish_reason": "stop"
            }
        ],
        usage={
            "prompt_tokens": 0,
            "completion_tokens": 0,
            "total_tokens": 0
        }
    )
    
    logger.info(f"Sending response: {response}")
    return response

# 健康检查端点
@app.get("/health")
async def health_check():
    """健康检查端点"""
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
