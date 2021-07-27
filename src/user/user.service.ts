import { UserDTO, UserInterface } from './user.interface';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Basket } from 'src/basket/basket.entity';

@Injectable()
export class UserService {
  async createUser(user: UserDTO): Promise<UserInterface> {
    const { email, lastName, firstName, password } = user;

    const newUser = new User();

    newUser.email = email;
    newUser.lastName = lastName;
    newUser.firstName = firstName;
    newUser.password = password;

    await newUser.save();

    const newBasket = new Basket();
    await newBasket.save();

    newUser.basket = newBasket;

    await newUser.save();

    return newUser;
  }

  async getUsers(): Promise<UserInterface[]> {
    return await User.find({});
  }

  async getOneUser(userId: string): Promise<UserInterface> {
    return await User.findOne(userId);
  }
}
