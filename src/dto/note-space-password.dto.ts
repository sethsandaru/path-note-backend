import {IsNotEmpty} from "class-validator";


export class NoteSpacePasswordDTO {
    @IsNotEmpty()
    noteKey: string

    @IsNotEmpty()
    password: string
}