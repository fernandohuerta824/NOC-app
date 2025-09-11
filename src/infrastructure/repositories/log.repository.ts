import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
    constructor(
        private readonly logDatasource: LogDatasource
    ) {
    }

    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel)
    }
    
    async saveLog(log: LogEntity): Promise<void> {
        await this.logDatasource.saveLog(log)
    }
}