import { DadosCadastroPedido, PedidoResponse } from "../../entities/pedido";

export interface IPedidoService {
    processarPedido(tenantId: string, dados: DadosCadastroPedido): Promise<PedidoResponse>;
    listarPedidos(tenantId: string): Promise<PedidoResponse[]>;
    cancelarPedido(tenantId: string, id: string): Promise<void>;
}