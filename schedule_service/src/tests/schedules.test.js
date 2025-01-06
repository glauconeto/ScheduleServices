import request from 'supertest';
import app from '../server';

describe('Schedule Service Tests', () => {
  let authToken;
  
  beforeAll(async () => {
    await connect(process.env.MONGODB_TEST_URI);
    // Obter token de autenticação para testes
    const authResponse = await request(authServiceUrl)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    authToken = authResponse.body.token;
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('POST /schedules', () => {
    it('deve criar um novo agendamento', async () => {
      const response = await request(app)
        .post('/schedules')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Consulta Médica',
          date: '2025-02-01T10:00:00',
          description: 'Consulta de rotina'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Consulta Médica');
    });

    it('deve retornar erro ao criar agendamento sem autenticação', async () => {
      const response = await request(app)
        .post('/schedules')
        .send({
          title: 'Consulta Médica',
          date: '2025-02-01T10:00:00',
          description: 'Consulta de rotina'
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /schedules', () => {
    beforeEach(async () => {
      // Criar alguns agendamentos para teste
      await request(app)
        .post('/schedules')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Consulta 1',
          date: '2025-02-01T10:00:00',
          description: 'Teste 1'
        });
    });

    it('deve listar todos os agendamentos do usuário', async () => {
      const response = await request(app)
        .get('/schedules')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});