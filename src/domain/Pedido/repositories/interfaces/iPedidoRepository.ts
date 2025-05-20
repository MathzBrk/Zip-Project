import { Pedido } from "../../entities/pedido";

export interface IPedidoRepository {
    criarPedido(tenantId: string, dados: Pedido): Promise<Pedido>;
    consultarPedidos(tenantId: string, quantidade?: number): Promise<Pedido[]>;
    consultarPedido(tenantId: string, pedidoId: string);
    cancelarPedido(pedido: Pedido): Promise<boolean>;
}