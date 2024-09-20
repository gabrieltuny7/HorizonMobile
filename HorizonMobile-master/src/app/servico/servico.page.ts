import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ServicoPrestadoService } from 'src/servico-prestado.service';
import { ServicoPrestado } from 'src/servicoPrestado';
import { Funcionario } from 'src/funcionario';
import { FuncionariosService } from 'src/funcionarios.service';
import { SpaceComponent } from '../space/space.component';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.page.html',
  styleUrls: ['./servico.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SpaceComponent,
    IonicModule
  ],
  providers: [ServicoPrestadoService, FuncionariosService]
})
export class ServicoPage implements OnInit, OnDestroy {
  servicoFiltrado: ServicoPrestado[] = [];
  todosServicos: ServicoPrestado[] = [];
  funcionarios: Funcionario[] = [];
  filtroDescricao: string = '';
  private pollingInterval: any;

  constructor(
    private service: ServicoPrestadoService,
    private funcionarioService: FuncionariosService
  ) {}

  ngOnInit() {
    this.carregarDados();
    this.iniciarPolling();
  }

  ngOnDestroy() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  private carregarDados() {
    this.service.listarServicos().subscribe(resposta => {
      this.todosServicos = resposta;
      this.servicoFiltrado = resposta;
    });

    this.funcionarioService.getFuncionarios().subscribe(resposta => {
      this.funcionarios = resposta;
    });
  }

  getFuncionarioNomes(ids: number[]): string {
    return ids.map(id => {
      const funcionario = this.funcionarios.find(f => f.id === id);
      return funcionario ? funcionario.nome : 'Desconhecido';
    }).join(', ');
  }

  filtrarServicos() {
    if (this.filtroDescricao.trim() === '') {
      this.servicoFiltrado = this.todosServicos;
    } else {
      this.servicoFiltrado = this.todosServicos.filter(servico =>
        servico.descricao.toLowerCase().includes(this.filtroDescricao.toLowerCase())
      );
    }
  }

  toggleServicos(servico: ServicoPrestado) {
    servico.expanded = !servico.expanded;
  }

  isAnyServicoExpanded(): boolean {
    return this.servicoFiltrado.some(servico => servico.expanded);
  }

  private iniciarPolling() {
    this.pollingInterval = setInterval(() => {
      this.carregarDados();
    }, 1000); // Atualiza os dados a cada 10 segundos
  }
}