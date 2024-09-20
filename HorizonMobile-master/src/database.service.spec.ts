import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Cliente } from './cliente';

// Mock do SQLiteConnection
class MockSQLiteConnection {
  private clients: Cliente[] = [];
  private db: any = {
    open: () => Promise.resolve(),
    execute: () => Promise.resolve(),
    run: (sql: string, params: any[]) => {
      if (sql.includes('INSERT INTO clientes')) {
        this.clients.push({
          id: this.clients.length + 1, // Simulação do auto incremento
          nome: params[0],
          cpf: params[1],
          telefone: params[2],
          email: params[3],
          dataCadastro: params[4],
          expanded: params[5] === 1
        });
      }
      return Promise.resolve();
    },
    query: (sql: string) => {
      if (sql.includes('SELECT * FROM clientes')) {
        return Promise.resolve({ values: this.clients });
      }
      return Promise.resolve({ values: [] });
    },
    closeConnection: () => Promise.resolve()
  };

  createConnection() {
    return Promise.resolve(this.db);
  }
}

describe('DatabaseService', () => {
  let service: DatabaseService;
  let mockSQLite: MockSQLiteConnection;

  beforeEach(() => {
    mockSQLite = new MockSQLiteConnection();

    TestBed.configureTestingModule({
      providers: [
        DatabaseService,
        { provide: SQLiteConnection, useValue: mockSQLite }
      ]
    });
    service = TestBed.inject(DatabaseService);
  });

  it('should add and retrieve a client', async () => {
    await service.openDatabase();

    const cliente: Cliente = {
      id: 0, // Não usado no teste
      nome: 'John Doe',
      cpf: '12345678900',
      telefone: '123456789',
      email: 'john.doe@example.com',
      dataCadastro: '2024-09-19',
      expanded: false
    };

    await service.addCliente(cliente);

    const clientes = await service.getClientes();

    expect(clientes.length).toBeGreaterThan(0); // Verifica se há clientes retornados
    expect(clientes[0]).toEqual(jasmine.objectContaining({
      nome: 'John Doe',
      cpf: '12345678900',
      telefone: '123456789',
      email: 'john.doe@example.com',
      dataCadastro: '2024-09-19',
      expanded: false
    }));
  });

  afterEach(async () => {
    await service.closeDatabase();
  });
});
