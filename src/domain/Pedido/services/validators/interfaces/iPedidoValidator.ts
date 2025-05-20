import { DadosCadastroPedido } from "../../../entities/pedido";

export interface IPedidoValidator {
    validarPedido(dados: DadosCadastroPedido): void;
}