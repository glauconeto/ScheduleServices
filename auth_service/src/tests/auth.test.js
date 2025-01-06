import request from 'supertest';
import app from '../server';
import { connect, connection } from 'mongoose';

describe('Auth Service Tests', () => {
  beforeAll(async () => {
    // Conectar ao banco de teste
    await connect(process.env.MONGODB_TEST_URI);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    // Limpar o banco antes de cada teste
    await connection.dropDatabase();
  });

  describe('POST /auth/register', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('deve retornar erro ao tentar registrar email duplicado', async () => {
      // Primeiro registro
      await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        });

      // Tentativa de registro duplicado
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      // Criar usuário para teste
      await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        });
    });

    it('deve fazer login com sucesso', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('deve retornar erro com credenciais inválidas', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });
});