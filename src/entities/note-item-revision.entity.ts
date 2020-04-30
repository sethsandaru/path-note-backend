/**
 * Originally, this entity wasn't in the plan for the v0.0.1
 * Later then :D
 */

import {BaseDateEntity} from "./types/base-date.entity";
import {Column, PrimaryGeneratedColumn} from "typeorm";
import {UpdatedUserTypeEnum} from "./enums/updated-user-type.enum";


export class NoteItemRevisionEntity extends BaseDateEntity{
    /****
     * FIELDS
     ****/

    @PrimaryGeneratedColumn()
    id: number;

    @Column('integer', {name: 'revision_number', default: 1})
    revisionNumber: number;

    @Column('varchar', {length: 255})
    headline: string;

    @Column('text', {nullable: true})
    content: string;

    @Column('integer', {name: "updated_user_id", nullable: true})
    updatedUserId: boolean;

    @Column({
        name: "updated_user_id",
        type: "enum",
        enum: UpdatedUserTypeEnum,
        default: UpdatedUserTypeEnum.VISITOR,
        nullable: true
    })
    updatedUserType: UpdatedUserTypeEnum;
}