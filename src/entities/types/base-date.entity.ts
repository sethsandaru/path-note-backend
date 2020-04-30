/**
 * Base Date-fields
 * @description Contain default 2 fields: created_date and updated_date. Both are datetime.
 * @author Phat Tran
 */
import {Column} from "typeorm";


export abstract class BaseDateEntity {

    @Column({name: "created_date", type: "datetime"})
    createdDate: Date;

    @Column({name: "updated_date", type: "datetime"})
    updatedDate: Date;

}