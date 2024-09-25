import { UserRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt"

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(data: { name: string, email: string, password: string, address: string }) {
        
        const hashedPassword = await bcrypt.hash(data.password, 12)

        const userData = {
            ...data,
            password: hashedPassword
        }

        return await this.userRepository.createUser(userData);
    }

    async getUserById(id: number) {
        return await this.userRepository.findUserById(id);
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findUserByEmail(email);
    }

    async updateUser(id: number, data: Partial<{ name: string, email: string, password: string, address: string }>) {
        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 12)
            data.password = hashedPassword
        }
        return await this.userRepository.updateUser(id, data);
    }

    async deleteUser(id: number) {
        return await this.userRepository.deleteUser(id);
    }
}
