import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDatasource {
    abstract saveLog(log: LogEntity): Promise<LogEntity>
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>
}