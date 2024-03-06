import winston, { format } from "winston";
const { combine, timestamp, label, prettyPrint } = format;

const logger = winston.createLogger({
    level: "info",
    format: combine(
        label({ label: "right meow!" }),
        timestamp(),
        prettyPrint()
    ),
    defaultMeta: { service: "system" },
    transports: [new winston.transports.Console()]
});

export default logger;
