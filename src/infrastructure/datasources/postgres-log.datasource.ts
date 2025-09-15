import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";
import { Prisma, PrismaClient, SeverityLevel } from "../../generated/prisma";

export class PostgresLogDataSource implements LogDatasource {
    private readonly client = new PrismaClient()

    async getLogs(severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
        const level = severityLevel.toUpperCase()
        
        const logs = await this.client.logModel.findMany({
            where: {
                level: level as Prisma.EnumSeverityLevelFilter,

            }
        })

        return logs
    }

    async saveLog(log: LogEntity): Promise<LogEntity> {
        const level = log.level.toUpperCase() as SeverityLevel

        const savedLog = await this.client.logModel.create({
            data: {
                level,
                message: log.message,
                origin: log.origin,
                createdAt: log.createdAt
            }
        })
        
        return savedLog
    }
}