import axios from 'axios'
import { ChatMessage } from '@/types/chatTypes'

export const sendMessageToChatGPTAPI = async (messages: ChatMessage[], API_ENDPOINT: string, OPENAI_API_KEY: string) => {
  const apiMessages = messages.map((message) => ({
    role: message.sender === 'ChatGPT' ? 'assistant' : 'user',
    content: message.message,
  }))

  const apiRequestBody = {
    model: 'gpt-3.5-turbo',
    messages: apiMessages,
    max_tokens: 2048,
    temperature: 0.7,
  }

  try {
    const response = await axios.post(API_ENDPOINT, apiRequestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    })

    if (response.status !== 200) {
      throw new Error(`API 호출 실패: ${response.status} - ${response.statusText}`)
    }

    return response.data.choices?.[0]?.message?.content
  } catch (error) {
    console.error('ChatGPT API 호출 실패:', error)
    throw error
  }
}
