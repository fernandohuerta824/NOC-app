import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface ICheckService {
    execute(url: string): Promise<boolean>
}

type SuccessCallBack = () => void
type ErrorCallBack = (error: string) => void

export class CheckService implements ICheckService {
    constructor(
        private readonly logRepostory: LogRepository,
        private readonly successCallBack: SuccessCallBack,
        private readonly errorCallBack: ErrorCallBack,
    ) {

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
            this.logRepostory.saveLog(log)
            this.successCallBack()

        } catch (error) {
            const errorMessage = `${error}`
            const log = new LogEntity({
                message: `Service ${url} is not working: ${errorMessage}`, 
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'

            })
            this.logRepostory.saveLog(log)
            this.errorCallBack(errorMessage)
            return false
        }

        return true
    }
}