import { IsEmail, IsNotEmpty, IsBoolean, Matches, ValidateIf } from 'class-validator';

export class CreateNoteSpaceDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @ValidateIf(o => o.noteKey && o.noteKey.length) // Only check if exists
    @Matches(/[a-zA-Z0-9-]+/)
    noteKey: string;

    description: string;

    @IsBoolean()
    hasPassword: boolean;

    password: string;

    @IsBoolean()
    visitorCanView: boolean;

    @IsBoolean()
    visitorCanEdit: boolean;
}
