import { useEffect, useRef } from 'react'
import SockJS from 'sockjs-client'
import Stomp, { Client } from 'stompjs'
import { useRecoilValue } from 'recoil'
import { userSessionState } from '@/recoil' // Recoil에서 사용하는 userSession 상태

const useWebSocket = () => {
  const topic = '/sub/hello' // 구독할 주제
  const stompClient = new Client() // Client 객체 생성
  const websocketClient = useRef<Client | null>(null)
  const userSession = useRecoilValue(userSessionState) // Recoil에서 사용자 정보 가져오기

  // WebSocket 연결 함수
  const onConnect = (fnOnMessage: any, _callBack: (arg0: boolean) => void) => {
    if (!websocketClient.current) {
      // Stomp client 설정
      websocketClient.current = Stomp.over(new SockJS('http://localhost:8091/ws'))

      // WebSocket 연결
      websocketClient.current.connect(
        {},
        (frame) => {
          console.log('Connected:', frame) // 연결 성공 시 콘솔 출력

          const userId = userSession?.userId
          if (userId) {
            websocketClient.current?.subscribe(`/chat/${userId}`, fnOnMessage)
          }

          if (_callBack) {
            _callBack(true) // 콜백 실행
          }
        },
        (error) => {
          console.error('Connection Error:', error) // 에러 상세 출력

          // 연결 실패 시 콜백 실행
          if (_callBack) _callBack(false)
        },
      )
    } else {
      if (_callBack) _callBack(true)
    }
  }

  // 메시지 전송 함수
  const sendMessage = (url: string, message: any) => {
    if (!websocketClient.current) {
      console.error('WebSocket 클라이언트가 연결되어 있지 않습니다.')
      return
    }

    // 메시지 전송
    websocketClient.current.send(
      `/topic${url}`, // 메시지 전송 경로
      {}, // 헤더
      JSON.stringify(message), // 메시지 본문
    )
  }

  // 구독 요청 함수
  const onSubscribe = (url: string, receptionFunction: Function) => {
    if (!websocketClient.current) {
      console.error('WebSocket 클라이언트가 연결되어 있지 않습니다.')
      return
    }

    // 구독 경로 설정
    websocketClient.current.subscribe(`/topic${url}`, (message) => {
      const receivedMessage = JSON.parse(message.body)
      receptionFunction(receivedMessage) // 수신된 메시지 처리
    })
  }

  // WebSocket 연결 해제 함수
  const disconnect = () => {
    if (websocketClient.current) {
      websocketClient.current.disconnect(() => {
        console.log('Disconnected')
        websocketClient.current = null // 연결 해제 후 클라이언트 상태 초기화
      })
    } else {
      console.log('WebSocket이 이미 해제되었습니다.')
    }
  }

  return { onConnect, sendMessage, onSubscribe, disconnect }
}

export default useWebSocket
