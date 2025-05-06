'use client'
import { RootState, useAppSelector } from '@/store/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Header = () => {
  const pathname = usePathname();
  const user = useAppSelector((state: RootState) => state.user.user);
  console.log(user, 'user')
  if(!user) return <></>;

  return (
    <div className="flex justify-center items-center w-full border-b border-gray-200">
      <div className="container flex  justify-between items-center ">
        <div className=" text-sm flex gap-2 py-4">
          <Link href="/chat" className={pathname === '/chat' ? activeItem : item}>chats</Link>
          <Link href="/" className={pathname === '/' ? activeItem : item}>users</Link>
          <Link href="/blog" className={pathname === '/blog' ? activeItem : item}>blog</Link>
        </div>
        <div>{user.username}</div>
      </div>
    </div>
  );
}

export default Header;
const item = 'rounded  px-4 py-1 hover:bg-gray-50';
const activeItem = ' font-bold rounded px-4 py-1';