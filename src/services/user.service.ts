// DEFECT: DIP violation — UserService directly instantiates its dependency
// Should receive IUserRepository via constructor injection
class UserRepository {
  async findByEmail(email: string) {
    return { id: '1', email, name: 'Test User' }
  }
  async save(user: any) {
    return user
  }
}

export class UserService {
  private repo: UserRepository

  constructor() {
    // DEFECT: tight coupling — impossible to mock/test without the real repo
    this.repo = new UserRepository()
  }

  async getUserByEmail(email: string) {
    if (!email) return null
    return this.repo.findByEmail(email)
  }

  async createUser(data: any) {
    // DEFECT: no validation, no typing on data
    return this.repo.save(data)
  }
}
