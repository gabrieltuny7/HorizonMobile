import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ServicoPrestadoService } from 'src/servico-prestado.service';
import { ServicoPrestado } from 'src/servicoPrestado';
import { Funcionario } from 'src/funcionario';
import { FuncionariosService } from 'src/funcionarios.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.page.html',
  styleUrls: ['./servico.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule
  ],
  providers: [ServicoPrestadoService, FuncionariosService]
})
export class ServicoPage implements OnInit {
  servicoSelecionado!: ServicoPrestado;
  servicoFiltrado: ServicoPrestado[] = []; // Mude para um array
  funcionarios: Funcionario[] = [];
  funcionarioSelecionado!: Funcionario;
  filtroDescricao: string = '';

  constructor(
    private service: ServicoPrestadoService,
    private funcionarioService: FuncionariosService,
  ) {}

  getFuncionarioNomes(ids: number[]): string {
    return ids.map(id => {
      const funcionario = this.funcionarios.find(f => f.id === id);
      return funcionario ? funcionario.nome : 'Desconhecido';
    }).join(', ');
  }

  ngOnInit() {
    const id = 1; // O ID do serviço que você deseja buscar
    this.service.getServicoPrestado(id).subscribe(resposta => {
      this.servicoSelecionado = resposta;
      this.filtrarServicos(); // Filtrar automaticamente após carregar o serviço
    });

    this.funcionarioService.getFuncionarios().subscribe(resposta => {
      this.funcionarios = resposta;
    });
  }

  filtrarServicos() {
    if (this.servicoSelecionado.descricao.toLowerCase().includes(this.filtroDescricao.toLowerCase())) {
      this.servicoFiltrado = [this.servicoSelecionado]; // Coloque o serviço em um array
    } else {
      this.servicoFiltrado = []; // Limpa a lista se não corresponder
    }
  }

  toggleServicos(servico: ServicoPrestado) {
    servico.expanded = !servico.expanded;
  }
}

