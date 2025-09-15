import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogRepository{
    abstract saveLog(log: LogEntity): Promise<LogEntity>
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>
}