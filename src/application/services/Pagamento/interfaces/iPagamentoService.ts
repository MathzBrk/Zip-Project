import { PixResponse, RealizarPagamentoPix } from "../../../providers/interfaces/iPagamentoPixProvider";

export interface IPagamentoService {
    simularPagamento(idPix: string): Promise<string>;
    gerarQrCodeECopiaEColaPix(dados: RealizarPagamentoPix): Promise<PixResponse>;
}