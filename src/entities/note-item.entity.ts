import {BaseDateEntity} from "./types/base-date.entity";
import {Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {NoteSpaceEntity} from "./note-space.entity";
import {UpdatedUserTypeEnum} from "./enums/updated-user-type.enum";

@Entity('note_items')
@Index('noteSpaceId')
export class NoteItemEntity extends BaseDateEntity {
    /****
     * FIELDS
     ****/

    @PrimaryGeneratedColumn()
    id: number;

    @Column("integer", {name: "note_space_id"})
    noteSpaceId: number;

    @Column('varchar', {length: 255})
    headline: string;

    @Column('text', {nullable: true})
    content: string;

    @Column('boolean', {name: "is_rich_content", default: false})
    isRichContent: boolean;

    /****
     * RELATIONSHIPS
     ****/

    /**
     * N items - 1 NoteSpace
     */
    @ManyToOne(type => NoteSpaceEntity, space => space.noteItems)
    noteSpace: NoteSpaceEntity;
}