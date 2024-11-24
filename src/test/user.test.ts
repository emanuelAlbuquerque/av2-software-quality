import request from 'supertest'
import { AppServer } from '../main/app'
import { execSync } from 'child_process'

let app: AppServer

beforeAll(async () => {
    app = new AppServer()
    await app.start("test")

    execSync('npm run docker-test:up', { stdio: 'inherit' })
    execSync('npm run migration-test:up', { stdio: 'inherit' })
})

afterAll((done) => {
    execSync('npm run migration-test:revert', { stdio: 'inherit' })
    execSync('npm run clean:migrations-test', { stdio: 'inherit' })
    execSync('npm run docker-test:down', { stdio: 'inherit' })
    done()
})

describe('Testes de Unidade', () => {
    it('Deve aceitar cadastro com dados válidos', async () => {
        const response = await request(app.getApp())
            .post('/createUser')
            .send({
                email: 'teste@gmail.com',
                password: '1234567w',
                name: 'Testando Usuário'
            })

        expect(response.status).toBe(201)
        expect(response.body.user).not.toBeNull()
        expect(response.body.error).toBeNull()
    })

    it('Não deve aceitar cadastro com nome vazio', async () => {
        const response = await request(app.getApp())
            .post('/createUser')
            .send({
                email: 'testenome@gmail.com',
                password: 'jabsfukakl123x',
                name: ''
            })

        expect(response.status).toBe(422)
        expect(response.body.user).toBeNull()
        expect(response.body.error.message).toBe('O nome é obrigatório.')
    })

    it('Não deve aceitar cadastro com nome maior que 255 caracteres', async () => {
        const response = await request(app.getApp())
            .post('/createUser')
            .send({
                email: 'testenome@gmail.com',
                password: 'jabsfukakl123x',
                name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            })

        expect(response.status).toBe(422)
        expect(response.body.user).toBeNull()
        expect(response.body.error.message).toBe('O Nome ultrapassou o limite de 255 caracteres.')
    })

    it('Não deve aceitar cadastro com email duplicado', async () => {
        const response = await request(app.getApp())
            .post('/createUser')
            .send({
                email: 'teste@gmail.com',
                password: 'SenhaNova123',
                name: 'Testando Usuário Repetido'
            })

        expect(response.status).toBe(422)
        expect(response.body.user).toBeNull()
        expect(response.body.error.message).toBe('Este E-mail já está em uso por outro usuário.')
    })

    it('Não deve aceitar cadastro com email vazio', async () => {
        const response = await request(app.getApp())
            .post('/createUser')
            .send({
                email: '',
                password: 'SenhaNova123',
                name: 'Testando Usuário Repetido'
            })

        expect(response.status).toBe(422)
        expect(response.body.user).toBeNull()
        expect(response.body.error.message).toBe('O E-mail é obrigatório.')
    })

    it('Não deve aceitar cadastro com e-mail inválido', async () => {
        const response = await request(app.getApp())
            .post('/createUser')
            .send({
                email: 'invalid-email',
                password: 'SenhaValida123',
                name: 'Usuário Com E-mail Inválido'
            })

        expect(response.status).toBe(422)
        expect(response.body.user).toBeNull()
        expect(response.body.error.message).toBe('Insira um e-mail válido.')
    })

    it('Não deve aceitar cadastro com senha vazia.', async () => {
        const response = await request(app.getApp())
            .post('/createUser')
            .send({
                email: 'senha_curta@gmail.com',
                password: '',
                name: 'Usuário Com Senha Curta'
            })

        expect(response.status).toBe(422)
        expect(response.body.user).toBeNull()
        expect(response.body.error.message).toBe('A senha é obrigatória.')
    })

    it('Não deve aceitar cadastro com senha menor que 8 caracteres', async () => {
        const response = await request(app.getApp())
            .post('/createUser')
            .send({
                email: 'senha_curta@gmail.com',
                password: '12345',
                name: 'Usuário Com Senha Curta'
            })

        expect(response.status).toBe(422)
        expect(response.body.user).toBeNull()
        expect(response.body.error.message).toBe('A senha precisa ter pelo menos 8 caracteres.')
    })

    it('Não deve aceitar cadastro com senha sem número', async () => {
        const response = await request(app.getApp())
            .post('/createUser')
            .send({
                email: 'senha_sem_numero@gmail.com',
                password: 'abcdefgh',
                name: 'Usuário Sem Número'
            })

        expect(response.status).toBe(422)
        expect(response.body.user).toBeNull()
        expect(response.body.error.message).toBe('A senha deve incluir pelo menos um número.')
    })

    it('Deve realizar login com credenciais corretas', async () => {
        const response = await request(app.getApp())
            .post('/signIn')
            .send({
                email: 'teste@gmail.com',
                password: '1234567w'
            })

        expect(response.status).toBe(201)
        expect(response.body.token).not.toBeNull()
        expect(response.body.error).toBeNull()
    })

    it('Não deve permitir login com credenciais incorretas', async () => {
        const response = await request(app.getApp())
            .post('/signIn')
            .send({
                email: 'usuario@teste.com',
                password: 'senhaErrada123'
            })

        expect(response.status).toBe(422)
        expect(response.body.token).toBeNull()
        expect(response.body.error.message).toBe('Credenciais inválidas.')
    })
})

describe('Testes de Exceção', () => {
    it('Deve retornar uma mensagem se erro que seja compreensivel quando der algum erro de servidor.', async () => {
        const response = await request(app.getApp()).get('/exception')

        expect(response.status).toBe(500)
        expect(response.body.error.message).toMatch(/^Erro Interno do Servidor - /)
    })
})