import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasketItem } from './basketItem.entity';

@Entity()
export class Basket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => BasketItem, {
    eager: true,
  })
  @JoinTable()
  items: BasketItem[];
}
