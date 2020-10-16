const express = require('express')
const winston = require('winston')
require('winston-daily-rotate-file')
const { transports, } = winston

const infoLogTransport = new transports.DailyRotateFile({
  filename: 'logs/audit-%DATE%.log',
  level: 'info',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
})

const app = express()
const logger = winston.createLogger({
  level: 'info',
  transports: [
    infoLogTransport
  ]
})

app.get('/', (req, res) => {
  res.send('Hello there !!')
  const now = new Date().toISOString()
  logger.info('AUDIT [' + req.connection.remoteAddress  + '] action at: ' + now)
})

app.get('/error', (req, res) => {
  res.send('Error there !!')
  const now = new Date().toISOString()
  logger.error('ERROR [' + req.connection.remoteAddress  + '] action at: ' + now)
})

app.listen(8080, () => {
  console.log('Listening on port 8080 !!!')
})
