/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { plainToInstance } from 'class-transformer'
import { IsString, validateSync } from 'class-validator'
import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'
config({
  path: path.resolve('.env'),
})

if (!fs.existsSync(path.resolve('.env'))) {
  console.log('Please create a .env file')
  process.exit(1)
}

class ConfigSchema {
  DATABASE_URL: string

  @IsString()
  ACCESS_TOKEN_SECRET: string
  @IsString()
  ACCESS_TOKEN_EXPIRES_IN: string
  @IsString()
  REFRESH_TOKEN_SECRET: string
  @IsString()
  REFRESH_TOKEN_EXPIRES_IN: string
}
const configServer = plainToInstance(ConfigSchema, process.env, {
  enableImplicitConversion: true,
})
const e = validateSync(configServer)
// console.log(configServer)
// console.log(ConfigSchema)
if (e.length) {
  console.log(e)
  const errors = e.map((eItem) => {
    return {
      property: eItem.property,
      constraints: eItem.constraints,
      value: eItem.value,
    }
  })
  throw errors
}

const envConfig = configServer

export default envConfig
