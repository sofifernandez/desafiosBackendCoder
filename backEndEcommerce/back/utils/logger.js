import winston from 'winston';


const logger = new winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({
            name: 'warn-file',
            filename: 'warn.log',
            level: 'warn',
            levelOnly: true 
        }),
        new winston.transports.File({
            name: 'error-file',
            filename: 'error.log',
            level: 'error',
            levelOnly: true 
        }),
    ]
 });

 export default logger;