import userModel from '../models/user.js';
import bcrypt from 'bcrypt';
import fetch from 'node-fetch';
import fs from 'fs';
jest.mock('fs');
jest.mock('node-fetch', () => jest.fn());
jest.mock('bcrypt', () => ({
    compare: jest.fn(),
}));

describe('User Model', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        fs.writeFileSync.mockClear();
        fs.readFileSync.mockClear();
    });

    it('Registra un nuevo usuario', async () => {
        const newUser = { username: 'testuser', password: 'password123' };
        const mockResponse = { userId: '1', username: 'testuser' };

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await userModel.registerUserModel(newUser);

        expect(fetch).toHaveBeenCalledWith("http://localhost:4000/users", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { 'Content-Type': "application/json" },
        });
        expect(result).toEqual(mockResponse);
    });

    it('Inicia sesión correctamente', async () => {
        const mockUsers = [
            { username: 'testuser', password: 'hashedpassword' },
        ];
        const username = 'testuser';
        const password = 'password123';

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockUsers),
        });
        bcrypt.compare.mockResolvedValueOnce(true);

        const result = await userModel.loginUserModel(username, password);

        expect(fetch).toHaveBeenCalledWith("http://localhost:4000/users");
        expect(bcrypt.compare).toHaveBeenCalledWith(password, 'hashedpassword');
        expect(result).toEqual(mockUsers[0]);
    });

    it('Falla al iniciar sesión con username incorrecto', async () => {
        const mockUsers = [
            { username: 'testuser', password: 'hashedpassword' },
        ];
        const username = 'wronguser';
        const password = 'password123';

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockUsers),
        });

        const result = await userModel.loginUserModel(username, password);

        expect(fetch).toHaveBeenCalledWith("http://localhost:4000/users");
        expect(result).toEqual({ error: "Username o password incorrectos" });
    });

    it('Falla al iniciar sesión con password incorrecto', async () => {
        const mockUsers = [
            { username: 'testuser', password: 'hashedpassword' },
        ];
        const username = 'testuser';
        const password = 'wrongpassword';

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockUsers),
        });
        bcrypt.compare.mockResolvedValueOnce(false);

        const result = await userModel.loginUserModel(username, password);

        expect(fetch).toHaveBeenCalledWith("http://localhost:4000/users");
        expect(bcrypt.compare).toHaveBeenCalledWith(password, 'hashedpassword');
        expect(result).toEqual({ error: "Username o password incorrectos" });
    });
});
