export interface IPagamentoPixProvider {
    gerarQrCodePix(token: string, dados: RealizarPagamentoPix): Promise<PixResponse>;
}

export interface RealizarPagamentoPix {
    amount: number;
    expiresIn?: number;
    description?: string;
}

export interface PixResponse {
    id: string;
    brCode: string;
    brCodeBase64: string;
}