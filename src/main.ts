import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common'
import { TransformInterceptor } from './shared/interceptor/transform.interceptor'
import { LoggingInterceptor } from './shared/interceptor/logging.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các trường không được khai báo trong DTO
      forbidNonWhitelisted: true, // Nếu có field không được khai báo trong DTO thì sẽ báo lỗi
      transform: true, // Tự động chuyển đổi kiểu dữ liệu của các trường theo DTO
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (validationError) => {
        console.log(validationError)

        return new UnprocessableEntityException(
          validationError.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints as any).join(', '),
          })),
        )
      },
    }),
  )
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalInterceptors(new LoggingInterceptor())
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
