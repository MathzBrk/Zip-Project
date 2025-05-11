import { DadosCadastroProduto, ProductResponse, Produto } from "../../libs/entities/produto";
import { ProdutoServicesUseCases } from "./interfaces/produtoServicesUseCases";
import {IProdutoRepository} from '../../repositories/Produto/interfaces/produtoRepositoryInterface'
import { IProdutoValidator } from "./validators/interfaces/IProdutoValidator";
import { ProdutoNotFoundError } from "./errors/produtoNotFoundError";

export class ProdutoService implements ProdutoServicesUseCases{
    constructor(
        private produtoRepository: IProdutoRepository,
        private produtoValidator: IProdutoValidator
        ){}

    async cadastrarProduto(dados: DadosCadastroProduto): Promise<ProductResponse> {
        await this.produtoValidator.validarProduto(dados);

        const produto = new Produto(dados.nome, dados.preco, dados.quantidadeEstoque);

        const produtoSalvo = await this.produtoRepository.cadastrar(produto);
    
        return {
            id: produtoSalvo.getId(),
            nome: produtoSalvo.getNome(),
            preco: produtoSalvo.getPreco()
        }
    }

    async consultarProduto(produtoId: string): Promise<ProductResponse> {
        const produto = await this.produtoRepository.encontrarPorId(produtoId);

        if (!produto) {
            throw new ProdutoNotFoundError(produtoId);
        }

        return {
            id: produto.getId(),
            nome: produto.getNome(),
            preco: produto.getPreco()
        };
    }

    async consultarProdutos(): Promise<ProductResponse[]> {
        const produtos = await this.produtoRepository.listarTodos();

        return produtos.map(produto => ({
            id: produto.getId(),
            nome: produto.getNome(),
            preco: produto.getPreco()
        }));
    }

    async excluirProduto(produtoId: string): Promise<boolean> {
        const produtoExcluido = await this.produtoRepository.deletar(produtoId);

        if(!produtoExcluido) {
            throw new ProdutoNotFoundError(produtoId);
        }

        return true;
    }

    async aumentarQuantidadeDoEstoque(productId: string, quantidade: number): Promise<void> {
        const produto = await this.produtoRepository.encontrarPorId(productId);

        if(!produto) {
            throw new ProdutoNotFoundError(productId);
        }

        produto.aumentarQuantidadeDeEstoque(quantidade);

        await this.produtoRepository.atualizar(produto);
    }

    async diminuirQuantidadeDoEstoque(productId: string, quantidade: number): Promise<void> {
        const produto = await this.produtoRepository.encontrarPorId(productId);

        if(!produto) {
            throw new ProdutoNotFoundError(productId);
        }

        produto.reduzirQuantidadeDeEstoque(quantidade);

        await this.produtoRepository.atualizar(produto);
    }
}