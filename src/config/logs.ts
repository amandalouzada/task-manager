interface ILogstashConfig{
  type: string,
  host: string;
  port: number
}

export default {
  type: 'tcp',
  host: 'ms-logstash.default.svc.cluster.local',
  port: 5000
} as ILogstashConfig;