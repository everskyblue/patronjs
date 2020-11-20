import { ContainerApp } from "./app";

export class HRequest {
    readonly port: boolean
    readonly host: string
    readonly params: object
    readonly search: object
    readonly agent: string
    readonly url: string
    readonly hast: string
    isHTTP(): boolean
    isHTTPS(): boolean
    getQuerySearch(): object
}


export class HResponse {
    private container: ContainerApp
    constructor(container: ContainerApp)
    signedCookie(key: string, value: string, options?: object): void
    view(file: string, data: object): void
}


export class Cookie {
    readonly expires: string
    readonly path: string
    readonly domain: string
    readonly secure: any
    readonly max_age: any
    readonly samesite: any
    readonly values: object

    add(key: string, value: string, options: object): void
    remove(key: string): void
    getValues(): object
    getValue(key: string): any
}


export namespace status {
    const STATUS: object
    function isInfo(): boolean
    function isSuccess() : boolean
    function isRedirection(): boolean
    function isServerError(): boolean
    function isClientError(): boolean
    function exists_status(code: number): boolean
    function getMessageStatus(code: number): string
    function isOK(): boolean

    class Status {
        code: number
        STATUS(): typeof STATUS
        isInfo(): typeof isInfo
        isSuccess(): typeof isSuccess
        isRedirection(): typeof isRedirection
        isServerError(): typeof isServerError
        isClientError(): typeof isClientError
        exists_status(): typeof exists_status
        getMessageStatus(): typeof getMessageStatus
        isOK(): typeof isOK
    }
}