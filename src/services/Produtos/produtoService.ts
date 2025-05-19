import { DadosCadastroProduto, ProductResponse, Produto } from "../../domain/Produto/entities/produto";
import { ProdutoServicesUseCases } from "./interfaces/produtoServicesUseCases";
import { IProdutoValidator } from "./validators/interfaces/IProdutoValidator";
import { ProdutoNotFoundError } from "./errors/produtoNotFoundError";
import { IProdutoRepository } from "../../domain/Produto/repositories/interfaces/produtoRepositoryInterface";

export class ProdutoService implements ProdutoServicesUseCases{
    constructor(
        private produtoRepository: IProdutoRepository,
        private produtoValidator: IProdutoValidator
        ){}

    async cadastrarProduto(userId: string, dados: DadosCadastroProduto): Promise<ProductResponse> {
        await this.produtoValidator.validarProduto(dados);

        const produto = new Produto(dados.nome, dados.preco, dados.quantidadeEstoque);

        const produtoSalvo = await this.produtoRepository.cadastrar(userId, produto);
    
        return {
            id: produtoSalvo.getId(),
            nome: produtoSalvo.getNome(),
            preco: produtoSalvo.getPreco()
        }
    }

    async consultarProduto(userId: string, produtoId: string): Promise<ProductResponse> {
        const produto = await this.produtoRepository.encontrarPorId(userId, produtoId);

        if (!produto) {
            throw new ProdutoNotFoundError(produtoId);
        }

        return {
            id: produto.getId(),
            nome: produto.getNome(),
            preco: produto.getPreco()
        };
    }

    async consultarProdutos(userId: string): Promise<ProductResponse[]> {
        const produtos = await this.produtoRepository.listarTodos(userId);

        return produtos.map(produto => ({
            id: produto.getId(),
            nome: produto.getNome(),
            preco: produto.getPreco()
        }));
    }

    async excluirProduto(userId: string, produtoId: string): Promise<boolean> {
        const produtoExcluido = await this.produtoRepository.deletar(userId, produtoId);

        if(!produtoExcluido) {
            throw new ProdutoNotFoundError(produtoId);
        }

        return true;
    }

    async aumentarQuantidadeDoEstoque(userId: string, productId: string, quantidade: number): Promise<void> {
        const produto = await this.produtoRepository.encontrarPorId(userId, productId);

        if(!produto) {
            throw new ProdutoNotFoundError(productId);
        }

        produto.aumentarQuantidadeDeEstoque(quantidade);

        await this.produtoRepository.atualizar(userId, produto);
    }

    async diminuirQuantidadeDoEstoque(userId: string, productId: string, quantidade: number): Promise<void> {
        const produto = await this.produtoRepository.encontrarPorId(userId, productId);

        if(!produto) {
            throw new ProdutoNotFoundError(productId);
        }

        produto.reduzirQuantidadeDeEstoque(quantidade);

        await this.produtoRepository.atualizar(userId, produto);
    }
}