import { UserDTO, UserInterface } from './user.interface';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body() user: UserDTO): Promise<UserInterface> {
    return this.userService.createUser(user);
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<UserInterface> {
    return await this.userService.getOneUser(id);
  }

  @Get('/')
  async getUsers(): Promise<UserInterface[]> {
    return await this.userService.getUsers();
  }
}
