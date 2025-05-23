import { v4 as uuidv4 } from 'uuid';

export interface DadosCadastroProduto {
    nome: string;
    preco: number;
    quantidadeEstoque: number;
}

export interface ProductResponse {
    id: string;
    nome: string;
    preco: number;
}

export class Produto {
    private readonly id: string;
    private nome: string;
    private preco: number;
    private quantidadeEstoque: number;

    constructor(nome: string, preco: number, quantidadeEstoque: number, id?: string) {
        this.id = id ?? uuidv4();
        this.setNome(nome);
        this.setPreco(preco);
        this.setQuantidadeEstoque(quantidadeEstoque);
    }

    private validarPreco(preco: number): void {
        if (preco <= 0) {
            throw new Error("O preço do produto deve ser maior que zero.");
        }
    }

    private setPreco(preco: number): void {
        this.validarPreco(preco);
        this.preco = preco;
    }

    private setNome(nome: string): void {
        if (!nome || nome.trim().length === 0) {
            throw new Error("O nome do produto é obrigatório.");
        }
        this.nome = nome.trim();
    }

    public reduzirQuantidadeDeEstoque(quantidade: number): void {
        if (quantidade <= 0) {
            throw new Error("A quantidade a ser reduzida deve ser maior que zero.");
        }
        if (this.quantidadeEstoque < quantidade) {
            throw new Error("Estoque insuficiente.");
        }
        this.quantidadeEstoque -= quantidade;
    }

    public aumentarQuantidadeDeEstoque(quantidade: number): void {
    if (quantidade <= 0) {
        throw new Error("A quantidade deve ser maior que zero.");
    }
    this.quantidadeEstoque += quantidade;
}

    public setQuantidadeEstoque(quantidadeEstoque: number) {
        if(quantidadeEstoque <= 0) {
            throw new Error(`Quantidade do produto ${this.nome} não pode ser menor ou igual a 0!`)
        }
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public getQuantidadeEstoque() {
        if(this.quantidadeEstoque < 0) {
            throw new Error(`Quantidade do produto ${this.nome} não pode ser menor ou igual a 0!`)
        }

        return this.quantidadeEstoque;
    }

    public getId(): string {
        return this.id;
    }

    public getNome(): string {
        return this.nome;
    }

    public getPreco(): number {
        return this.preco;
    }
}
