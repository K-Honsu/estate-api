import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Company } from 'src/business/entities/company.entity';
import { Investment } from 'src/business/entities/investment.entity';

export enum AccountType {
  ADMIN = 'admin',
  BUSINESS = 'business',
  INVESTOR = 'investor',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  state: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  accountType: AccountType;

  @Column({ nullable: true })
  firstName?: string;

  @OneToOne(() => Company, (company) => company.user, {
    nullable: true,
    cascade: true,
  })
  company?: Company;

  @Column({ nullable: true })
  lastName?: string;

  @OneToMany(() => Investment, (investment) => investment.investor)
  investments: Investment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
