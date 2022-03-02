import { makeAutoObservable } from 'mobx'

import { IPost } from '../types/post-schema'

class AppState {
  posts: IPost[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setPosts(posts: IPost[]) {
    this.posts = posts
  }
}

export const appState = new AppState()
