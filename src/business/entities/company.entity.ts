import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Project } from './project.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyName: string;

  @Column()
  companyRegNumber: string;

  @Column()
  companyAddress: string;

  @OneToOne(() => User, (user) => user.company)
  @JoinColumn()
  user?: User;

  @OneToMany(() => Project, (project) => project.company)
  projects: Project[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
