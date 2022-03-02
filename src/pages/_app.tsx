import '../styles/globals.css'
import axios from 'axios'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import { appState } from '../store/appState'
import { IPost } from '../types/post-schema'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    ;(async () => {
      const posts = await axios.get<IPost[]>(
        'https://jsonplaceholder.typicode.com/posts'
      )
      appState.setPosts(posts.data)
    })()
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
