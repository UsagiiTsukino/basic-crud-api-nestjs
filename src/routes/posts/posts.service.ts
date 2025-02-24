import { Injectable } from '@nestjs/common'

@Injectable()
export class PostsService {
  getPosts() {
    return 'All posts'
  }
  getPost(id: string) {
    return `Post ${id}`
  }
  createPost(body: any) {
    return body
  }
  updatePost(id: string, body: any) {
    return `Post ${id} updated, body ${body}`
  }
  deletePost(id: string) {
    return `Post ${id} deleted`
  }
}
