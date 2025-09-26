import { EmailService, SendMailOptions } from '../../src/presentation/email/email.service'
import nodemailer from 'nodemailer'

describe('EmailService', () => {

    const mockSendMail = jest.fn()

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })

    const emailService = new EmailService()
    test('should send email', async () => {

        const options: SendMailOptions = {
            to: 'fernando@correo.com',
            subject: 'test',
            htmlBody: '<h1>Test</h1>'
        }

        await emailService.sendEmail(options)

        expect(mockSendMail).toHaveBeenCalledWith({
            "attachments": [],
            "html": "<h1>Test</h1>",
            "subject": "test",
            "to": "fernando@correo.com",
        })
    })

    test('should send email with attachments', async () => {
        await emailService.sendEmailWithFileSystemLogs('fernando@correo.com')

        

    })
})