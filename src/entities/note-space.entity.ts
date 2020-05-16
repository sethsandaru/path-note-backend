import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne, Index} from 'typeorm';
import {BaseDateEntity} from "./types/base-date.entity";
import {UserEntity} from "./user.entity";
import {NoteItemEntity} from "./note-item.entity";
import {CreateNoteSpaceDTO} from "../dto/create-note-space.dto";
import {NoteSpaceAccessEntity} from "@entities/note-space-access.entity";

@Entity('note_spaces')
@Index(["userId", "noteKey"], { unique: true })
export class NoteSpaceEntity extends BaseDateEntity{
    /****
     * FIELDS
     ****/

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'user_id',
        type: "integer"
    })
    userId: number;

    @Column({
        name: "note_key",
        type: "varchar",
    })
    noteKey: string;

    /**
     * Note-Space Title/Name
     */
    @Column('varchar', {length: 255})
    name: string;

    /**
     * Note-Space Short Description
     */
    @Column('varchar', {length: 255})
    description: string;

    /**
     * Note-Space Flag Check - Has Protected Password or not
     */
    @Column('boolean', {name: "has_password"})
    hasPassword: boolean;

    /**
     * Note-Space Password
     */
    @Column('varchar', {length: 255, nullable: true})
    password: string;

    /**
     * Can anonymous people access?
     */
    @Column('boolean', {name: "visitor_can_view"})
    visitorCanView: boolean;

    /**
     * Can anonymous people edit?
     */
    @Column('boolean', {name: "visitor_can_edit"})
    visitorCanEdit: boolean;

    /**
     * Background Image (Uploaded by User)
     */
    @Column({name: 'background_image_file_id', type: "integer", nullable: true, default: null})
    backgroundImageFileId: number;

    /**
     * Font-Size of the Note
     * @default 14px
     */
    @Column({name: 'font_size', type: "integer", default: 13})
    fontSize: number;

    /****
     * RELATIONSHIPS
     ****/

    /**
     * 1 user - N NoteSpaces
     */
    @ManyToOne(type => UserEntity, user => user.noteSpaces)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    /**
     * 1 NoteSpace - N Items
     */
    @OneToMany(type => NoteItemEntity, item => item.noteSpace)
    @JoinColumn({name: 'note_space_id'})
    noteItems: NoteItemEntity[];

    /**
     * 1 NoteSpace - N Accesses
     */
    @OneToMany(type => NoteSpaceAccessEntity, item => item.noteSpace)
    @JoinColumn({name: 'note_space_id'})
    noteAccesses: NoteSpaceAccessEntity[];

    /****
     * ACCESSOR METHODS
     ****/


}