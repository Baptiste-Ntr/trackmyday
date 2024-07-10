'use client'

import { createClient } from '@/utils/supabase/client';
import { isSessionLogin } from '@/utils/supabase/session';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function Page() {

  const [isLogin, setIsLogin] = useState<boolean | undefined>(false)

  const router = useRouter();

  const signOut = async () => {
    try {
      const fetchSignout = await fetch('/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (fetchSignout.status === 200) {
        router.push('/login')
      }

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const checkLogin = async () => {
      const login = await isSessionLogin()
      setIsLogin(login)
    }
    checkLogin()

  })

  return (
    !isLogin ? (
      <>
        <input type='button' value={'login'} onClick={() => router.push('/login')} />
        <input type='button' value={'register'} onClick={() => router.push('/register')} />
      </>
    ) : (
      <input type='button' value={'logout'} onClick={() => signOut()} />
    )
  )
}
