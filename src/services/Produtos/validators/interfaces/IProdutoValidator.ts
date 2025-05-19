import { DadosCadastroProduto } from "../../../../domain/Produto/entities/produto";

export interface IProdutoValidator {
    validarProduto(dados: DadosCadastroProduto)
}