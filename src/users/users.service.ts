import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(сreateUserDto: CreateUserDto): Promise<User> {
        const user = await this.usersRepository.create(сreateUserDto);
        try {
            const hashValue = await hash(user.password, 10);
            user.password = hashValue;
        } catch (error) {
            throw new Error(error);
        }
        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        return user;
    }

    async updateOne(id: number, updateUserDto: UpdateUserDto) {
        if (updateUserDto.password) {
            try {
                const hashValue = await hash(updateUserDto.password, 10);
                updateUserDto.password = hashValue;
            } catch (error) {
                throw new Error(error);
            }
        }
        const user = await this.usersRepository.preload({
            id: id,
            ...updateUserDto,
        });
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
        return this.usersRepository.save(user);
    }

    async removeOne(userId: number) {
        return await this.usersRepository.delete(userId);
    }
}

