import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'cliente',
    loadComponent: () => import('./cliente/cliente.page').then( m => m.ClientePage)
  },
  {
    path: 'funcionario',
    loadComponent: () => import('./funcionario/funcionario.page').then( m => m.FuncionarioPage)
  },
  {
    path: 'servico',
    loadComponent: () => import('./servico/servico.page').then( m => m.ServicoPage)
  },
  {
    path: 'projeto',
    loadComponent: () => import('./projeto/projeto.page').then( m => m.ProjetoPage)
  },
];
