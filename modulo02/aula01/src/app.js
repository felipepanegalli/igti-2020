import express from 'express'
import winston from 'winston'

const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use('/images', express.static('public'))

const {combine, timestamp, label, printf} = winston.format
const myformat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${message} ${level}: ${message}`
})

