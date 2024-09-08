// index.tsx
import ChatHeader from '@/components/ChatContainer/ChatHeader/ChatHeader'
import ChatList from '@/components/ChatContainer/MessageList/MessageList'
import MessageInputContainer from '@/components/ChatContainer/MessageInput/MessageInput'

const ChatContainerComponent: React.FC<{ onToggleFontSize: () => void; isLargeFont: boolean }> = ({ onToggleFontSize, isLargeFont }) => {
  return (
    <>
      <ChatHeader onToggleFontSize={onToggleFontSize} isLargeFont={isLargeFont} />
      <ChatList />
      <MessageInputContainer />
    </>
  )
}

export default ChatContainerComponent
