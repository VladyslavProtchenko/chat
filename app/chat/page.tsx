import React from 'react';
import Link from 'next/link';
import ChatForm from './ChatForm';
export type Chat = {
  id: string,
  title: string,
  createdAt: string,
  updatedAt: string,
  messages: Message[]
}
export type Message = {
  id: string,
  message: string,
  createdAt: string,
  user: {
    username: string
  };
  chat: {
    id: string
  }
}

const getChats = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())  
  console.log('response fetch chats: ', res)
  return res
}

const Page = async () => {
  const chats: Chat[] = await getChats()
  return (
    <div className='container mx-auto grid grid-cols-5 w-full '>

      <div className='col-span-1 flex flex-col gap-2 px-4'>
        <div className="py-4 text-lg font-bold">Rooms</div>
        {chats.map(item => (
          <Link className='cursor-pointer px-6 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 hover:opacity-100 opacity-50' key={item.id} href={`/chat/${item.id}`}>
            {item.title}
          </Link>
        ))}
      </div>

        <ChatForm />


    </div>
  );
}

export default Page;
