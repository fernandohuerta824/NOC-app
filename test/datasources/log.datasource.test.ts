import { LogDatasource } from '../../src/domain/datasources/log.datasource'
import { LogSeverityLevel, LogEntity } from '../../src/domain/entities/log.entity'

describe('log.datasource.ts', () => {
    const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'test message',
        origin: 'log.datasource.test'
    })

    class MockLogDatasource implements LogDatasource  {
        
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [log]
        }

        async saveLog(log: LogEntity): Promise<LogEntity> {
            return log
        }
    }

    test('should test the abstract class', () => {
        const logDataSource = new MockLogDatasource()

        expect(logDataSource).toBeInstanceOf(MockLogDatasource)
        expect(typeof logDataSource.saveLog).toBe('function')
        expect(typeof logDataSource.getLogs).toBe('function')
    })
})