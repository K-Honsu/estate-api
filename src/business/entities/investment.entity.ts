// src/investor/entities/investment.entity.ts
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne 
  } from 'typeorm';
  import { User } from '../../auth/entities/user.entity';
  import { Project } from '../../business/entities/project.entity';
  
  @Entity()
  export class Investment {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('decimal', { precision: 15, scale: 2 })
    amount: number;
  
    @Column({ default: 'pending' })
    status: string; // pending, active, completed, cancelled
  
    @ManyToOne(() => User, user => user.investments)
    investor: User;
  
    @ManyToOne(() => Project, project => project.investments)
    project: Project;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }