'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/registration`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name }),
      });
  
      const result = await res.json();
      console.log('registration result:', result);
      if (res.ok) {
        router.push('/');
      }
      
    } catch (e) {
      console.log('Registration error: ', e)
    }

  };

  return (
    <div className="container flex flex-col items-center gap-10 pt-20">
      <form onSubmit={handleSubmit} className="flex flex-col w-[400px] gap-6 p-6 shadow h-min">
        <h2 className="text-lg font-semibold">Registration</h2>
        <Input
          required
          placeholder="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit">Create user</Button>
      </form>
    </div>
  );
}
