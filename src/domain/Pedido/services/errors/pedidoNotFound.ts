export class PedidoNotFound extends Error {
    constructor(pedidoId: string) {
        super(`Pedido com ID '${pedidoId}' não encontrado.`);
        this.name = "PedidoNotFound";
    }
}