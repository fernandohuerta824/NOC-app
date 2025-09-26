import { createTransport } from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogRepository } from '../../domain/repository/log.repository'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

export interface Attachment {
    filename: string,
    path: string
}

export interface SendMailOptions {
    to: string | string []
    subject: string
    htmlBody: string
    attachments?: Attachment[]
}

export class EmailService {
    private transporter = createTransport({
        service: envs.MAIL_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor(
        
    ) {

    }

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { htmlBody, subject, to, attachments = [] } = options

        try {
            const sentInformacion = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            })


            return true
        } catch (error) {

            return false
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {

        const subject = 'Logs from server'
        const htmlBody = `
            <h1>Logs from the system</h1>
            <p>Here is the logs that have been registered today, please check them out</p>
            <p>See attachment logs</p>
        `
        const attachments: Attachment[] = [
            { filename: 'logs.all.log', path: './logs/logs-all.log' },
            { filename: 'logs.medium.log', path: './logs/logs-medium.log' },
            { filename: 'logs.high.log', path: './logs/logs-high.log' },
        ]
    
        return await this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        })
    
    
    }
}