import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../Usuario/repositories/interfaces/userRepositoryMethods";
import { Email } from "../../Usuario/entities/email";
import { Senha } from "../../Usuario/entities/senha";
import { Usuario } from "../entities/usuario";

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