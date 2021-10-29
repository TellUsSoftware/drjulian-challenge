export interface EnvironmentConfig {
    port: number;
    interface: string;
    environment: string;
    postgres: {
      url?: string;
      host: string;
      database: string;
      username: string;
      password: string;
      logger: boolean;
    }
}
  