export interface User {
    id?: number,
    name: string,
    password: string,
    hash: string,
    email: string,
    phoneNumber: string,
    dateCreated?: string,
    dateUpdated?: string,
}
