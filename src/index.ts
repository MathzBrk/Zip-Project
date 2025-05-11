import express from 'express';
import dotenv from 'dotenv';
import { generatePix } from './providers/abacatepay/services/gerarQrCodePix';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Boa prática para rotas POST futuras

app.get('/qrcode', async (_req, res) => {
  try {
    const {brCode, brCodeBase64} = await generatePix({
      amount: 1000.0,
      description: "Pagamento de teste",
      expiresIn: 3600, // 1 hora
    });

    const html = `
      <html>
        <body>
          <h2>QR Code PIX</h2>
          <img src="${brCodeBase64}" alt="QR Code PIX"/>
          <p><strong>Ou copie o código:</strong></p>
          <textarea rows="5" cols="60">${brCode}</textarea>
        </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    res.status(500).send("Erro ao gerar QR Code.");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/qrcode`);
});
