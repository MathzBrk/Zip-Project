import { hashSync, compareSync } from 'bcrypt';

export class Senha {
  private readonly hash: string;

  private constructor(hash: string) {
    this.hash = hash;
  }

  static criar(senhaEmTexto: string): Senha {
    const salt = 10;
    const hash = hashSync(senhaEmTexto, salt);
    return new Senha(hash);
  }

  static aPartirDeHash(hashExistente: string): Senha {
    return new Senha(hashExistente);
  }

  comparar(senhaTexto: string): boolean {
    return compareSync(senhaTexto, this.hash);
  }

  get valor(): string {
    return this.hash;
  }
}
