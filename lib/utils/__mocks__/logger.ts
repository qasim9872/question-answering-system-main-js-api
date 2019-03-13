export default class Logger {
  public static getLogger(name: string): Logger {
    const extractedName: RegExpMatchArray | null = name.match(/.*\/(.*)\./)
    return new Logger()
  }

  public debug(format: any, ...params: any[]): void {}

  public info(format: any, ...params: any[]): void {}

  public warn(format: any, ...params: any[]): void {}

  public error(format: any, ...params: any[]): void {}
}
