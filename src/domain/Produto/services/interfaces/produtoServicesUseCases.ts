import { DadosCadastroProduto, ProductResponse } from "../../entities/produto";

export interface ProdutoServicesUseCases {
    consultarProdutos(userId: string): Promise<ProductResponse[]>;
    cadastrarProduto(userId: string, dados: DadosCadastroProduto): Promise<ProductResponse>;
    excluirProduto(userId: string, produtoId: string): Promise<boolean>;
    consultarProduto(userId: string, produtoId: string): Promise<ProductResponse>;
    diminuirQuantidadeDoEstoque(userId: string, productId: string, quantidade: number): Promise<void>;
    aumentarQuantidadeDoEstoque(userId: string, productId: string, quantidade: number): Promise<void>;
}