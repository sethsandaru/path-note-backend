

export interface NoteSpacePermissionResultInterface {
    id: number,
    noteKey: string,
    name: string,
    hasPassword: boolean;
    visitorCanView: boolean;
    visitorCanEdit:boolean;
}