import { Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { UsersResolver } from './users.resolver';
import { DatabaseModule } from 'src/common/database/db.module';
import { User, UserSchema } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { PasswordService } from './providers/password.service';


@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name : User.name , schema:UserSchema
      }
    ])
  ],
  providers: [UsersResolver, UsersService , UsersRepository , PasswordService],
  exports: [UsersService], // Optional: If this module's service is used in other modules
})
export class UsersModule {}
