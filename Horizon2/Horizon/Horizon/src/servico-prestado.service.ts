import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicoPrestado } from './servicoPrestado';
import { ServicoCount } from './ServicoCount';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {
  private apiURL = 'http://localhost:8082/api/servico';

  constructor(private http: HttpClient) {}

  listarServicos(): Observable<ServicoPrestado[]> {
    return this.http.get<ServicoPrestado[]>(this.apiURL);
  }

  deletar(servico: ServicoPrestado): Observable<ServicoPrestado> {
    return this.http.delete<ServicoPrestado>(`${this.apiURL}/${servico.id}`);
  }

  getServicoPrestado(id: number): Observable<ServicoPrestado> {
    return this.http.get<ServicoPrestado>(`${this.apiURL}/${id}`);
  }

  salvar(servico: ServicoPrestado): Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(this.apiURL, servico);
  }

  atualizar(id: number, servico: ServicoPrestado): Observable<ServicoPrestado> {
    return this.http.put<ServicoPrestado>(`${this.apiURL}/${id}`, servico);
  }

  contarServicos(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/count`);
  }

  contarServicosPorTipo(): Observable<ServicoCount[]> {
    return this.http.get<ServicoCount[]>(`${this.apiURL}/countByTipo`);
  }
}
