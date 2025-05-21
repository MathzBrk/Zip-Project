import { DadosCadastroPedido } from "../../entities/pedido";
import { IPedidoValidator } from "./interfaces/iPedidoValidator";

export class PedidoValidator implements IPedidoValidator {
    validarPedido(dados: DadosCadastroPedido): void {
        if(!dados?.formaDePagamento) {
            throw new Error("Forma de pagamento é obrigatória");
        }

        if(!dados?.produtos.length) {
            throw new Error("Produtos são obrigatórios");
        }

        if(!dados?.nomeDoCliente) {
            throw new Error("Nome do cliente é obrigatório");
        }

        if(!dados?.telefoneDoCliente) {
            throw new Error("Telefone do cliente é obrigatório");
        }

        if(dados?.vaiBuscarNoLocal) {
            if(!dados?.rua) {
                throw new Error("Rua do cliente é obrigatória");
            }

            if(!dados?.numero) {
                throw new Error("Número do cliente é obrigatório");
            }
        }
    }
}