
import {Type} from "../database/entity/entity";

export interface LeaveDetails {
    title: string,
    description: string,
    number_of_days: string,
    startDate: string,
    endDate: string,
    leave_type: Type,
    relievingOfficer: string,
    resumptionDate: string
}