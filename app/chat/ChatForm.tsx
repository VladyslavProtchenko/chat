'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ChatForm = () => {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    }).then((res) => res.json());

    console.log('response create chat chat: ', res)

    if (res.id) {
      router.push(`/chat/${res.id}`);
    } else {
      alert('Ошибка создания чата');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="col-span-4 flex gap-4 flex-col items-start px-10">
      <div className="py-4 text-lg font-bold">Enter room</div>
      <Input
        name="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Button type="submit">Create or join chat</Button>
    </form>
  );
};

export default ChatForm;
