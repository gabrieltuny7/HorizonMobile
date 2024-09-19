import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SpaceComponent } from '../space/space.component';
import { ClientesService } from 'src/clientes.service';
import { ServicoPrestadoService } from 'src/servico-prestado.service';
import { ProjetoService } from 'src/projeto.service';
import { FuncionariosService } from 'src/funcionarios.service';
import { ServicoCount } from 'src/ServicoCount';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, SpaceComponent, HttpClientModule, RouterModule, AppComponent], // Importar o IonicModule diretamente no componente standalone
  providers: [ClientesService, ServicoPrestadoService, ProjetoService, FuncionariosService]
})
export class HomePage implements OnInit, OnDestroy {
  quantidadeClientes: number = 0;
  quantidadeServicos: number = 0;
  quantidadeProjetos: number = 0;
  quantidadeFuncionarios: number = 0;
  valorTotalProjetos: number = 0;
  servicosPorTipo: ServicoCount[] = [];
  private pollingInterval: any;

  constructor(
    private clienteService: ClientesService,
    private servicoPrestadoService: ServicoPrestadoService,
    private projetoService: ProjetoService,
    private funcionariosService: FuncionariosService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
    this.iniciarPolling();
  }

  ngOnDestroy(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  private carregarDados(): void {
    this.carregarQuantidadeProjetos();
    this.carregarQuantidadeClientes();
    this.carregarQuantidadeServicos();
    this.carregarServicosPorTipo();
    this.carregarQuantidadeFuncionarios();
  }

  private iniciarPolling(): void {
    this.pollingInterval = setInterval(() => {
      this.carregarDados();
    }, 1000); // Atualiza a cada 10 segundos
  }

  private carregarQuantidadeProjetos(): void {
    this.projetoService.listarProjetos().subscribe(
      (projetos) => {
        this.quantidadeProjetos = projetos.length;
        this.valorTotalProjetos = this.calcularValorTotalProjetos(projetos);
      },
      (error) => {
        console.error('Erro ao carregar projetos:', error);
      }
    );
  }

  private carregarQuantidadeFuncionarios(): void {
    this.funcionariosService.getFuncionarios().subscribe(
      (funcionarios) => {
        this.quantidadeFuncionarios = funcionarios.length;
      },
      (error) => {
        console.error('Erro ao carregar funcionários:', error);
      }
    );
  }

  private calcularValorTotalProjetos(projetos: any[]): number {
    return projetos.reduce((total, projeto) => total + projeto.valor, 0);
  }

  private carregarQuantidadeClientes(): void {
    this.clienteService.getClientes().subscribe(
      (clientes) => {
        this.quantidadeClientes = clientes.length;
      },
      (error) => {
        console.error('Erro ao carregar clientes:', error);
      }
    );
  }

  private carregarQuantidadeServicos(): void {
    this.servicoPrestadoService.contarServicos().subscribe(
      (quantidadeServicos) => {
        this.quantidadeServicos = quantidadeServicos;
      },
      (error) => {
        console.error('Erro ao carregar serviços:', error);
      }
    );
  }

  private carregarServicosPorTipo(): void {
    this.servicoPrestadoService.contarServicosPorTipo().subscribe(
      (data) => {
        this.servicosPorTipo = data;
        this.updateServicoCounts();
      },
      (error) => {
        console.error('Erro ao carregar serviços por tipo:', error);
      }
    );
  }

  updateServicoCounts(): void {
    const tipos = ['Web Designing', 'Testing', 'Software Maintenance', 'Data Analysis', 'Outros', 'Web Development'];

    tipos.forEach(tipo => {
      const servico = this.servicosPorTipo.find(s => s.tipoServico === tipo);
      const countElement = document.querySelector(`.project-box-footer .days-left[data-tipo="${tipo}"]`);
      if (countElement) {
        countElement.textContent = servico ? servico.count.toString() : '0';
      }
    });
  }
}
