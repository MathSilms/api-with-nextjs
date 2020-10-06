
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { AdressModule } from './adress/adress.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, AdressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}