import toolModel from '../models/tools.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
jest.mock('node-fetch', () => jest.fn());

describe('Tool Model', () => {

  it('Trae todas las herramientas', async () => {
    const mockData = [{ toolId: '1', name: 'Hammer' }];
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const tools = await toolModel.getAllToolsModel();
    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/tools");
    expect(tools).toEqual(mockData);
  });

  it('Trae la herramientas segun ID', async () => {
    const mockData = { toolId: '1', name: 'Hammer' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const tool = await toolModel.getToolByIDModel('1');
    expect(fetch).toHaveBeenCalledWith(`http://localhost:4000/tools/1`);
    expect(tool).toEqual(mockData);
  });

  it('Funciona en caso de no encontrar', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    const tool = await toolModel.getToolByIDModel('99');
    expect(tool).toEqual({ error: 'Herramienta o insumo no encontrado' });
  });

  it('Crear una nueva herramienta', async () => {
    const newTool = { name: 'Screwdriver' };
    const mockResponse = { toolId: '2', name: 'Screwdriver' };
    
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await toolModel.createToolModel(newTool);

    expect(fetch).toHaveBeenCalledWith("http://localhost:4000/tools",
      {
        method: 'POST',
        body: JSON.stringify(newTool),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it('Actualiza una herramienta', async () => {
    const updatedTool = { name: 'Sledgehammer' };
    const mockResponse = { toolId: '1', name: 'Sledgehammer' };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await toolModel.updateToolModel('1', updatedTool);

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:4000/tools/1`,
      {
        method: 'PUT',
        body: JSON.stringify(updatedTool),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it('Elimina una herramienta', async () => {
    const mockResponse = { message: 'Tool deleted' };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await toolModel.deleteToolModel('1');

    expect(fetch).toHaveBeenCalledWith(
     `http://localhost:4000/tools/1`,
      { method: 'DELETE' }
    );
    expect(result).toEqual(mockResponse);
  });
});