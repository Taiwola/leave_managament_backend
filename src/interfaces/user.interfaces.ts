import {UserStatus} from "../database/entity/user"

export interface UserDetails {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    status: UserStatus,
    gradeLevel: number
}