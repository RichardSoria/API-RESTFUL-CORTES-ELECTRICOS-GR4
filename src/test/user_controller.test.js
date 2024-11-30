import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import userModel from '../models/user.js';
import { createToken } from '../middlewares/auth.js';
import { registerUserController, loginUserController } from '../controllers/user_controller.js';

jest.mock('node-fetch', () => jest.fn());

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
}));
jest.mock('uuid', () => ({
    v4: jest.fn(),
}));
jest.mock('../models/user.js', () => ({
    registerUserModel: jest.fn(),
    loginUserModel: jest.fn(),
}));
jest.mock('../middlewares/auth.js', () => ({
    createToken: jest.fn(),
}));

describe('users_controller', () => {
    const mockRequest = (body) => ({ body });
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('registerUserController', () => {
        it('debe registrar un nuevo usuario correctamente', async () => {
            const req = mockRequest({ username: 'testuser', password: 'password123' });
            const res = mockResponse();
            const hashedPassword = 'hashedPassword';
            const userId = 'mockId';
            const user = { id: userId, username: 'testuser' };

            bcrypt.hash.mockResolvedValueOnce(hashedPassword);
            uuidv4.mockReturnValueOnce(userId);
            userModel.registerUserModel.mockResolvedValueOnce(user);

            await registerUserController(req, res);

            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
            expect(uuidv4).toHaveBeenCalled();
            expect(userModel.registerUserModel).toHaveBeenCalledWith({
                id: userId,
                password: hashedPassword,
                username: 'testuser',
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(user);
        });

        it('debe manejar errores correctamente', async () => {
            const req = mockRequest({ username: 'testuser', password: 'password123' });
            const res = mockResponse();
            const errorMessage = 'Error de base de datos';

            bcrypt.hash.mockRejectedValueOnce(new Error(errorMessage));

            await registerUserController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error al registrar usuario',
                error: errorMessage,
            });
        });
    });

    describe('loginUserController', () => {
        it('debe iniciar sesión correctamente y devolver un token', async () => {
            const req = mockRequest({ username: 'testuser', password: 'password123' });
            const res = mockResponse();
            const user = { id: 'mockId', username: 'testuser', password: 'hashedpassword' };
            const token = 'mockToken';

            userModel.loginUserModel.mockResolvedValueOnce(user);
            createToken.mockReturnValueOnce(token);

            await loginUserController(req, res);

            expect(userModel.loginUserModel).toHaveBeenCalledWith('testuser', 'password123');
            expect(createToken).toHaveBeenCalledWith({ id: 'mockId', username: 'testuser' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ user, token });
        });

        it('debe manejar errores de autenticación', async () => {
            const req = mockRequest({ username: 'wronguser', password: 'password123' });
            const res = mockResponse();

            userModel.loginUserModel.mockResolvedValueOnce({ error: 'Username o password incorrectos' });

            await loginUserController(req, res);

            expect(userModel.loginUserModel).toHaveBeenCalledWith('wronguser', 'password123');
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Username o password incorrectos' });
        });

        it('debe manejar errores inesperados correctamente', async () => {
            const req = mockRequest({ username: 'testuser', password: 'password123' });
            const res = mockResponse();
            const errorMessage = 'Error inesperado';

            userModel.loginUserModel.mockRejectedValueOnce(new Error(errorMessage));

            await loginUserController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error al iniciar sesión',
                error: errorMessage,
            });
        });
    });
});
