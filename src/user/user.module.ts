import { BasketModule } from './../basket/basket.module';
import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [forwardRef(() => BasketModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserModule],
})
export class UserModule {}
