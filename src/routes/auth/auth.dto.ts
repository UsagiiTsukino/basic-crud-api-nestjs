import { Exclude } from 'class-transformer'
import { IsString } from 'class-validator'

export class LoginBodyDTO {
  @IsString()
  email: string

  @IsString()
  password: string
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString()
  name: string

  @IsString()
  confirmPassword: string
}

export class RegisterResDTO {
  id: number
  email: string
  name: string
  createdAt: Date
  updatedAt: Date

  @Exclude()
  password: string

  constructor(partial: Partial<RegisterBodyDTO>) {
    Object.assign(this, partial)
  }
}
