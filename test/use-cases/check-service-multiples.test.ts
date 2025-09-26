import { LogEntity } from '../../src/domain/entities/log.entity'
import { CheckServiceMultiple } from './../../src/domain/use-cases/checks/check-service-multiple'

describe('CheckService use case',() => {

    const mockRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }


    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCb = jest.fn()
    const errorCb = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should call successCallback when fetch returns true', async () => {
        const checkService = new CheckServiceMultiple(
            [mockRepository1, mockRepository2],
            successCb,
            errorCb
        )

        const wasOk = await checkService.execute('https://google.com')

        expect(wasOk).toBeTruthy()

        expect(successCb).toHaveBeenCalled()

        expect(errorCb).not.toHaveBeenCalled()

        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })

        test('should call errorCallback when fetch returns false', async () => {
        const checkService = new CheckServiceMultiple(
            [mockRepository1, mockRepository2],
            successCb,
            errorCb
        )

        const wasOk = await checkService.execute('https://goo322gle.com')

        expect(wasOk).toBeFalsy()

        expect(successCb).not.toHaveBeenCalled()

        expect(errorCb).toHaveBeenCalled()

        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    })
})