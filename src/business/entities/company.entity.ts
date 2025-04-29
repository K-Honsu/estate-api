import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

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

    @OneToOne(() => User, user => user.company)
    @JoinColumn()
    user?: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}