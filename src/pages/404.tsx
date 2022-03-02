import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const NotFoundPage: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/posts')
  }, [router])

  return null
}

export default NotFoundPage
