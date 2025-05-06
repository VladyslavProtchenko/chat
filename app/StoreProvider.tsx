'use client'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/store/store'
import { setUser } from '@/store/userSlice'

export default function StoreProvider({
  children,
  user
}: {
  children: React.ReactNode,
  user: { username: string, id: string } | null;
}) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  useEffect(() => {
    if (user) {
      storeRef.current?.dispatch(setUser({id: user.id, username: user.username}));
    }
  }, [user]); 

  return <Provider store={storeRef.current}>{children}</Provider>
}