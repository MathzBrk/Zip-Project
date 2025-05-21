import { IPagamentoPixProvider, RealizarPagamentoPix, PixResponse } from "../../providers/interfaces/iPagamentoPixProvider";
import { IPagamentoService } from "./interfaces/iPagamentoService";
import { IPagamentoValidator } from "./validators/interfaces/iPagamentoValidator";


export class PagamentoService implements IPagamentoService {
    constructor(private pagamentoPixProvider: IPagamentoPixProvider, private pagamentoValidator: IPagamentoValidator){}

    async simularPagamento(idPix: string): Promise<string> {
        const isPagamentoRealizado = await this.pagamentoPixProvider.simularPagamento(idPix);
        
        if(!isPagamentoRealizado) {
            return "Pagamento não realizado";
        }

        return "Pagamento realizado com sucesso";
    }

    async gerarQrCodeECopiaEColaPix(dados: RealizarPagamentoPix): Promise<PixResponse> {
        this.pagamentoValidator.validarPagamento(dados);
        return this.pagamentoPixProvider.gerarQrCodePix(dados);
    }
}
