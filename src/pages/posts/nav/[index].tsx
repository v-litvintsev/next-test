import axios from 'axios'
import classNames from 'classnames'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'

import styles from '../../../styles/TestPagination.module.scss'
import { IPost } from '../../../types/post-schema'

const PostsNavPage: NextPage = ({
  posts,
  index,
  navPagesCount,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h1>Posts Nav Page</h1>
      {(posts as IPost[]).map(({ title, id }) => (
        <Link href={`/posts/${id}/`} key={id} passHref>
          <a>
            <hr />
            <h3>{title}</h3>
          </a>
        </Link>
      ))}
      <br />
      {[...new Array(navPagesCount)].map((_, inputLinkIndex) => {
        const linkIndex = inputLinkIndex + 1

        return (
          <Link href={`/posts/nav/${linkIndex}`} key={linkIndex}>
            <a
              className={classNames(
                styles.paginationLink,
                linkIndex === index && styles.paginationLink_active
              )}
            >
              {linkIndex}
            </a>
          </Link>
        )
      })}
    </>
  )
}

export default PostsNavPage

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await (
    await axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts/')
  ).data

  const navPagesCount = Math.ceil(posts.length / 10)

  return {
    paths: [...new Array(navPagesCount)].map((_, index) => ({
      params: { index: `${index + 1}` },
    })),
    fallback: false,
  }
}

interface IStaticPropsParams extends ParsedUrlQuery {
  index: string
}

export const getStaticProps: GetStaticProps<any, IStaticPropsParams> = async ({
  params,
}) => {
  const index = +(params?.index ?? '1') - 1

  const posts = await (
    await axios.get<IPost[]>(`https://jsonplaceholder.typicode.com/posts/`)
  ).data

  const navPagesCount = Math.ceil(posts.length / 10)

  return {
    props: {
      posts: posts.slice(10 * index, 10 * index + 10),
      index: index + 1,
      navPagesCount,
    },
  }
}
