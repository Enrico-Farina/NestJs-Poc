import { Body, Controller, Delete, Get, Header, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import { LoginService } from './login.service';
import { UserRegister } from './dto/userRegister.dto';
import { UserUpdate } from './dto/userUpdate.dto';
import { UserSigIn } from './dto/userSignIn.dto';
import { LoginGuard } from './guard/login.guard';

@Controller('/login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Get()
    loginEndPoint(): string {
        return 'Login is Working!';
    }

    @Post('signin')
    async signIn(@Body() user: UserSigIn) {
        const response = await this.loginService.signIn(user);
        return response;
    }

    @UseGuards(LoginGuard)
    @Get('isvalidtoken')
    async isValidToken(@Request() req) {
        return req.user;
    }

    @Post('createuser')
    async createUser(@Body() user: UserRegister) {
        const respose = await this.loginService.saveUser(user);
        return respose;
    }

    @Put('updateuser/:id')
    async updateUser(@Param('id') id: number,@Body() user: UserUpdate) {
        const response = await this.loginService.updateUser(id, user);
        return response;
    }

    @Delete('deleteuser/:id')
    async deleteUser(@Param('id') id: number, @Body('password') password: string) { 
        const response = await this.loginService.deleteUser(id, password);
        return response;
    }

}
