import axios from 'axios'
import { ChatMessage } from '@/lib/types/chatTypes'

export const sendMessageToChatGPTAPI = async (messages: ChatMessage[], API_ENDPOINT: string, OPENAI_API_KEY: string) => {
  const apiMessages = messages.map((message) => ({
    role: message.sender === 'ChatGPT' ? 'assistant' : 'user',
    content: message.message,
  }))

  const apiRequestBody = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: apiMessages,
    max_tokens: 2048,
    temperature: 0.7,
  })

  const response = await axios.post(API_ENDPOINT, apiRequestBody, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
  })
  console.log(response.data)
  return response.data.choices?.[0]?.message?.content
}
