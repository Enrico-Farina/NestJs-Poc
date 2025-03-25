import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usuarios } from './usuarios.entity';
import { EmailModule } from 'src/email/email.module';
import { EmailValidator } from './validator/email.validator';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [EmailModule ,TypeOrmModule.forFeature([usuarios]),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      global: true,
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '1d' },}),
    })],
  controllers: [LoginController],
  providers: [LoginService, EmailValidator]
})
export class LoginModule {}
