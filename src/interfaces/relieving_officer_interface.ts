import { User } from "../database/entity/user";

export interface RelieveInterface {
    is_viewed: boolean,
    accept_relieve: boolean,
    relieving_officer: User,
    acceptance_data: string,
    acceptance_date: string
}


export type PartialRelieveInterface = Partial<RelieveInterface>;