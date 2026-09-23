export class Database {
  static async query(sql: string): Promise<any> {
    throw new Error('Database not connected — this is a workshop stub')
  }
  async query(sql: string): Promise<any> {
    return Database.query(sql)
  }
}
