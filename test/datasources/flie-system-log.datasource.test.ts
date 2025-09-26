import { readdirSync, readFileSync, rmSync } from 'fs'
import { FileSystemDataSource } from '../../src/infrastructure/datasources/file-system.datasource'
import path from 'path'
import { LogEntity, LogSeverityLevel } from '../../src/domain/entities/log.entity'

describe('FileSystemDataSource', () => {

    const logPath = path.join(__dirname, '../../logs')
    console.log(logPath)

    beforeEach(() => {
        rmSync(logPath, { recursive: true, force: true })
    })

    test('should create a log files if they do not exist', async() => {
        new FileSystemDataSource()

        const files = readdirSync(logPath)
        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])
    })

    test('should save a log in all logs file', () => {
        const logDataSource = new FileSystemDataSource()
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system-log.datasource.test.ts'
        })

        logDataSource.saveLog(log)
        const allLogs = readFileSync(`${logPath}/logs-all.log`, 'utf-8')
    
        expect(allLogs).toContain(JSON.stringify(log))
    })

    test('should save a log in all logs file and medium', () => {
        const logDataSource = new FileSystemDataSource()
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system-log.datasource.test.ts'
        })

        logDataSource.saveLog(log)
        const allLogs = readFileSync(`${logPath}/logs-all.log`, 'utf-8')
        const mediumLogs = readFileSync(`${logPath}/logs-medium.log`, 'utf-8')
    
        expect(allLogs).toContain(JSON.stringify(log))
        expect(mediumLogs).toContain(JSON.stringify(log))
    })

        test('should save a log in all logs file and high', () => {
        const logDataSource = new FileSystemDataSource()
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.high,
            origin: 'file-system-log.datasource.test.ts'
        })

        logDataSource.saveLog(log)
        const allLogs = readFileSync(`${logPath}/logs-all.log`, 'utf-8')
        const highLogs = readFileSync(`${logPath}/logs-high.log`, 'utf-8')
    
        expect(allLogs).toContain(JSON.stringify(log))
        expect(highLogs).toContain(JSON.stringify(log))
    })

    test('should return all logs', async () => {
        const logDataSource = new FileSystemDataSource()

        const logLow = new LogEntity({
            message: 'log-low',
            level: LogSeverityLevel.low,
            origin: 'low'
        })

        const logMedium = new LogEntity({
            message: 'log-medium',
            level: LogSeverityLevel.medium,
            origin: 'medium'
        })

        const logHigh = new LogEntity({
            message: 'log-high',
            level: LogSeverityLevel.high,
            origin: 'high'
        })

        await logDataSource.saveLog(logLow)
        await logDataSource.saveLog(logMedium)
        await logDataSource.saveLog(logHigh)

        const logsLow = await logDataSource.getLogs(LogSeverityLevel.low)
        const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium)
        const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high)

        expect([logLow, logMedium, logHigh]).toEqual(logsLow.map(l => ({...l, createdAt: new Date(l.createdAt)})))
        expect([logMedium]).toEqual(logsMedium.map(l => ({...l, createdAt: new Date(l.createdAt)})))
        expect([logHigh]).toEqual(logsHigh.map(l => ({...l, createdAt: new Date(l.createdAt)})))
    })
})