#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI圆桌会多 Agent 实现
此文件实现了多个 CrewAI Agent，用于处理用户输入并生成多角色响应。
"""

import os
import logging
import time
from typing import List, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from crewai import Agent, Task, Crew, Process
from dotenv import load_dotenv
import openai

# 加载环境变量
load_dotenv()

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FastAPI 应用
app = FastAPI(title="AI圆桌会多 Agent 实现", description="多个 CrewAI Agent 实现，用于处理用户输入并生成多角色响应。")

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

# 初始化 OpenAI 客户端
openai.api_key = os.getenv("OPENAI_API_KEY")
openai.base_url = os.getenv("OPENAI_API_BASE")

# 要加 openai 标识
model_name = "openai/" + os.getenv("OPENAI_MODEL_NAME", "glm-4.5-air")

# 创建领域专家 Agent
domain_expert = Agent(
    role="领域专家1",
    goal="提供特定领域的专业知识和见解",
    backstory="""你在特定领域有深厚的知识和经验，能够提供专业建议。
你能够分析用户的问题，并给出详细、准确的回答。""",
    verbose=True,
    allow_delegation=False,
    llm=model_name
)

# 创建创意思考者 Agent
creative_thinker = Agent(
    role="领域专家2",
    goal="提供特定领域的专业知识和见解",
    backstory="""你在特定领域有深厚的知识和经验，能够提供专业建议。
你能够分析用户的问题，并给出详细、准确的回答。""",
    verbose=True,
    allow_delegation=False,
    llm=model_name
)

# 创建批判性思考者 Agent
critical_thinker = Agent(
    role="领域专家3",
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
    处理聊天完成请求，使用多个 Agent 依次发言
    """
    try:
        # 获取用户最后一条消息
        user_message = request.messages[-1].content if request.messages else ""
        
        if not user_message:
            raise HTTPException(status_code=400, detail="用户消息不能为空")
        
        # 为每个 Agent 创建独立的任务
        tasks = [
            Task(
                description=f"请基于以下用户输入进行回答：{user_message}",
                expected_output="你的专业回答",
                agent=domain_expert
            ),
            Task(
                description=f"请基于以下用户输入提供创新的想法：{user_message}",
                expected_output="你的创新想法",
                agent=creative_thinker
            ),
            Task(
                description=f"请基于以下用户输入进行批判性分析：{user_message}",
                expected_output="你的批判性分析",
                agent=critical_thinker
            )
        ]
        
        # 创建 Crew，使用 sequential 流程让 Agent 们依次执行任务
        crew = Crew(
            agents=[domain_expert, creative_thinker, critical_thinker],
            tasks=tasks,
            process=Process.sequential,  # 顺序执行
            verbose=True
        )
        
        # 执行任务
        try:
            results = crew.kickoff()
        except Exception as e:
            logger.error(f"Crew kickoff 失败: {str(e)}")
            raise
        
        # 收集所有 Agent 的回复
        responses = []
        agent_names = ["领域专家", "创意思考者", "批判性思考者"]
        if isinstance(results, list) and len(results) == 3:
            for i, result in enumerate(results):
                responses.append(f"[{agent_names[i]}]：{result}")
        else:
            # 如果结果不是预期的列表格式，使用原始结果
            responses.append(f"[领域专家]：{results}")
        
        final_response = "\n".join(responses)
        
        # 构造响应
        response = ChatCompletionResponse(
            id="multi-agent-response",
            object="chat.completion",
            created=int(time.time()),
            model=request.model,
            choices=[
                {
                    "index": 0,
                    "message": {
                        "role": "assistant",
                        "content": final_response
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
        
        return response
    except Exception as e:
        logger.error(f"处理请求时发生错误: {str(e)}")
        raise HTTPException(status_code=500, detail=f"内部服务器错误: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
