import { LogEntity, LogSeverityLevel } from '../../src/domain/entities/log.entity'


describe('LogEntity', () => {
    const logData = {
        message: 'Hola mundo',
        level: LogSeverityLevel.high,
        origin: 'log.entity.test.ts'
    }

    test('should create a LogEntity instance', () => {
        const log = new LogEntity(logData)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(logData.message)
        expect(log.level).toBe(logData.level)
        expect(log.origin).toBe(logData.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })
})