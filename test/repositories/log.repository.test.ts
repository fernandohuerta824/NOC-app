import { LogEntity, LogSeverityLevel } from '../../src/domain/entities/log.entity'
import { LogRepositoryImpl } from '../../src/infrastructure/repositories/log.repository'

describe('LogRepositoryImpl', () => {

    const mockDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    test('should call datasource.saveLog', () => {
        const logEntity = new LogEntity({
            level: LogSeverityLevel.low,
            origin: 'anywhere',
            message: 'test'
        })

        const repository = new LogRepositoryImpl(mockDatasource)

        repository.saveLog(logEntity)

        expect(mockDatasource.saveLog).toHaveBeenCalledWith(logEntity)
    })

    test('should call datasource.getLogs', () => {
        const repository = new LogRepositoryImpl(mockDatasource)

        repository.getLogs(LogSeverityLevel.high)

        expect(mockDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.high)
    })
})