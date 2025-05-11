import { PixResponse, RealizarPagamentoPix } from "../interfaces/pix";
import axios from "axios";
import { ABACATE_PAY_API_URL } from "../const/abacate";


const gerarQrCodePix = async (token: string, {
  amount, description, expiresIn
}: RealizarPagamentoPix):Promise<PixResponse> => {

    const response = await axios.post(
      `${ABACATE_PAY_API_URL}/pixQrCode/create`,
      {
        amount,
        description,
        expiresIn,
        devMode: true
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }
    );

    if (response.status !== 200) {
      throw new Error("Erro ao gerar QR Code Pix");
    }

    if (!response.data || !response.data.data) {
      throw new Error("Dados do QR Code não encontrados.");
    }

    console.log("Dados do QR Code:", response.data.data.brCodeBase64);

    return{
      id: response.data.data.id,
      brCode: response.data.data.brCode,
      brCodeBase64: response.data.data.brCodeBase64,
    } 
}

export const generatePix = async ({
  amount, description, expiresIn
}: RealizarPagamentoPix)  => {

  console.log(process.env.ABACATE_PAY_KEY);  

  const pix = await gerarQrCodePix(process.env.ABACATE_PAY_KEY, {
    amount,
    description,
    expiresIn
    });

  if (!pix) {
    console.log("Erro ao gerar o QR Code.");
  } else {
    console.log("QR Code gerado:");
  }

  return pix;
}
