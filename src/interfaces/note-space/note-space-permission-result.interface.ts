

export interface NoteSpacePermissionResultInterface {
    id: number,
    noteKey: string,
    name: string,
    description: string,
    hasPassword: boolean;
    visitorCanView: boolean;
    visitorCanEdit:boolean;
}