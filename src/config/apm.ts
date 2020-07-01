import dotenv from 'dotenv';
dotenv.config()
import elasticApm from 'elastic-apm-node';

interface IApmConfig {
  serviceName: string;
  secretToken: string;
  serverUrl: string;
}
export const envApmServer: IApmConfig = {
  serviceName: process.env.APM_SERVICE_NAME || 'apm-server',
  secretToken: process.env.APM_TOKEN || 'TLWyhTGb9rfiihH2EvzAmydZfwlzynRa',
  serverUrl: process.env.APM_URL || 'http://localhost:8200',
};


const apm = elasticApm.start({
  ...envApmServer,
  verifyServerCert: false,
});

export default apm;