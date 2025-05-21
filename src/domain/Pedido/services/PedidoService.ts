import { DadosCadastroPedido, Pedido, PedidoResponse } from "../entities/pedido";
import { IPedidoRepository } from "../repositories/interfaces/iPedidoRepository";
import { PedidoNotFound } from "./errors/pedidoNotFound";
import { IPedidoService } from "./interfaces/iPedidoServices";
import { IPedidoValidator } from "./validators/interfaces/iPedidoValidator";

export class PedidoService implements IPedidoService {

    constructor(private pedidoRepository: IPedidoRepository, private pedidoValidator: IPedidoValidator){}

    async processarPedido(tenantId: string, dados: DadosCadastroPedido): Promise<PedidoResponse> {
        this.pedidoValidator.validarPedido(dados);

        const pedido = Pedido.create(dados);

        const pedidoSalvo = await this.pedidoRepository.criarPedido(tenantId, pedido);

        return {
            id: pedidoSalvo.getId(),
            formaDePagamento: pedidoSalvo.getFormaDePagamento(),
            nomeDoCliente: pedidoSalvo.getClietName(),
            valorTotal: pedidoSalvo.getValorTotal()
        }
    }

    async cancelarPedido(tenantId: string, id: string): Promise<void> {
        const pedidoASerCancelado = this.pedidoRepository.consultarPedido(tenantId, id);

        if(!pedidoASerCancelado) {
            throw new PedidoNotFound(id);
        }

        await this.pedidoRepository.cancelarPedido(pedidoASerCancelado);

        console.log(`Pedido ${id} cancelado com sucesso`)
    }

    async listarPedidos(tenantId: string): Promise<PedidoResponse[]> {
        const pedidos = await this.pedidoRepository.consultarPedidos(tenantId, 5);

        if(!pedidos?.length) {
            console.log("Sem pedidos a serem retornados")
            return []
        }

        console.log(`Pedidos retornados: ${pedidos.length}`)

        return pedidos.map((pedido) => {
            return {
            id: pedido.getId(),
            formaDePagamento: pedido.getFormaDePagamento(),
            nomeDoCliente: pedido.getClietName(),
            valorTotal: pedido.getValorTotal()
        }
        })
    }
}