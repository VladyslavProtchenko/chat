'use client'
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Message from './message';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Chat, Message as MessageType } from '../../page';
import { socket } from '@/app/socket';

const ChatComponent = ({data}: {data: Chat}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user.user)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<MessageType[]>([]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(()=>{
    async function getChat(id: string) {
      return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats/${id}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => res.json()).then(res => setMessages(res.messages ?? []))
    }
    
    getChat(data.id)
  },[data.id])

  useEffect(() => {
    if(!socket || !user) return
    socket.emit('join-room', {
      username: user!.username,
      roomId: data.id
    })
    socket.on('user_joined', (message: unknown) => console.log(message,' -> data of joing'))
  
    const handleNewMessage = (message: MessageType) => {
      setMessages(prevMessages => [...prevMessages, message]);
    };
  
    socket.on('newMessage', handleNewMessage);
  
    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('user_joined');
    };
  }, []);


  const sendMessage = (messageText: string) => {
    if (!socket) return;
    socket.emit('sendMessage', {
      message: messageText,
      chat_id: data.id,
      user_id: user!.id,
    });
    setMessage('')
  };

  const reversedMessages = useMemo(() => {
    if (!messages) return [];
    return [...messages].map((item, index) => (
      <Message key={index} data={item} myMessage={item.user.username === user?.username} />
    ));
  }, [messages]);


  return (
    <div className='flex flex-col h-full p-6'>
      <div ref={scrollRef} className="scroll-hide pb-10 flex flex-1 flex-col rounded-lg p-6 gap-4 max-h-[550px] overflow-y-auto ">
        {reversedMessages}
      </div>
      {user 
        ? <div className="flex justify-end  items-center gap-6">
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here." />
          <Button onClick={() => sendMessage(message)}>Send</Button>
        </div> 
        : <div className='flex justify-center items-center'>
          Please Select User
        </div>
      }
    </div>
  );
}

export default ChatComponent;
