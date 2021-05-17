import bcrypt from 'bcrypt'

export class HashingService {
    private async createSalt() {
        return await bcrypt.genSalt()
    }

    async hashPassword(password: string) {
        const salt = await this.createSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    }

    async isValidPassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword)
    }
}