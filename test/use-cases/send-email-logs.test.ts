import { LogEntity } from '../../src/domain/entities/log.entity'
import { SendEmailLogs } from '../../src/domain/use-cases/email/send-email-logs'
import { EmailService } from '../../src/presentation/email/email.service'

describe('SendEmailLogs use case', () => {

    const mockEmailService = {
        sendEmail: jest.fn(),
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const sendEmail = new SendEmailLogs(
        mockEmailService as any,
        mockRepository
    )
    test('should return true if the email is sent', async () => {

        const result = await sendEmail.execute('fernando@correo.com')

        expect(result).toBeTruthy()
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith('fernando@correo.com')
    })

    test('should return false if the email is sent', async () => {
        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false)

        const result = await sendEmail.execute('fernando@correo.com')

        expect(result).toBeFalsy()
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith('fernando@correo.com')
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })
})