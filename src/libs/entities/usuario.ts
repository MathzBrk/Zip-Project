import {v4 as uuid, v4} from 'uuid';
import { Email } from './email';
import { Senha } from './senha';
import { Endereco } from './endereco';

export class Usuario {

    private id: string;
    private nome: string;
    private email: Email;
    private senha: Senha;
    private endereco: Endereco;

    constructor(nome: string, email: Email, senha: Senha, endereco: Endereco) {
        this.id = v4();
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.endereco = endereco;
    }
}