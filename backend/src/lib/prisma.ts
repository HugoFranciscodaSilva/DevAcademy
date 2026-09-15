import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/client.js'


export const adapter = new PrismaBetterSqlite3({url:process.env.DATABASE_URL})
const prisma = new PrismaClient({adapter})

export default prisma