import fs from 'fs'
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDatasource {

    private readonly logPath = 'logs/'
    private readonly pathFiles = {
        all: 'logs/logs-all.log',
        medium: 'logs/logs-medium.log',
        high: 'logs/logs-high.log'
    }

    constructor() {
        this.createLogsFiles()
    }

    private createLogsFiles = () => {
        if(!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath)
        } 

        const paths = Object.values(this.pathFiles)

        paths.forEach(p => {
            if(!fs.existsSync(p)) {
                fs.writeFileSync(p, '')
            }
        })
    }

    private retriveLogsFromFile = (path: string): LogEntity[] => {
        const logsFile = fs.readFileSync(path, 'utf-8')
        const logsString = logsFile.split('\n')
        const size = logsString.length - 1
                
        return logsString.splice(0, size).map(l => LogEntity.fromJSON(l))
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch(severityLevel) {
            case LogSeverityLevel.low: 
                return this.retriveLogsFromFile(this.pathFiles.all)

            case LogSeverityLevel.medium: 
                return this.retriveLogsFromFile(this.pathFiles.medium)

            case LogSeverityLevel.high: 
                return this.retriveLogsFromFile(this.pathFiles.high)

            default:
                return this.retriveLogsFromFile(this.pathFiles.all)
        }
    }

    async saveLog(log: LogEntity): Promise<void> {
        const logAsJSON = `${JSON.stringify(log)}\n`

        fs.appendFileSync(this.pathFiles.all, logAsJSON)

        if(log.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.pathFiles.medium, logAsJSON)
            return
        } 

        if(log.level === LogSeverityLevel.high) {
            fs.appendFileSync(this.pathFiles.high, logAsJSON)
            return
        } 
    }
}
