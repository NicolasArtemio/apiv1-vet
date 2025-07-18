import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from '../constants/user-roles.enum';
import { BcryptHelper } from 'src/common/helpers/bcrypt.helper';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      await this.validateUser(createUserDto.email, { shouldNotExist: true });

      const hashedPassword = await BcryptHelper.hashPassword(createUserDto.password);

      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
        role: UserRole.USER,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Error creating user.');
    }
  }


  async findByemail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private async validateUser(email: string, options?: { shouldExist?: boolean, shouldNotExist?: boolean }): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (options?.shouldExist && !user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }

    if (options?.shouldNotExist && user) {
      throw new ConflictException(`User with email ${email} already exists.`);
    }

    return user;
  }

}
