import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projeto } from './projeto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {
  private apiURL = 'https://apipi-production-befc.up.railway.app/api/projeto';

  constructor(private http: HttpClient) {}

  // Listar todos os projetos
  listarProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.apiURL);
  }

  // Deletar um projeto
  deletar(projeto: Projeto): Observable<Projeto> {
    return this.http.delete<Projeto>(`${this.apiURL}/${projeto.id}`);
  }

  // Buscar um projeto pelo ID
  getProjeto(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.apiURL}/${id}`);
  }

  // Salvar um novo projeto
  salvar(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>(this.apiURL, projeto);
  }

  // Atualizar um projeto existente
  atualizar(projeto: Projeto): Observable<Projeto> {
    const url = `${this.apiURL}/${projeto.id}`;
    return this.http.put<Projeto>(url, projeto);
  }

  // Somar os valores de todos os projetos
  somarValoresProjetos(): Observable<number> {
    return this.http.get<Projeto[]>(this.apiURL).pipe(
      map((projetos: Projeto[]) => {
        return projetos.reduce((total, projeto) => total + projeto.valor, 0);
      })
    );
  }

  // Contar o total de projetos
  contarProjetos(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/count`);
  }
}
