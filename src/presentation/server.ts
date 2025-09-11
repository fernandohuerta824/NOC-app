import { CheckService } from "../domain/use-cases/checks/check-service"
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs"
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository"
import { CronService } from "./cron/cron.service"
import { EmailService } from "./email/email.service"

const datasource = new FileSystemDataSource()
const fileRepository = new LogRepositoryImpl(datasource)
const emailService = new EmailService()

export class Server {
    static start() {
        console.log('Server started...')
        new SendEmailLogs(emailService, fileRepository).execute('fernandohuerta824@gmail.com')
        const url = 'http://localhost:3000/posts'
        const success = () => console.log(`${url} is ok`)
        const error = (error: string) => console.log(error)
        const task = () => {
            new CheckService(
                fileRepository,
                success,
                error
            ).execute(url)
        }
        CronService.createJob(
            '* * * * * *',
            task
        )
    }
}