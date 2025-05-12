'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [error, setError] = useState(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name }),
      });
      console.log('login results: ', res)
  
      const result = await res.json();
      if (result.statusCode === 404) {
        setError(result.message)
        router.push('/registration');
        return;
      }
      if (res.ok) {
        setName('')
        console.log('must work redirect here')
        return router.push('/');
      }
      console.log('nothing to happens')
    } catch(e) {
      console.log('Login error: ', e)
    }
  };

  return (
    <div className="container flex flex-col items-center gap-10 pt-20">
      <form onSubmit={handleSubmit} className="flex flex-col w-[400px]  p-6 shadow h-min">
        <h2 className="text-lg font-semibold mb-6">Login</h2>
        <Input
          required
          placeholder="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error ?? <div className='text-xs mt-1 mb-6 text-red-500'>{error}</div>}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
