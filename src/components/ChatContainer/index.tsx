import ChatHeader from '@/components/ChatContainer/ChatHeader/ChatHeader'
import ChatList from '@/components/ChatContainer/MessageList/MessageList'
import MessageInputContainer from '@/components/ChatContainer/MessageInput/MessageInput'

const ChatContainerComponent: React.FC = () => {
  return (
    <>
      <ChatHeader />
      <ChatList />
      <MessageInputContainer />
    </>
  )
}

export default ChatContainerComponent
