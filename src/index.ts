import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

console.log(Object.keys(prisma));


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/qrcode`);
});
