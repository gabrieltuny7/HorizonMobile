import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Funcionario } from 'src/funcionario';
import { FuncionariosService } from 'src/funcionarios.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.page.html',
  styleUrls: ['./funcionario.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule // Importa todos os componentes do Ionic
  ],
  providers: [FuncionariosService]
})
export class FuncionarioPage implements OnInit {
  funcionarios: Funcionario[] = [];
  funcionariosFiltrados: Funcionario[] = [];
  filtroNome: string = '';

  constructor(private service: FuncionariosService) {}

  ngOnInit() {
    this.service.getFuncionarios().subscribe(resposta => {
      this.funcionarios = resposta;
      this.funcionariosFiltrados = resposta;
    });
  }

  filtrarFuncionarios() {
    this.funcionariosFiltrados = this.funcionarios.filter(funcionario =>
      funcionario.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
    );
  }

  toggleFuncionario(funcionario: Funcionario) {
    funcionario.expanded = !funcionario.expanded;
  }
}


