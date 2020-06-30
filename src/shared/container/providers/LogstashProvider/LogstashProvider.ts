//@ts-ignore
import LogstashClient from 'logstash-client';
import logstashConfig, { applicationName } from '@config/logstash';


const logstash = new LogstashClient({
  ...logstashConfig
});

/**
 * Send event log to logstash
 * @param {JSON} logContent 
 */
const sendLog = (logContent: { [key: string]: any } = {}, keep = true) => {

  logContent['@timestamp'] = new Date()
  logContent['aplication_name'] = applicationName;

  logstash.send(logContent)

}

export default sendLog
