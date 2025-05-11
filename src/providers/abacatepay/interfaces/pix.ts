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