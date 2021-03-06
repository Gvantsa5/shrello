import { Body, Controller, Get, Param, Post, Put, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';

@Controller('users')
export class UsersController {
    regex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

    constructor(
        private usersService: UsersService
    ) {}

    @Post()
    async signUp(@Body() userDto: CreateUserDto) {
        if(!userDto.password || !userDto.email) {
            throw new HttpException('Enter Username and password for registration.', HttpStatus.NOT_ACCEPTABLE);
        }
        if(userDto.password.length < 6) {
            throw new HttpException('Password must be at least 8 characters long.', HttpStatus.NOT_ACCEPTABLE);
        }
        if(!this.regex.test(userDto.email)) {
            throw new HttpException('Invalid email. Please try a different one.', HttpStatus.NOT_ACCEPTABLE);
        }

        return await this.usersService.createUser(userDto);
    }

    @Put()
    async signIn(@Body() userDto: LoginUserDto) {
        if(!userDto.password || !userDto.email) {
            throw new HttpException('Enter Username and password to login.', HttpStatus.NOT_ACCEPTABLE);
        }
        return await this.usersService.signIn(userDto);
    }

    @Get()
    async findAllUsers() {
        return await this.usersService.findAll();
    }

    @Get('token')
    async findByToken(@Headers('token') header: string){
        if(!header) {
            throw new HttpException('User was not found.', HttpStatus.NOT_FOUND);
        }
        return await this.usersService.findByToken(header);
    }

    @Put('email-confirmation')
    async findByEmail(@Body() userDto: { email: string }){
        if(!userDto.email) {
            throw new HttpException('User was not found.', HttpStatus.NOT_FOUND);
        }
        return await this.usersService.findByEmail(userDto.email);
    }

    @Put('reset-password')
    async resetPassword(@Body() userDto: {id: string, password: string }){
        if(!userDto.password && !userDto.id) {
            throw new HttpException('User was not found.', HttpStatus.NOT_FOUND);
        }
        return await this.usersService.resetPassword(userDto);
    }

    @Get(':id')
    async findById(@Param() params: {id: string | number} ){
        return this.usersService.findById(params.id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
        return this.usersService.updateById(id, createUserDto);
    }
}