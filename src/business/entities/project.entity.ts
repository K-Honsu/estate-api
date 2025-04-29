import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import { Investment } from './investment.entity';

export enum ProjectStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    COMPLETED = "completed"
}

@Entity()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: "enum", enum: ProjectStatus })
    status: ProjectStatus;

    @ManyToOne(() => Company, company => company.projects)
    company: Company;

    @OneToMany(() => Investment, investment => investment.project)
    investments: Investment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}