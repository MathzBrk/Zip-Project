import axios from "axios";
import { ABACATE_PAY_API_URL } from "../const/abacate";
import { IPagamentoPixProvider, PixResponse, RealizarPagamentoPix } from "../../interfaces/iPagamentoPixProvider";

export class AbacatePayPixProvider implements IPagamentoPixProvider {
    async gerarQrCodePix(
        token: string,
        { amount, description, expiresIn }: RealizarPagamentoPix,
    ): Promise<PixResponse> {
        try {
            const response = await axios.post(
                `${ABACATE_PAY_API_URL}/pixQrCode/create`,
                {
                    amount,
                    description,
                    expiresIn,
                    devMode: true,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                },
            );

            if (!response.data || !response.data.data) {
                throw new Error("Dados do QR Code não encontrados.");
            }

            console.log("Dados do QR Code:", response.data.data.brCodeBase64);

            return {
                id: response.data.data.id,
                brCode: response.data.data.brCode,
                brCodeBase64: response.data.data.brCodeBase64,
            };
        } catch (error) {
            throw new Error(`Erro ao gerar o QR Code: ${error}`);
        }
    }
}