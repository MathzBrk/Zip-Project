export interface EnderecoProps {
    rua: string;
    numero: string;
    cidade: string;
}

export class Endereco {
    private rua: string;
    private numero: string;
    private cidade: string;

    private constructor(props: EnderecoProps){
      this.rua = props.rua;
      this.numero = props.numero;
      this.cidade = props.cidade;

    }

    public static create(props: EnderecoProps): Endereco {
        return new Endereco({
            rua: props.rua,
            numero: props.numero,
            cidade: props.cidade
        });
    }
  }