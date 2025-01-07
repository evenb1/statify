import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Dashboard from '@/components/Dashboard'

export default function DashboardPage() {
  return <Dashboard />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

