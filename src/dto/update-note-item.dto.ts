
export class UpdateNoteItemDTO {
    // must-for-webSocket
    noteSpaceId: number

    // id?
    id?: number

    // note-content
    headline?: string
    content?: string

    // note-item configuration
    top?: number
    left?: number
    width?: number
    height?: number
    color?: number

}