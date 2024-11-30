import request from 'supertest';
import express from 'express';
import router from '../routers/user_routes.js';
import { registerUserController, loginUserController } from '../controllers/user_controller.js';

jest.mock('node-fetch', () => jest.fn());

jest.mock('../controllers/user_controller.js', () => ({
    registerUserController: jest.fn(),
    loginUserController: jest.fn(),
}));

describe('user_routes', () => {
    const app = express();
    app.use(express.json()); // Middleware necesario para analizar JSON
    app.use(router); // Montamos el router en la app de prueba

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /users/register', () => {
        it('debe invocar registerUserController al registrar un usuario', async () => {
            const mockResponse = { id: 'mockId', username: 'testuser' };
            registerUserController.mockImplementation((req, res) => res.status(200).json(mockResponse));

            const res = await request(app)
                .post('/users/register')
                .send({ username: 'testuser', password: 'password123' });

            expect(registerUserController).toHaveBeenCalled();
            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockResponse);
        });

        it('debe devolver un error si registerUserController falla', async () => {
            registerUserController.mockImplementation((req, res) => 
                res.status(500).json({ message: 'Error al registrar usuario' })
            );

            const res = await request(app)
                .post('/users/register')
                .send({ username: 'testuser', password: 'password123' });

            expect(registerUserController).toHaveBeenCalled();
            expect(res.status).toBe(500);
            expect(res.body).toEqual({ message: 'Error al registrar usuario' });
        });
    });

    describe('POST /users/login', () => {
        it('debe invocar loginUserController al iniciar sesión', async () => {
            const mockResponse = { user: { id: 'mockId', username: 'testuser' }, token: 'mockToken' };
            loginUserController.mockImplementation((req, res) => res.status(200).json(mockResponse));

            const res = await request(app)
                .post('/users/login')
                .send({ username: 'testuser', password: 'password123' });

            expect(loginUserController).toHaveBeenCalled();
            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockResponse);
        });

        it('debe devolver un error si loginUserController falla', async () => {
            loginUserController.mockImplementation((req, res) => 
                res.status(401).json({ message: 'Username o password incorrectos' })
            );

            const res = await request(app)
                .post('/users/login')
                .send({ username: 'testuser', password: 'wrongpassword' });

            expect(loginUserController).toHaveBeenCalled();
            expect(res.status).toBe(401);
            expect(res.body).toEqual({ message: 'Username o password incorrectos' });
        });
    });
});
