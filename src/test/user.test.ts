import request from 'supertest'
import { AppServer } from '../main/app'

let app: AppServer

beforeAll(async () => {
    app = new AppServer()
    await app.start()
})

afterAll((done) => {
    done()
})

describe('Testes de Unidade', () => {
    const validCredentials = [
        ['emanuelalbuquerque16@gmail.com', '12345678m'],
        ['outroemail@gmail.com', 'senhaValida123'],
        ['emailteste@example.com', 'senhaTeste456']
    ];

    test.each(validCredentials)('Teste de login com dados válidos - %s', async (email, password) => {
        const response = await request(app.getApp()).post('/signIn').send({ email, password });

        expect(response.status).toBe(201)
        expect(response.body.token).not.toBeNull()
        expect(response.body.error).toBeNull()
        
    })
})