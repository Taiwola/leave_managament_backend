import {PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, OneToMany, JoinColumn, Entity} from "typeorm";
import { User } from "./user";


export enum Status  {
    "pending" = "PENDING",
    "approved" = "approved",
    "reject" = "reject"
}


export enum Type {
    "annual leave" = "annual leave",
    "vacation" = "vacation",
    "sick leave" = "sick leave",
    "maternity leave" = "maternity leave",
}

export enum Approval_type {
    "reviewed" = "reviewed",
    "to be reviewed" = "to be reviewed",
    "rejected" = "rejected",
}

@Entity({name: 'leave'})
export class Leave {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar", length: 255, nullable: false})
    title: string;

    @Column({type: "varchar", length: 255, nullable: false})
    description: string;

    @Column({type: "varchar", length: 255, nullable: false})
    number_of_days: string;

    @Column({type: "varchar", length: 255, nullable: false})
    start_date: string;

    @Column({type: "varchar", length: 255 ,nullable: false})
    end_date: string;

    @Column({type: "enum",  enum: Approval_type,nullable: true, default: Approval_type["to be reviewed"]})
    departmental_approval: Approval_type;

    @Column({type: "enum", enum: Approval_type ,nullable: true, default: Approval_type["to be reviewed"]})
    operation_management_approval: Approval_type;

    @Column({type: "enum", enum: Status, default: Status.pending})
    status: Status;

    @Column({type: "varchar", length: 500, nullable: true})
    comment: string
    
    @Column({type: "varchar", length: 500, nullable: true})
    cover_letter: string

    @Column({type: "enum", enum: Type, nullable: true})
    leave_type: Type;

     @ManyToOne(()=>User, (user)=>user.leave)
     user: User;

     @OneToOne(() => Relieving_officer, (relieving_officer) => relieving_officer.relieve_leave)
     @JoinColumn()
     relieving_officer: Relieving_officer

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        name: "created_at",
      })
      createdAt: Date
}


@Entity({name: 'department'})
export class Department {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar", nullable: false})
    name: String

    @OneToOne(() => User, (user) => user.directorOf, { nullable: true }) // Assuming a department may not have a director
    @JoinColumn()
    director: User | null;

    @OneToMany(() => User, (user) => user.staff, {nullable: true})
    @JoinColumn()
    staff: User[]
}


@Entity({name: 'relieving_officer'})
export class Relieving_officer {
    @PrimaryGeneratedColumn("uuid")
    id: string
     
    @Column({type: 'boolean', default: false})
    is_viewed: boolean
    
    @Column({type: "boolean", nullable: true})
    accept_relieve: boolean

    @OneToOne(() => Leave, (leave) => leave.relieving_officer)
    @JoinColumn()
    relieve_leave: Leave // one to one
    
    @ManyToOne(() => User, (user) => user.relieving_officer)
    relieving_officer: User // many to one

    @ManyToOne(() => User, (user) => user.requesting_officer)
    requesting_officer: User // many to one

    @Column({type: "varchar", nullable: true, length: 255})
    acceptance_date: string;
}