import { DadosCadastroProduto } from "../../../entities/produto";

export interface IProdutoValidator {
    validarProduto(dados: DadosCadastroProduto)
}