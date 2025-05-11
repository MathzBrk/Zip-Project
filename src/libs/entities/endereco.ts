export interface EnderecoProps {
    rua: string;
    numero: string;
    cidade: string;
}

export class Endereco {
    private readonly rua: string;
    private readonly numero: string;
    private readonly cidade: string;

    private constructor(props: EnderecoProps) {
        this.validar(props);
        this.rua = props.rua.trim();
        this.numero = props.numero.trim();
        this.cidade = props.cidade.trim();
    }

    public static create(props: EnderecoProps): Endereco {
        return new Endereco(props);
    }

    private validar(props: EnderecoProps): void {
        if (!props.rua || props.rua.trim().length === 0) {
            throw new Error("Rua é obrigatória.");
        }
        if (!props.numero || props.numero.trim().length === 0) {
            throw new Error("Número é obrigatório.");
        }
        if (!props.cidade || props.cidade.trim().length === 0) {
            throw new Error("Cidade é obrigatória.");
        }
    }

    public getRua(): string {
        return this.rua;
    }

    public getNumero(): string {
        return this.numero;
    }

    public getCidade(): string {
        return this.cidade;
    }
}
