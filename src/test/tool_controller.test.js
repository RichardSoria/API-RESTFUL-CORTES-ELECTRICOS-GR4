import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

jest.mock('node-fetch', () => jest.fn());

import {
    getAllToolsControllers,
    getToolByIDController,
    createToolController,
    updateToolController,
    deleteToolController,
  } from '../controllers/tool_controller.js';
  
  import toolModel from '../models/tools.js';
  import { v2 as cloudinary } from 'cloudinary';
  import fs from 'fs-extra';
  
  jest.mock('../models/tools.js');
  jest.mock('fs-extra');
  jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mock-uuid'),
  }));
  jest.mock('cloudinary', () => ({
    v2: {
      uploader: {
        upload: jest.fn(),
        destroy: jest.fn(),
      },
    },
  }));
  
  describe('Tool Controller', () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        params: {},
        body: {},
        files: {
          image: {
            tempFilePath: 'mock/temp/path',
          },
        },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.clearAllMocks();
    });
  
    it('Debería traer todas las herramientas', async () => {
      const mockTools = [{ id: '1', name: 'Hammer' }];
      toolModel.getAllToolsModel.mockResolvedValue(mockTools);
  
      await getAllToolsControllers(req, res);
  
      expect(toolModel.getAllToolsModel).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTools);
    });
  
    it('Debería traer una herramienta por ID', async () => {
      req.params.id = '1';
      const mockTool = { id: '1', name: 'Hammer' };
      toolModel.getToolByIDModel.mockResolvedValue(mockTool);
  
      await getToolByIDController(req, res);
  
      expect(toolModel.getToolByIDModel).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTool);
    });
  
    it('Debería manejar error al buscar una herramienta por ID', async () => {
      req.params.id = '99';
      toolModel.getToolByIDModel.mockResolvedValue({ error: 'Not Found' });
  
      await getToolByIDController(req, res);
  
      expect(toolModel.getToolByIDModel).toHaveBeenCalledWith('99');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not Found' });
    });
  
    it('Debería crear una nueva herramienta', async () => {
      const mockTool = { id: 'mock-uuid', name: 'Screwdriver', image: 'mock/url', public_id: 'mock/public/id' };
      req.body = { name: 'Screwdriver' };
      cloudinary.uploader.upload.mockResolvedValue({ url: 'mock/url', public_id: 'mock/public/id' });
      toolModel.createToolModel.mockResolvedValue(mockTool);
  
      await createToolController(req, res);
  
      expect(cloudinary.uploader.upload).toHaveBeenCalledWith('mock/temp/path', { folder: 'tools' });
      expect(toolModel.createToolModel).toHaveBeenCalledWith(mockTool);
      expect(fs.unlink).toHaveBeenCalledWith('mock/temp/path');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockTool);
    });
  
    it('Debería actualizar una herramienta', async () => {
      req.params.id = '1';
      req.body = { name: 'Updated Tool' };
      const mockTool = { id: '1', name: 'Updated Tool' };
      toolModel.updateToolModel.mockResolvedValue(mockTool);
  
      await updateToolController(req, res);
  
      expect(toolModel.updateToolModel).toHaveBeenCalledWith('1', { name: 'Updated Tool' });
      expect(fs.unlink).toHaveBeenCalledWith('mock/temp/path');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTool);
    });
  
    it('Debería eliminar una herramienta', async () => {
      req.params.id = '1';
      const mockTool = { id: '1', public_id: 'mock/public/id' };
      toolModel.getToolByIDModel.mockResolvedValue(mockTool);
      toolModel.deleteToolModel.mockResolvedValue();
  
      await deleteToolController(req, res);
  
      expect(toolModel.getToolByIDModel).toHaveBeenCalledWith('1');
      expect(cloudinary.uploader.destroy).toHaveBeenCalledWith('mock/public/id');
      expect(toolModel.deleteToolModel).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Herramienta o insumo eliminado.' });
    });
  });
  