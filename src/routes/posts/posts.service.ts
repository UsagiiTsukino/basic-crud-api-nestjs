/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common'
import envConfig from 'src/shared/config'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  getPosts() {
    console.log(envConfig.ACCESS_TOKEN_SECRET)

    return this.prismaService.post.findMany()
  }
  getPost(id: string) {
    return `Post ${id}`
  }
  createPost(body: any) {
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: 1,
      },
    })
  }
  updatePost(id: string, body: any) {
    return `Post ${id} updated, body ${body}`
  }
  deletePost(id: string) {
    return `Post ${id} deleted`
  }
}
