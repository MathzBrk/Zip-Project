import { v4 as uuid } from 'uuid';
import { Endereco } from './endereco';

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

interface CreatePedidoProps {
  valor: number;
  formaDePagamento: FormaDePagamento;
  client: Client;
}

export class Pedido {
  private readonly id: string;
  private valor: number;
  private formaDePagamento: FormaDePagamento;
  private readonly client: Client;
  private readonly data: string;

  private constructor(
    valor: number,
    formaDePagamento: FormaDePagamento,
    client: Client,
  ) {
    
    this.id = uuid();
    this.setValor(valor);
    this.setFormaDePagamento(formaDePagamento);
    this.client = client;
    this.data = new Date().toISOString();
  }

  public static create(props: CreatePedidoProps): Pedido {
    return new Pedido(
      props.valor,
      props.formaDePagamento,
      props.client,
    );
  }

  private setValor(valor: number) {
    if (valor <= 0) {
      throw new Error("Valor do pedido deve ser maior que zero.");
    }
    this.valor = valor;
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

  public getValor(): number {
    return this.valor;
  }

  public getFormaDePagamento(): FormaDePagamento {
    return this.formaDePagamento;
  }

  public getClient(): Client {
    return this.client;
  }

  public getData(): string {
    return this.data;
  }
}