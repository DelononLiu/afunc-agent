#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI圆桌会单 Agent 实现
此文件实现了单个 CrewAI Agent，用于处理用户输入并生成响应。
"""

import os
import logging
import time
from typing import List, Dict, Any
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from crewai import Agent, Task, Crew
from dotenv import load_dotenv
import openai

# 加载环境变量
load_dotenv()

# 要加 openai 标识
model_name = "openai/" + os.getenv("OPENAI_MODEL_NAME", "glm-4.5-air")
# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FastAPI 应用
app = FastAPI(title="AI圆桌会单 Agent 实现", description="单个 CrewAI Agent 实现，用于处理用户输入并生成响应。")

# 定义数据模型
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

# 创建领域专家 Agent
domain_expert = Agent(
    role="领域专家",
    goal="提供特定领域的专业知识和见解",
    backstory="""你在特定领域有深厚的知识和经验，能够提供专业建议。
你能够分析用户的问题，并给出详细、准确的回答。""",
    verbose=True,
    allow_delegation=False,
    llm=model_name
)

@app.get("/health")
async def health_check():
    """健康检查端点"""
    return {"status": "ok"}

@app.post("/v1/chat/completions", response_model=ChatCompletionResponse)
async def chat_completions(request: ChatCompletionRequest):
    """
    处理聊天完成请求
    """
    try:
        # 获取用户最后一条消息
        user_message = request.messages[-1].content if request.messages else ""
        
        if not user_message:
            raise HTTPException(status_code=400, detail="用户消息不能为空")
        
        # 创建任务并使用 domain_expert Agent 执行
        task = Task(
            description=f"基于用户输入提供专业回答：{user_message}",
            expected_output="专业的领域知识和见解",
            agent=domain_expert
        )
        
        # 创建 Crew 并执行任务
        crew = Crew(
            agents=[domain_expert],
            tasks=[task],
            verbose=True
        )
        
        # 执行任务
        result = crew.kickoff()
        
        # 构造响应
        response = ChatCompletionResponse(
            id="domain-expert-response",
            object="chat.completion",
            created=int(time.time()),
            model=request.model,
            choices=[
                {
                    "index": 0,
                    "message": {
                        "role": "assistant",
                        "content": f"[领域专家]：{result}"
                    },
                    "finish_reason": "stop"
                }
            ],
            usage={
                "prompt_tokens": 0,  # 由于使用Agent，无法准确统计token使用
                "completion_tokens": 0,
                "total_tokens": 0
            }
        )
        
        return response
    except Exception as e:
        logger.error(f"处理请求时发生错误: {str(e)}")
        raise HTTPException(status_code=500, detail=f"内部服务器错误: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
