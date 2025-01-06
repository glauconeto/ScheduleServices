// api_gateway/src/tests/gateway.test.js
describe('API Gateway Tests', () => {
    describe('Authentication Middleware', () => {
      it('deve permitir requisição com token válido', async () => {
        const response = await request(app)
          .get('/api/protected-route')
          .set('Authorization', `Bearer ${validToken}`);
  
        expect(response.status).toBe(200);
      });
  
      it('deve bloquear requisição sem token', async () => {
        const response = await request(app)
          .get('/api/protected-route');
  
        expect(response.status).toBe(401);
      });
  
      it('deve bloquear requisição com token inválido', async () => {
        const response = await request(app)
          .get('/api/protected-route')
          .set('Authorization', 'Bearer invalid-token');
  
        expect(response.status).toBe(401);
      });
    });
  
    describe('Route Forwarding', () => {
      it('deve encaminhar requisições para o serviço correto', async () => {
        const response = await request(app)
          .get('/api/schedules')
          .set('Authorization', `Bearer ${validToken}`);
  
        expect(response.status).toBe(200);
      });
  
      it('deve lidar com erros de serviço indisponível', async () => {
        // Simular serviço offline
        const response = await request(app)
          .get('/api/unavailable-service')
          .set('Authorization', `Bearer ${validToken}`);
  
        expect(response.status).toBe(503);
      });
    });
  });