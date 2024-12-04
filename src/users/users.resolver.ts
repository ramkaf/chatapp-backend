import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './providers/users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('_id') _id: string) {
    return await this.usersService.findOne(_id);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const {_id} = updateUserInput
    return await this.usersService.update(updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('_id',) _id: string) {
    return await this.usersService.remove(_id);
  }
}
