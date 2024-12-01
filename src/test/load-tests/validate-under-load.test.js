import request from 'supertest';
import app from '../../server';

describe('Validate Application Under Load', () => {
  it('should validate responses for user login and dashboard', async () => {
    // 1. Hacer login para obtener el token
    const response = await request(app)
      .post('/api/users/login')
      .send({ username: 'Richard', password: '$2b$10$8rDjwbBEF9x/Q0JTWCn/OumC37hi7c.5iNtl447VTtVIv.23Rh3yu' });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Login successful');
    
    // 2. Obtener el token de la respuesta
    const token = response.body.token;

    // 3. Usar el token para acceder a rutas protegidas (Dashboard)
    const dashboardResponse = await request(app)
      .get('/api/dashboard')
      .set('Authorization', `Bearer ${token}`); // Enviar el token en la cabecera
    expect(dashboardResponse.statusCode).toBe(200);
    expect(dashboardResponse.text).toContain('Bienvenido');
  });

  it('should validate admin actions', async () => {
    // 4. Hacer login como admin para obtener el token
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({ username: '123', password: '$2b$10$XJp.uz/5srS.uqvoF0c9T.FkOaua9GpC/fbH8RIau8gaCxOi5qAq2' });
    expect(loginResponse.statusCode).toBe(200); // El login debe ser exitoso
    expect(response.body.message).toBe('Username o password incorrectos');

    
    // 5. Obtener el token de la respuesta del admin
    const token = loginResponse.body.token;

    // 6. Usar el token para acceder a rutas protegidas para el admin (Dashboard)
    const adminDashboardResponse = await request(app)
      .get('/api/admin/dashboard')
      .set('Authorization', `Bearer ${token}`); // Enviar el token en la cabecera
    expect(adminDashboardResponse.statusCode).toBe(200);
    expect(adminDashboardResponse.text).toContain('Bienvenido al panel de administrador');
  });
});
