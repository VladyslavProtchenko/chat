import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type Post = {
  id: string;
  title: string;
  content: string;
  user: {
    username: string
  };
}
async function createPostAction(formData: FormData) {
  'use server'
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  const cookieStore = await cookies()
  const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user-info`, {
    headers: { cookie: cookieStore.toString(), },
  }).then(res => res.ok ? res.json() : null);

  if (!user) redirect('login');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify({ title, content, user_id: user.id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to create post');

  revalidatePath('/posts');
}
async function getPosts() {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`).then(res => res.json())
}

const Page = async () => {

  const posts = await getPosts()

  return (
    <div className='flex flex-1 justify-center'>
      <div className="container w-full">
          <form action={createPostAction} className='flex items-start w-full flex-col p-3 rounded  gap-2 max-w-[400px]' >
            <input name='title' placeholder='title' className='w-full px-4 py-1 border rounded'/>
            <textarea  name='content' placeholder=' tell me about something' className='w-full min-h-[60px] px-4 py-1 border rounded'/>
            <button className='bg-black px-4 rounded py-0 w-full font-bold text-white' type='submit'>Post</button>
          </form>
          <div className='flex flex-col w-full gap-4'>
            {posts.map((item:Post) => {
              <div key={item.id} className="flex w-full flex-col gap-3 py-8">
                <div className="text-4xl font-bold ">{item.title}</div>
                <div className="">{item.content}</div>
                <div className=''>{item.user.username}</div>
              </div>
            })}
          </div>
      </div>
    </div>
  );
}

export default Page;
