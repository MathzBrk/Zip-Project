import { v4 as uuidv4 } from 'uuid';
import { Email } from './email';
import { Senha } from './senha';
import { Endereco } from './endereco';

export class Usuario {
  private readonly id: string;
  private readonly nome: string;
  private readonly email: Email;
  private readonly senha: Senha;
  private readonly endereco: Endereco;

  private constructor(
    nome: string,
    email: Email,
    senha: Senha,
    endereco: Endereco,
    id?: string
  ) {
    this.validar(nome);
    this.id = id ?? uuidv4();
    this.nome = nome.trim();
    this.email = email;
    this.senha = senha;
    this.endereco = endereco;
  }

  public static create(props: {
    nome: string;
    email: Email;
    senha: Senha;
    endereco: Endereco;
    id?: string;
  }): Usuario {
    return new Usuario(props.nome, props.email, props.senha, props.endereco, props.id);
  }

  private validar(nome: string): void {
    if (!nome || nome.trim().length === 0) {
      throw new Error("Nome do usuário é obrigatório.");
    }
  }

  public getId(): string {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getSenha(): Senha {
    return this.senha;
  }

  public getEndereco(): Endereco {
    return this.endereco;
  }
}
