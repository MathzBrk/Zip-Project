import { Produto } from '../../Produto/entities/produto';

export enum FormaDePagamento {
  PIX = 'PIX',
  DINHEIRO = 'DINHEIRO',
  CREDITO = 'CREDITO',
  DEBITO = 'DEBITO'
}

interface Client {
    id: string;
    nome: string;
    vaiBuscarNoLocal?: boolean
    endereco?: Endereco;
}

interface Endereco {

}

export interface DadosCadastroPedido {
  produtos: Produto[];
  formaDePagamento: FormaDePagamento;
  client: Client;
}

export interface PedidoResponse {
  id: string;
  valorTotal: number;
  nomeDoCliente: string;
  formaDePagamento: string;
}

export class Pedido {
  private readonly id?: string;
  private valorTotal: number;
  private formaDePagamento: FormaDePagamento;
  private readonly client: Client;
  private readonly data: string;
  private produtos: Produto[];

  private constructor(
    formaDePagamento: FormaDePagamento,
    client: Client,
    produtos: Produto[]
  ) {
    
    this.setFormaDePagamento(formaDePagamento);
    this.client = client;
    this.data = new Date().toISOString();
    this.produtos = produtos;
    this.definirValorTotal();
  }

  public static create(props: DadosCadastroPedido): Pedido {
    return new Pedido(
      props.formaDePagamento,
      props.client,
      props.produtos
    );
  }

  private definirValorTotal() {
    const valorTotal = this.produtos.reduce((valor, produto) => {
      return produto.getPreco() + valor;
    }, 0)

    this.valorTotal = valorTotal;
  }

  private setFormaDePagamento(formaDePagamento: FormaDePagamento) {
    if (!Object.values(FormaDePagamento).includes(formaDePagamento)) {
      throw new Error("Forma de pagamento inválida.");
    }
    this.formaDePagamento = formaDePagamento;
  }

  public getId(): string {
    return this.id;
  }

  public getValorTotal(): number {
    return this.valorTotal;
  }

  public getFormaDePagamento(): FormaDePagamento {
    return this.formaDePagamento;
  }

  public getClient(): Client {
    return this.client;
  }

  public getClietName(): string {
    return this.client.nome;
  }

  public getData(): string {
    return this.data;
  }
}