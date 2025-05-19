import { DadosCadastroProduto } from "../../../../domain/entities/produto";

export interface IProdutoValidator {
    validarProduto(dados: DadosCadastroProduto)
}