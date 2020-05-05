import {Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {NoteSpaceEntity} from "./note-space.entity";

@Entity('note_space_accesses')
@Index('noteSpaceId')
export class NoteSpaceAccessEntity {
    /****
     * FIELDS
     ****/

    @PrimaryGeneratedColumn()
    id: number;

    @Column("integer", {name: "note_space_id"})
    noteSpaceId: number;

    @Column('varchar', {length: 50, name: "api_key"})
    apiKey: string;

    @Column('varchar', {length: 50, name: "ip_address"})
    ipAddress: string;

    @Column({name: "created_date", type: "datetime"})
    createdDate: Date;

    /****
     * RELATIONSHIPS
     ****/

    /**
     * N items - 1 NoteSpace
     */
    @ManyToOne(type => NoteSpaceEntity, space => space.noteAccesses)
    noteSpace: NoteSpaceEntity;
}