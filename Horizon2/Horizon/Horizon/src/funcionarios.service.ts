import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from './funcionario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  private apiURL = 'http://localhost:8082/api/funcionarios';

  constructor(private http: HttpClient) {}

  salvar(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiURL, funcionario);
  }

  atualizar(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiURL}/${funcionario.id}`, funcionario);
  }

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiURL);
  }

  getFuncionarioById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiURL}/${id}`);
  }

  deletar(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.delete<Funcionario>(`${this.apiURL}/${funcionario.id}`);
  }

  verificarCPFCadastrado(cpf: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/verificar-cpf/${cpf}`);
  }
}
