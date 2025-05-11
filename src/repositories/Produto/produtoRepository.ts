import { PrismaClient } from "@prisma/client";
import { DadosCadastroProduto, ProductResponse, Produto } from "../../libs/entities/produto";
import { IProdutoRepository } from "./interfaces/produtoRepositoryInterface";

export class ProdutoRepository implements IProdutoRepository {
    constructor(private prisma: PrismaClient) {}

    async cadastrar(produto: Produto): Promise<Produto> {
        const produtoSalvo = await this.prisma.produtos.create({
            data: {
                nome: produto.getNome(),
                preco: produto.getPreco(),
                quantidadeEstoque: produto.getQuantidadeEstoque(),
            },
        });

        const produtoDominio = new Produto(produtoSalvo.nome, produtoSalvo.preco, produtoSalvo.quantidadeEstoque, produtoSalvo.id);

        return produtoDominio;
    }

    async deletar(id: string): Promise<Produto> {
        const produtoExcluido = await this.prisma.produtos.delete({
            where: {
                id: id
            }
        });

        const produtoDominio = new Produto(produtoExcluido.nome, produtoExcluido.preco, produtoExcluido.quantidadeEstoque, produtoExcluido.id);


        return produtoDominio;
    }

    async encontrarPorId(id: string): Promise<Produto> {
        const produtoASerProcurado = await this.prisma.produtos.findUnique({
            where: {
                id
            }
        })

        return new Produto(produtoASerProcurado.nome,produtoASerProcurado.preco, produtoASerProcurado.quantidadeEstoque, produtoASerProcurado.id);
    }

    async listarTodos(): Promise<Produto[]> {
        return (await this.prisma.produtos.findMany()).map((produto) => {
            return new Produto(produto.nome, produto.preco, produto.quantidadeEstoque, produto.id)
        });
    }

    async atualizar(produto: Produto): Promise<void> {
        await this.prisma.produtos.update({
            where: {
                id: produto.getId()
            },
            data: {
                nome: produto.getNome(),
                preco: produto.getPreco(),
                quantidadeEstoque: produto.getQuantidadeEstoque()
            }
        })
    }
}
