export enum Situacao {
    ATIVO = 'ATIVO',
    DESATIVADO = 'DESATIVADO'
  }


  export class Projeto {
    descricao: string = '';
    data: string = '';
    dataFinal: string = '';
    situacao: Situacao = Situacao.ATIVO;
    idClientes: number[] = [];  
    idServicos: number[] = [];  
    id!: number;
    valor!: number;
    expanded?: boolean; // Adicione esta linha
    constructor(init?: Partial<Projeto>) {
        Object.assign(this, init);
    }
}
  