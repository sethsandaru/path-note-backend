import {BaseDateEntity} from "./types/base-date.entity";
import {Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {NoteSpaceEntity} from "./note-space.entity";

@Entity('note_items')
@Index('note_space_id')
export class NoteItemEntity extends BaseDateEntity {
    /****
     * FIELDS
     ****/

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "note_space_id",
        type: "integer",
    })
    noteSpaceId: number;

    @Column('varchar', {length: 255})
    headline: string;

    @Column('text', {nullable: true})
    content: string;

    @Column('boolean', {name: "is_rich_content", default: false})
    isRichContent: boolean;

    @Column("integer")
    color: number;

    @Column("integer")
    top: number;

    @Column("integer")
    left: number;

    @Column("integer")
    width: number;

    @Column("integer")
    height: number;

    @Column({name: "deleted_date", type: "datetime", default: null})
    deletedDate: Date;

    /****
     * RELATIONSHIPS
     ****/

    /**
     * N items - 1 NoteSpace
     */
    @ManyToOne(type => NoteSpaceEntity, space => space.noteItems)
    noteSpace: NoteSpaceEntity;
}