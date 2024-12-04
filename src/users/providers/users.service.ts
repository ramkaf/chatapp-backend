import { Injectable } from '@nestjs/common';
import { PasswordService } from './password.service';
import { UsersRepository } from '../users.repository';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

@Injectable()
export class UsersService {
  constructor (private readonly usersRepository:UsersRepository
    ,private readonly passwordService:PasswordService
  ){}
 async create(createUserInput: CreateUserInput) {
    createUserInput.password = await this.passwordService.hashPassword(createUserInput.password)
    return this.usersRepository.create(createUserInput)
  }

  async findAll() {
    return await this.usersRepository.find({});
  }

  async findOne(_id: string) {
    return await this.usersRepository.findOne({_id})
  }

  async update(updateUserInput: UpdateUserInput) {
    const {_id , ... updateField} = updateUserInput 
    if (updateField.password){
      updateField.password = await this.passwordService.hashPassword(updateUserInput.password)
    }
    console.log(updateField);
    
    return this.usersRepository.findOneAndUpdate({_id} , {
      $set : {
        ...updateField
      }
    })
  }

  async remove(_id: string) {
    return await this.usersRepository.findOneAndDelete({_id})
  }
}
