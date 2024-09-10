import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, IonicModule } from '@ionic/angular';
import { ClientesService } from 'src/clientes.service';
import { Cliente } from 'src/cliente';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule, // Importa todos os componentes do Ionic
  ],
  providers: [ClientesService]
})
export class ClientePage implements OnInit {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  filtroNome: string = '';

  constructor(private service: ClientesService) {}

  ngOnInit() {
    this.service.getClientes().subscribe(resposta => {
      this.clientes = resposta;
      this.clientesFiltrados = resposta;
    });
  }

  filtrarClientes() {
    this.clientesFiltrados = this.clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
    );
  }

  toggleCliente(cliente: Cliente) {
    cliente.expanded = !cliente.expanded;
  }
}