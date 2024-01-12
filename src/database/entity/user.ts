import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,OneToMany, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Department, Leave, Relieving_officer } from "./entity";


export enum UserStatus {
  "user" = "user",
  "admin" = "admin",
  "superadmin" = "superadmin",
}

@Entity({name: "User"})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 255})
    firstname: string;

    @Column({type: 'varchar', length: 255})
    lastname: string;

    @Column({type: 'varchar', length: 255})
    email: string;

    @Column({type: "enum", enum: UserStatus})
    status: UserStatus;

    @Column({type: 'varchar', length: 255})
    password: string;

    @OneToMany(()=> Leave, (leave) => leave.user, {cascade: true})
    leave: Leave[];

    @OneToOne(()=> Department, (department) => department.director)
    directorOf: Department

    @ManyToOne(() => Department, (staff) => staff.staff)
    @JoinColumn({ name: 'department_table' })
    staff: Department

    @Column({type:"text", nullable:true})
    signature: string

    @OneToMany(() => Relieving_officer, (relieving_officer) => relieving_officer.relieving_officer)
    relieving_officer: Relieving_officer

    @OneToMany(() => Relieving_officer, (relieving_officer) => relieving_officer.requesting_officer)
    requesting_officer: Relieving_officer

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        name: "created_at",
      })
      createdAt: Date
}