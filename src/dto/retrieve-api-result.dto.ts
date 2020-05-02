
export class RetrieveApiResultDTO {
    status: boolean;
    object: object = null;

    constructor(status : boolean = true, object: object = null) {
        this.status = status
        this.object = object
    }

}