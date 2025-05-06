import React from 'react';
import Chat from './_components/chat';
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from 'next/link';
const getChat = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
  console.log('response fetch chat info: ', res)
  return res;
}
const Page = async ({ params }: {params: {id: string}}) => {
  const id =  params.id
  const chat = await getChat(id);

  return (
    <div className='container flex flex-col flex-1  mx-auto pt-6'>
      <Link href='/chat'>
        <FaArrowLeftLong className='size-5 text-gray-600 cursor-pointer' />
      </Link>

      <Chat data={chat} />
    </div>
  );
}

export default Page;
