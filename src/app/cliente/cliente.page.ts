import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, IonicModule } from '@ionic/angular';
import { ClientesService } from 'src/clientes.service';
import { Cliente } from 'src/cliente';
import { HttpClientModule } from '@angular/common/http';
import { SpaceComponent } from '../space/space.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SpaceComponent,
    AppComponent,
    HttpClientModule,
    IonicModule, // Importa todos os componentes do Ionic
  ],
  providers: [ClientesService]
})
export class ClientePage implements OnInit, OnDestroy {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  filtroNome: string = '';
  private pollingInterval: any;
  private clientesIdAnterior: Set<number> = new Set();

  constructor(private service: ClientesService) {}

  ngOnInit() {
    this.carregarClientes();
    this.iniciarPolling();
  }

  ngOnDestroy(): void {
    this.pararPolling();
  }

  private carregarClientes(): void {
    this.service.getClientes().subscribe(resposta => {
      const novosClientesIds = new Set(resposta.map(cliente => cliente.id));

      // Verifica se houve alterações na lista
      if (!this.isIgual(this.clientesIdAnterior, novosClientesIds)) {
        this.clientes = resposta; // Atualiza a lista de clientes
        this.clientesFiltrados = this.filtrarClientesPorNome(); // Aplica o filtro
        this.clientesIdAnterior = novosClientesIds; // Atualiza o conjunto de IDs
      }

      // Reinicia o polling apenas se houver alteração
      this.reiniciarPolling();
    });
  }

  filtrarClientes(): void {
    this.clientesFiltrados = this.clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
    );
  }

  toggleCliente(cliente: Cliente): void {
    cliente.expanded = !cliente.expanded;
  }

  isAnyClienteExpanded(): boolean {
    return this.clientesFiltrados.some(cliente => cliente.expanded);
  }

  private filtrarClientesPorNome(): Cliente[] {
    return this.clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
    );
  }

  private isIgual(set1: Set<number>, set2: Set<number>): boolean {
    if (set1.size !== set2.size) {
      return false;
    }
    for (let item of set1) {
      if (!set2.has(item)) {
        return false;
      }
    }
    return true;
  }

  private iniciarPolling(): void {
    this.pollingInterval = setInterval(() => {
      this.carregarClientes(); // Faz a verificação de novos dados e atualiza a lista
    }, 10000); // Polling a cada 10 segundos
  }

  private reiniciarPolling(): void {
    this.pararPolling(); // Para o polling atual
    this.iniciarPolling(); // Reinicia o polling
  }

  private pararPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }
}