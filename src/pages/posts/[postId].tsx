import axios from 'axios'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

import { IPost } from '../../types/post-schema'

const PostPage: NextPage = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { body, title } = post as IPost
  const router = useRouter()

  return (
    <>
      <a onClick={() => router.back()}>back</a>
      <h1>{title}</h1>
      <p>{body}</p>
    </>
  )
}

export default PostPage

interface IStaticPropsParams extends ParsedUrlQuery {
  postId: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await (
    await axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts/')
  ).data

  return {
    paths: posts.map(({ id }) => ({ params: { postId: `${id}` } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<any, IStaticPropsParams> = async ({
  params,
}) => {
  const postId = params?.postId ?? '1'
  const post = await (
    await axios.get<IPost>(
      `https://jsonplaceholder.typicode.com/posts/${postId}/`
    )
  ).data

  return {
    props: { post },
  }
}
