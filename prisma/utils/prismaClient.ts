import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';
import {PrismaClient} from '@prisma/client'

const getPrismaClient = () => {
const adapter = new PrismaBetterSQLite3({
  url: "file:../../data/dev.db"
});


const prisma = new PrismaClient({ adapter });

 return prisma;
}

export default getPrismaClient;