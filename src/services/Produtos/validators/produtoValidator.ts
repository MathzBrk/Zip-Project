import type { DadosCadastroProduto } from "../../../domain/entities/produto";
import type { IProdutoValidator } from "./interfaces/IProdutoValidator";

export class ProdutoValidator implements IProdutoValidator {
	validarProduto(dados: DadosCadastroProduto): void {
		if (!dados.nome || dados.nome.trim().length < 3) {
			throw new Error("O nome do produto deve ter pelo menos 3 caracteres.");
		}

		if (typeof dados.preco !== "number" || dados.preco <= 0) {
			throw new Error("O preço do produto deve ser um número maior que zero.");
		}

		if (
			!Number.isInteger(dados.quantidadeEstoque) ||
			dados.quantidadeEstoque < 0
		) {
			throw new Error(
				"A quantidade em estoque deve ser um número inteiro não negativo.",
			);
		}
	}
}
