import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface ICheckServiceMultiple  {
    execute(url: string): Promise<boolean>
}

type SuccessCallBack = () => void
type ErrorCallBack = (error: string) => void

export class CheckServiceMultiple implements ICheckServiceMultiple  {
    constructor(
        private readonly logRepostory: LogRepository[],
        private readonly successCallBack: SuccessCallBack,
        private readonly errorCallBack: ErrorCallBack,
    ) {

    }

    private callLogs(log: LogEntity) {
        this.logRepostory.forEach(logRepository => logRepository.saveLog(log))
    }

    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url)

            if(!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }

            const log = new LogEntity({
                message: `Service ${url} is working`, 
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
           })
            this.callLogs(log)
            this.successCallBack()

        } catch (error) {
            const errorMessage = `${error}`
            const log = new LogEntity({
                message: `Service ${url} is not working: ${errorMessage}`, 
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'

            })
            this.callLogs(log)
            this.errorCallBack(errorMessage)
            return false
        }

        return true
    }
}