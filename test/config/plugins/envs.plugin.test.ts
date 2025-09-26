import { envs } from '../plugins/../../../src/config/plugins/envs.plugin'

describe("envs.plugin.ts", () => {
    test('should return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_EMAIL: 'fernando.huerta4313@alumnos.udg.mx',
            MAIL_SERVICE: 'gmail',
            MAILER_SECRET_KEY: 'kpzzadsjenwwchii',
            PROD: false,
            MONGO_URL: 'mongodb://fernando:test@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'fernando',
            MONGO_PASS: 'test'
        })
    })


    test("should return error if not found env", async () => {
        jest.resetModules()
        process.env.PORT = 'fdw'

        try {
            await import('../plugins/../../../src/config/plugins/envs.plugin')
            expect(true).toBe(false)
        } catch(error) {
            expect(`${error}`).toContain('EnvVarError: env-var: \"PORT\" should be a valid integer')
        }
    })

})