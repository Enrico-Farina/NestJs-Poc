import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usuarios } from './login/usuarios.entity';
import { EmailModule } from './email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [ 
    ConfigModule.forRoot({ isGlobal: true, }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'gudiao',
    database: 'nest-poc',
    entities: [usuarios],
    synchronize: true,
  }),
  LoginModule,
  EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
