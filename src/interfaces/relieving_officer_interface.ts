import { User } from "../database/entity/user";

export interface RelieveInterface {
    is_viewed?: boolean,
    accept_relieve?: boolean,
    relieving_officer: User
}