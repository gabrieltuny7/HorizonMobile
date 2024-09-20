import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: SQLiteDBConnection | null = null;
  private sqlite: SQLiteConnection;

  constructor(sqlite: SQLiteConnection) {
    this.sqlite = sqlite;
  }

  // Método para abrir/criar o banco de dados
  async openDatabase() {
    try {
      this.db = await this.sqlite.createConnection('clientesDB', false, 'no-encryption', 1, false);
      await this.db.open();
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS clientes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT,
          cpf TEXT,
          telefone TEXT,
          email TEXT,
          dataCadastro TEXT,
          expanded BOOLEAN DEFAULT 0
        )
      `);
    } catch (error) {
      console.error('Erro ao abrir/criar banco de dados:', error);
    }
  }

  // Método para adicionar cliente
  async addCliente(cliente: Cliente) {
    if (!this.db) {
      throw new Error('Database is not opened.');
    }
    try {
      await this.db.run('INSERT INTO clientes (nome, cpf, telefone, email, dataCadastro, expanded) VALUES (?, ?, ?, ?, ?, ?)', [
        cliente.nome,
        cliente.cpf,
        cliente.telefone,
        cliente.email,
        cliente.dataCadastro,
        cliente.expanded ? 1 : 0
      ]);
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
    }
  }

  // Método para obter clientes
  async getClientes(): Promise<Cliente[]> {
    if (!this.db) {
      throw new Error('Database is not opened.');
    }
    try {
      const result = await this.db.query('SELECT * FROM clientes');
      if (result.values) {
        return result.values.map((row: { id: number; nome: string; cpf: string; telefone: string; email: string; dataCadastro: string; expanded: number }) => ({
          id: row.id,
          nome: row.nome,
          cpf: row.cpf,
          telefone: row.telefone,
          email: row.email,
          dataCadastro: row.dataCadastro,
          expanded: row.expanded === 1
        }));
      }
      return [];
    } catch (error) {
      console.error('Erro ao obter clientes:', error);
      return [];
    }
  }

  // Método para fechar o banco de dados
  async closeDatabase() {
    if (this.db) {
      try {
        await this.sqlite.closeConnection('clientesDB', false);
        this.db = null;
      } catch (error) {
        console.error('Erro ao fechar banco de dados:', error);
      }
    }
  }

  // Outros métodos CRUD (updateCliente, deleteCliente)
}
