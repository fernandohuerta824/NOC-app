import { LogSeverityLevel } from "../domain/entities/log.entity"
import { CheckService } from "../domain/use-cases/checks/check-service"
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple"
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs"
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { MongoLogDataSource } from "../infrastructure/datasources/mongodb-log.datasource"
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository"
import { CronService } from "./cron/cron.service"
import { EmailService } from "./email/email.service"


const fileRepository = new LogRepositoryImpl(new FileSystemDataSource())
const mongoRepository = new LogRepositoryImpl(new MongoLogDataSource())
const postgresRepository = new LogRepositoryImpl(new PostgresLogDataSource())
const emailService = new EmailService()

export class Server {
    static async start() {
        console.log('Server started...')
        
/*         const url = 'http://localhost:3000/posts'
        const success = () => console.log(`${url} is ok at ${new Date().toISOString()}`)
        const error = (error: string) => console.log(error)
        const task = () => {
            new CheckServiceMultiple(
                [fileRepository, mongoRepository, postgresRepository],
                success,
                error
            ).execute(url)
        }
        CronService.createJob(
            '* * * * * *',
            task
        ) */

    }
}