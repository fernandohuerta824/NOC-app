export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: string
    message: string
    origin: string
    createdAt?: Date
}

export class LogEntity {
    public level: string
    public message: string
    public createdAt: Date
    public origin: string

    constructor({ 
        level, 
        message, 
        origin, 
        createdAt 
    }: LogEntityOptions) {
        this.message = message
        this.level = level
        this.origin = origin
        this.createdAt = createdAt || new Date()
    }

    static fromJSON (json: string): LogEntity {
        const { level, message, createdAt, origin } = JSON.parse(json)
        if(!level) throw new Error('Level is required')
        if(!message) throw new Error('Message is required')
        if(!origin) throw new Error('Origin is required')

        const log = new LogEntity({ 
            level, 
            message,
            createdAt, 
            origin 
        })

        return log
    }
}