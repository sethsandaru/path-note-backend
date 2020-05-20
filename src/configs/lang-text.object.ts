/**
 * PathNoteBackend - LangText
 * This file contains all the message that will be used in all Modules
 * @author Phat Tran
 */

export default {
    /**
     * Note-Space Module Text
     */
    noteSpace: {
        // Note-Space Mess
        errorMessages: {
            duplicateNoteKey: "Note-Key is already taken. Please choose another one.",
            noteSpaceCreateFailed: "Failed to create new Note-Space. Please try again.",
            noteSpaceNotExists: "This Note-Space doesn't exist. Exiting...",
        }
    },

    /**
     * Note-Item Module Text
     */
    noteItem: {
        errorMessages: {
            notExists: "Note-Item doesn't exists. Aborted."
        },

        defaultHeadline: "Headline goes here - double click to change",
        defaultContent: "Body goes here - double click to change",
        defaultWidth: 250,
    }

}