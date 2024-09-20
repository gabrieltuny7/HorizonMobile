import { Component, OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Funcionario } from 'src/funcionario';
import { FuncionariosService } from 'src/funcionarios.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { SpaceComponent } from '../space/space.component';
@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.page.html',
  styleUrls: ['./funcionario.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SpaceComponent,
    HttpClientModule,
    IonicModule // Importa todos os componentes do Ionic
  ],
  providers: [FuncionariosService]
})
export class FuncionarioPage implements OnInit, OnDestroy {
  funcionarios: Funcionario[] = [];
  funcionariosFiltrados: Funcionario[] = [];
  filtroNome: string = '';
  private pollingInterval: any;

  constructor(private service: FuncionariosService) {}

  ngOnInit() {
    this.carregarFuncionarios();
    this.iniciarPolling();
  }

  ngOnDestroy(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  private carregarFuncionarios(): void {
    this.service.getFuncionarios().subscribe(resposta => {
      this.funcionarios = resposta;
      this.filtrarFuncionarios(); // Manter o filtro aplicado após a atualização
    });
  }

  filtrarFuncionarios(): void {
    this.funcionariosFiltrados = this.funcionarios.filter(funcionario =>
      funcionario.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
    );
  }

  toggleFuncionario(funcionario: Funcionario): void {
    funcionario.expanded = !funcionario.expanded;
  }

  isAnyFuncionarioExpanded(): boolean {
    return this.funcionariosFiltrados.some(funcionario => funcionario.expanded);
  }

  private iniciarPolling(): void {
    this.pollingInterval = setInterval(() => {
      this.carregarFuncionarios();
    }, 1000); // Atualiza a cada 10 segundos
  }
}

