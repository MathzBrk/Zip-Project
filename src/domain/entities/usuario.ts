import { v4 as uuidv4 } from 'uuid';
import { Email } from './email';
import { Senha } from './senha';

export interface UsuarioResponse {
  id: string;
  nome: string;
  email: string;
}

export interface DadosCadastroUsuario {
  nome: string;
  email: string;
  senha: string;
}

export class Usuario {
  private readonly id: string;
  private readonly nome: string;
  private readonly email: Email;
  private readonly senha: Senha;

  private constructor(
    nome: string,
    email: Email,
    senha: Senha,
    id?: string
  ) {
    this.validar(nome);
    this.id = id ?? uuidv4();
    this.nome = nome.trim();
    this.email = email;
    this.senha = senha;
  }

  public static create(props: {
    nome: string;
    email: Email;
    senha: Senha;
    id?: string;
  }): Usuario {
    return new Usuario(props.nome, props.email, props.senha, props.id);
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

  public getEmailString(): string {
    return this.email.getEmail();
  }

  public getSenha(): Senha {
    return this.senha;
  }

}
