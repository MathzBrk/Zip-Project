import { DadosCadastroProduto } from "../../../../libs/entities/produto";

export interface IProdutoValidator {
    validarProduto(dados: DadosCadastroProduto)
}