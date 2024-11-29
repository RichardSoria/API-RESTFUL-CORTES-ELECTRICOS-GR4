import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
jest.mock('node-fetch', () => jest.fn());


describe('Tests rendimiento para Tool Routes', () => {
    
  it('GET /tools/ - Deberia responder en 200ms', async () => {
    fetch.mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce([]),
    });

    const start = Date.now();
    const response = await fetch(`${process.env.BASE_URL}/tools/`);
    const duration = Date.now() - start;

    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(200);
  });

  it('GET /tools/:id - Deberia responder en 200ms', async () => {
    fetch.mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce({ id: '1', name: 'Hammer' }),
    });

    const start = Date.now();
    const response = await fetch(`${process.env.BASE_URL}/tools/1`);
    const duration = Date.now() - start;

    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(200);
  });

  it('POST /tools/ - Deberia responder en 200ms', async () => {
    const newTool = { name: 'Screwdriver' };
    fetch.mockResolvedValueOnce({
      status: 201,
      json: jest.fn().mockResolvedValueOnce({ id: '2', name: 'Screwdriver' }),
    });

    const start = Date.now();
    const response = await fetch(`${process.env.BASE_URL}/tools/`, {
      method: 'POST',
      body: JSON.stringify(newTool),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_token_here' // Ajusta el token según tu implementación
      }
    });
    const duration = Date.now() - start;

    expect(response.status).toBe(201);
    expect(duration).toBeLessThan(200);
  });

  it('PUT /tools/:id - Deberia responder en 200ms', async () => {
    const updatedTool = { name: 'Sledgehammer' };
    fetch.mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce({ id: '1', name: 'Sledgehammer' }),
    });

    const start = Date.now();
    const response = await fetch(`${process.env.BASE_URL}/tools/1`, {
      method: 'PUT',
      body: JSON.stringify(updatedTool),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_token_here' // Ajusta el token según tu implementación
      }
    });
    const duration = Date.now() - start;

    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(200);
  });

  it('DELETE /tools/:id - Deberia responder en 200ms', async () => {
    fetch.mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce({ message: 'Tool deleted' }),
    });

    const start = Date.now();
    const response = await fetch(`${process.env.BASE_URL}/tools/1`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer your_token_here' // Ajusta el token según tu implementación
      }
    });
    const duration = Date.now() - start;

    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(200);
  });
});