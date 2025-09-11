import { EmailService } from "../../../presentation/email/email.service"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) {

    }

    async execute (to: string | string[]): Promise<boolean> {
        try {
            const sent = this.emailService.sendEmailWithFileSystemLogs(to)

            if(!sent) {
                throw new Error("Email log was not sent")
            }

            return true
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: "Log could not be sent",
                origin: "send-email.logs.ts"
            })
            this.logRepository.saveLog(log)
            return false
        }
    }
}