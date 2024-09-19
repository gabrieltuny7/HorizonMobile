import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './cliente';
import { Observable } from 'rxjs';
import { environment } from './environments/environment.prod'; // Importa o environment

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiURL = `${environment.apiUrl}/clientes`; // Usa a URL da API do environment

  constructor(private http: HttpClient) {}

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiURL, cliente);
  }

  atualizar(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiURL);
  }

  getNomeClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiURL}/${id}`);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiURL}/${id}`);
  }

  deletar(cliente: Cliente): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.apiURL}/${cliente.id}`);
  }

  verificarCPFCadastrado(cpf: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/verificar-cpf/${cpf}`);
  }
}
