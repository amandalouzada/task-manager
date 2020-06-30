
import fs from 'fs';

type LogstashType = 'tcp' | 'udp' | 'memory';
interface ILogstashConfig {
  type: LogstashType;
  host: string
  port: number
}
const logstashConfig: ILogstashConfig = {
  type: 'tcp',
  host: 'localhost',
  port: 5000
}

const getApplicationName = () => {
  const pathPackageJson = `${__dirname}/../../package.json`
  let applicationName = process.env.LOGSTASH_APPLICATION_NAME || false

  if (!applicationName && fs.existsSync(pathPackageJson))
    applicationName = require(pathPackageJson).name
  return applicationName;
}

export default logstashConfig;
export const applicationName = getApplicationName();
