'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react';
import { IoAdd } from "react-icons/io5";

export interface Chat {
  id: string,
  title: string,
  created_at: string,
}

const Sidebar = ({chats}: {chats: Chat[]}) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1 py-6 px-1">
      <div className=''>
        <Button className='cursor-pointer '>
        <IoAdd />New Chat
        </Button>
      </div>
      {
        chats.map((chat) => (
          <Link 
            key={chat.id}
            href={`/chat/${chat.id}`} 
            className={pathname === `/chat/${chat.id}` ? activeItem : item} 
          >{chat.title}</Link>
        ))
      }
      </div>
  );
}

export default Sidebar;

const item = 'rounded px-8 py-4 hover:bg-gray-50';
const activeItem = 'bg-blue-100 rounded px-8 py-4';
