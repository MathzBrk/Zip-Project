import { PrismaClient, Tenant } from "@prisma/client";
import { IUserRepository } from "./interfaces/userRepositoryMethods";
import { Usuario, UsuarioResponse } from "../../domain/entities/usuario";
import { Email } from "../../domain/entities/email";
import { Senha } from "../../domain/entities/senha";

export class PrismaUserRepository implements IUserRepository {
    constructor(private prisma: PrismaClient){}

    async criarUsuario(usuario: Usuario): Promise<Usuario> {
        const usuarioSalvo = await this.prisma.tenant.create({
            data: {
                nome: usuario.getNome(),
                email: usuario.getEmailString(),
                senha: usuario.getSenha().valor,
            }
        });

        return Usuario.create({
            nome: usuarioSalvo.nome,
            email: Email.create(usuarioSalvo.email),
            senha: Senha.criar(usuarioSalvo.senha),
            id: usuarioSalvo.id
        })
    }

    async deletarUsuario(usuarioId: string): Promise<Usuario> {
        const usuarioDeletado = await this.prisma.tenant.delete({
            where: {
                id: usuarioId
            }
        })

        return Usuario.create({
            nome: usuarioDeletado.nome,
            email: Email.create(usuarioDeletado.email),
            senha: Senha.criar(usuarioDeletado.senha),
            id: usuarioDeletado.id
        })
    }

}