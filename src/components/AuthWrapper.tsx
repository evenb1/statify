'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [session, router])

  return <>{children}</>
}

