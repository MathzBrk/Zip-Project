import { RealizarPagamentoPix } from "../../../../providers/interfaces/iPagamentoPixProvider";

export interface IPagamentoValidator {
    validarPagamento(dados: RealizarPagamentoPix): void;
}
