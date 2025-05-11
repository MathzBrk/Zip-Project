import { DadosCadastroProduto, ProductResponse } from "../../../libs/entities/produto";

export interface ProdutoServicesUseCases {
    consultarProdutos(): Promise<ProductResponse[]>;
    cadastrarProduto(dados: DadosCadastroProduto): Promise<ProductResponse>;
    excluirProduto(produtoId: string): Promise<boolean>;
    consultarProduto(produtoId: string): Promise<ProductResponse>;
    diminuirQuantidadeDoEstoque(productId: string, quantidade: number): Promise<void>;
    aumentarQuantidadeDoEstoque(productId: string, quantidade: number): Promise<void>;
}