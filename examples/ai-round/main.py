#!/usr/bin/env python3
"""
AI Round Table - FastAPI + CrewAI 服务主文件
实现单个 Agent 调用 CrewAI
"""

import os
import logging
from typing import Dict, Any, List, Optional
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI

# 加载环境变量
load_dotenv()

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# 初始化 FastAPI 应用
app = FastAPI(
    title="AI Round Table API",
    description="基于 FastAPI 和 CrewAI 的智能对话服务",
    version="1.0.0"
)

# 请求模型
class ChatMessage(BaseModel):
    role: str = Field(..., description="消息角色", examples=["user", "assistant"])
    content: str = Field(..., description="消息内容")

class ChatCompletionRequest(BaseModel):
    messages: List[ChatMessage] = Field(..., description="对话消息列表")
    model: str = Field(default="gpt-3.5-turbo", description="使用的模型")
    temperature: float = Field(default=0.7, description="生成温度", ge=0.0, le=2.0)
    max_tokens: Optional[int] = Field(default=None, description="最大令牌数")

class ChatCompletionResponse(BaseModel):
    id: str = Field(..., description="响应ID")
    object: str = Field(..., description="对象类型")
    created: int = Field(..., description="创建时间戳")
    model: str = Field(..., description="使用的模型")
    choices: List[Dict[str, Any]] = Field(..., description="响应选项")
    usage: Optional[Dict[str, int]] = Field(None, description="令牌使用情况")

# 配置 OpenAI
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    logger.error("OPENAI_API_KEY 环境变量未设置")
    raise ValueError("请在 .env 文件中设置 OPENAI_API_KEY")

# 初始化 LLM
llm = ChatOpenAI(
    model="gpt-3.5-turbo",
    temperature=0.7,
    openai_api_key=openai_api_key
)

# 创建单个 Agent
def create_round_table_agent() -> Agent:
    """创建 AI 圆桌会 Agent"""
    return Agent(
        role='AI 圆桌会主持人',
        goal='提供智能、有帮助且信息丰富的回答，促进有意义的对话',
        backstory="""你是一位经验丰富的 AI 圆桌会主持人，擅长引导对话并提供深入见解。
        你能够理解复杂问题，提供清晰、简洁且信息丰富的回答。
        你始终保持专业、礼貌和乐于助人的态度，并尊重所有参与者。
        你的回答应该准确、客观，并在可能的情况下提供多个视角.""",
        verbose=True,
        allow_delegation=False,
        llm=llm
    )

# 创建任务
def create_chat_task(user_message: str) -> Task:
    """创建聊天任务"""
    return Task(
        description=f"回应用户的消息: {user_message}",
        expected_output="一个有帮助的、信息丰富的回答",
        agent=create_round_table_agent()
    )

# 处理聊天完成请求
@app.post("/v1/chat/completions", response_model=ChatCompletionResponse)
async def chat_completions(request: ChatCompletionRequest):
    """处理聊天完成请求"""
    try:
        # 获取最后一条用户消息
        user_message = None
        for message in reversed(request.messages):
            if message.role == "user":
                user_message = message.content
                break
        
        if not user_message:
            raise HTTPException(status_code=400, detail="未找到用户消息")
        
        logger.info(f"处理用户消息: {user_message}")
        
        # 创建任务和团队
        task = create_chat_task(user_message)
        crew = Crew(
            agents=[task.agent],
            tasks=[task],
            verbose=True,
            process=Process.sequential
        )
        
        # 执行任务
        result = crew.kickoff()
        
        # 构建响应
        response_id = f"chatcmpl-{os.urandom(4).hex()}"
        timestamp = int(os.times().elapsed)
        
        return ChatCompletionResponse(
            id=response_id,
            object="chat.completion",
            created=timestamp,
            model=request.model,
            choices=[
                {
                    "index": 0,
                    "message": {
                        "role": "assistant",
                        "content": str(result)
                    },
                    "finish_reason": "stop"
                }
            ],
            usage={
                "prompt_tokens": 0,  # 实际应用中应该计算
                "completion_tokens": 0,
                "total_tokens": 0
            }
        )
    
    except Exception as e:
        logger.error(f"处理聊天请求时出错: {str(e)}")
        raise HTTPException(status_code=500, detail=f"内部服务器错误: {str(e)}")

# 健康检查端点
@app.get("/health")
async def health_check():
    """健康检查端点"""
    return {"status": "healthy", "service": "AI Round Table API"}

# 根端点
@app.get("/")
async def root():
    """根端点"""
    return {
        "message": "欢迎使用 AI Round Table API",
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("DEBUG", "True").lower() == "true"
    )