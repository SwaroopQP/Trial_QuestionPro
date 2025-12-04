import fs from 'fs';
import path from 'path';

export class ConfigReader {
  private static configData: { [key: string]: string } = {};

  static {
    // Load config.properties on class initialization
    const configPath = path.join(__dirname, '../Config/config.properties');
    const fileContent = fs.readFileSync(configPath, 'utf-8');
    
    fileContent.split('\n').forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, value] = trimmedLine.split('=');
        if (key && value) {
          this.configData[key.trim()] = value.trim();
        }
      }
    });
  }

  static get(key: string): string {
    const value = this.configData[key];
    if (!value) {
      throw new Error(`Configuration key '${key}' not found in config.properties`);
    }
    return value;
  }

  static getBaseURL(): string {
    return this.get('baseURL');
  }

  static getUsername(): string {
    return this.get('username');
  }

  static getPassword(): string {
    return this.get('password');
  }
}
