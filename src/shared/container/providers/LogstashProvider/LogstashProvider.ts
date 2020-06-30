//@ts-ignore
const LogstashClient = require('logstash-client')
import fs from 'fs';

const pathPackageJson = `${__dirname}/../../package.json`
let applicationName = process.env.LOGSTASH_APPLICATION_NAME || false

if (!applicationName && fs.existsSync(pathPackageJson))
  applicationName = require(pathPackageJson).name

/**
 * Envia envento de log para o logstash
 * @param {JSON} logContent 
 */
const sendLog = (logContent: { [key: string]: any } = {}, keep = true) => {
  const logstash = new LogstashClient({
    type: 'tcp', // udp, tcp, memory
    host: 'localhost',
    port: 5000
  });

  logContent['@timestamp'] = new Date()

  // if (!logContent.application_name && applicationName)
  //   logContent['application_name'] = applicationName

  // logContent['keep_log'] = keep ? "true" : "false"

  logstash.send(logContent, (a:any) => {
    console.log('OK')
  })


  if (process.env.NODE_ENV == 'development')
    console.log(logContent)
}

export default sendLog


sendLog({
  teste: 'Meu primeiro log'
});