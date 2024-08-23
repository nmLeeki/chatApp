# 챗봇 프로토타입(kb 직원용 챗봇 대비용)

## **목차**

- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [설치 방법](#설치-방법)
- [폴더 구조](#폴더-구조)
- [사용법](#사용법)
- [기여 방법](#기여-방법)
- [라이선스](#라이선스)

## **주요 기능**

- **실시간 메시징**: **SockJS**와 **STOMP** 프로토콜을 사용한 실시간 메시지 전송.
- **API 통신**: **Axios**를 이용한 HTTP 요청 처리.
- **상태 관리**: **Recoil**을 사용해 전역 상태 관리.
- **비동기 데이터 처리**: **React Query**를 사용한 서버 상태 관리와 데이터 캐싱.
- **스타일링**: **Styled-components**와 **Chat UI Kit React**를 사용한 반응형 UI.
- **Vite**를 사용한 빠르고 효율적인 빌드 시스템.

## **기술 스택**

### **프론트엔드:**

- **React**: 사용자 인터페이스를 구축하는 라이브러리.
- **Recoil**: 전역 상태 관리 라이브러리.
- **React Query**: 비동기 데이터 페칭 및 상태 관리.
- **Styled-components**: React 컴포넌트를 위한 CSS-in-JS 라이브러리.
- **Chat UI Kit React**: 채팅 애플리케이션을 위한 UI 컴포넌트.
- **SockJS & STOMP**: WebSocket을 사용한 실시간 통신.
- **Axios**: Promise 기반 HTTP 클라이언트로 API 통신 처리.

### **빌드 도구:**

- **Vite**: 빠른 개발 서버와 빌드를 제공하는 차세대 빌드 도구.

## **설치 방법**

프로젝트를 시작하려면 다음 단계를 따라 주세요:

1. **레포지토리 클론:**

   ```bash
   git clone https://github.com/yourusername/chatbot-app.git
   ```

2. **프로젝트 디렉토리로 이동:**

   ```bash
   cd chatbot-app
   ```

3. **필수 패키지 설치:**

   ```bash
   npm install
   ```

4. **환경 변수 설정:**  
   프로젝트 루트 디렉토리에 `.env` 파일을 만들고 다음과 같은 환경 변수를 설정하세요:
   ```plaintext
   VITE_APP_OPEN_API_KEY=your_openai_api_key
   ```
5. **개발 서버 실행:**

   ```bash
   npm run dev
   ```

6. **프로덕션 빌드:**
   ```bash
   npm run build
   ```

## **폴더 구조**

프로젝트는 확장성과 유지보수성을 고려해 모듈화된 구조로 구성되어 있습니다. 아래는 폴더 구조에 대한 설명입니다:

```bash
src/
├── assets/               # 이미지, 아이콘 같은 정적 파일
├── components/           # 재사용 가능한 UI 컴포넌트
│   ├── ChatContainer.tsx
│   ├── ChatMessageList.tsx
│   ├── ChatSidebar.tsx
│   └── ChatInput.tsx
├── customHooks/          # 커스텀 훅
│   └── useChatGPT.ts
├── services/             # API 호출 및 서비스 관련 로직
│   └── chatAPI.ts
├── state/                # Recoil 상태 관리 atom/selector
│   └── chatState.ts
├── styles/               # 글로벌 스타일 및 테마 설정
│   ├── theme.ts          # 공통 테마 설정
│   └── global.css        # 전역 CSS
├── types/                # TypeScript 타입 및 인터페이스
│   └── chatTypes.ts
├── App.tsx               # 애플리케이션의 진입점
└── main.tsx              # Vite 진입점
```
