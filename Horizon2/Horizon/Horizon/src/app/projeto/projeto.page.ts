import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ProjetoService } from 'src/projeto.service';
import { ClientesService } from 'src/clientes.service';
import { ServicoPrestadoService } from 'src/servico-prestado.service';
import { ServicoPrestado } from 'src/servicoPrestado';
import { Cliente } from 'src/cliente';
import { Projeto } from 'src/projeto';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.page.html',
  styleUrls: ['./projeto.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    RouterModule
  ],
  providers: [ProjetoService, ClientesService, ServicoPrestadoService]
})
export class ProjetoPage implements OnInit {

  projetosFiltrados: Projeto[] = [];
  projetos: Projeto[] = [];
  clientes: Cliente[] = [];
  servicos: ServicoPrestado[] = [];

  filtroDescricao: string = '';

  constructor(
    private projetoService: ProjetoService,
    private clienteService: ClientesService,
    private servicoService: ServicoPrestadoService,
    
  ) {}

  ngOnInit(): void {
    this.loadClientes();
    this.loadServicos();
    this.loadProjetos();
  }

  private loadClientes(): void {
    this.clienteService.getClientes().subscribe(
      (resposta: Cliente[]) => this.clientes = resposta,
      (erro: any) => console.error('Erro ao listar clientes:', erro)
    );
  }

  private loadServicos(): void {
    this.servicoService.listarServicos().subscribe(
      (resposta: ServicoPrestado[]) => this.servicos = resposta,
      (erro: any) => console.error('Erro ao listar serviços:', erro)
    );
  }

  private loadProjetos(): void {
    this.projetoService.listarProjetos().subscribe(
      (resposta: Projeto[]) => {
        this.projetos = resposta;
        this.projetosFiltrados = resposta;
      },
      (erro: any) => console.error('Erro ao listar projetos:', erro)
    );
  }

  getClienteNomeById(ids: number[]): string {
    return ids.map(id => {
      const cliente = this.clientes.find(c => c.id === id);
      return cliente ? cliente.nome : 'Desconhecido';
    }).join(', ');
  }

  getServicoDescricaoById(ids: number[]): string {
    return ids.map(id => {
      const servico = this.servicos.find(s => s.id === id);
      return servico ? servico.descricao : 'Desconhecido';
    }).join(', ');
  }

  filtrarProjetos(): void {
    this.projetosFiltrados = this.projetos.filter(projeto => 
      projeto.descricao.toLowerCase().includes(this.filtroDescricao.toLowerCase())
    );
  }

  
  toggleProjeto(projeto: Projeto): void {
    projeto.expanded = !projeto.expanded;
  }
}