import { LogModel } from "../../data/mongo/models/log.model";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";

export class MongoLogDataSource implements LogDatasource {
    private readonly collection = LogModel

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.collection.find({ level: severityLevel })
    }

    async saveLog(log: LogEntity): Promise<LogEntity> {
        const logModel = await this.collection.insertOne(log)

        return new LogEntity({
            ...logModel
        })
    }
}