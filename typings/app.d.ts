import { Dispatcher, Route } from "./route";
import { HRequest } from "./http";


export type Assets = {
    js: string
    css: string
}

export type OptionViewCompiler = {
    path: string

    ext: string

    join: string
}

export type RouteAction = {
    path: string
    option: Function | object
    method: string
}

export type AppConfig = {
    debug: boolean

    base_url: string

    assets_location: Assets

    cview: OptionViewCompiler
}


export interface ContainerApp {}

export class URLStateCapture {
    state(dispatcher: Dispatcher): void
}

export class App extends Route {
    debug: boolean

    container: ContainerApp

    constructor(config: AppConfig)

    run(req: HRequest): Dispatcher

    handlerError(err: Error): void

    setContainer(key: string, fn_container: (container: ContainerApp) => void): void
}
