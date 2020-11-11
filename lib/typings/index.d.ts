type Assets = {
    js: string
    css: string
}

type OptionViewCompiler = {
    path: string

    ext: string

    join: string
}

type RouteAction = {
    path: string
    option: Function | object
    method: string
}

interface AppConfig {
    debug: boolean

    base_url: string

    assets_location: Assets

    cview: OptionViewCompiler
}

interface ContainerApp {
    // container
}

declare module "jspatron" {

    namespace patron {

        class Patron extends route.Route {
            debug: boolean

            container: ContainerApp

            constructor(config: AppConfig)

            run(req: http.HRequest): route.Dispatcher

            handlerError(err: Error): void

            setContainer(key: string, fn_container: (container: ContainerApp) => void): void
        }

    }

    export module route {
        export class Route {
            private _group: string
            private pattern: RoutePattern
            private actions: Array<RouteAction>
            group(base_path: string, callback: (route: Route)=> void): void
            hash(path: string, action: Function | RouteAction): void
        }

        export interface RoutePattern {
            readonly lower: string
            readonly upper: string
            readonly number: string
            readonly string: string
            readonly simple: string
            readonly search: string
            resolveConditional(needle: string): object
        }

        export class Dispatcher {
            readonly container: ContainerApp
            readonly routers: Array<RouteAction>
            readonly request: http.HRequest
            private _instance: Dispatcher
            private static instance: Dispatcher

            constructor(container: ContainerApp, request: http.HRequest)

            getInstance(): Dispatcher
            send(): void
            notFount(callback: Function):  void
            private catch(): void
            private execute(): never
            private stateView(current_url: string): void
            static createInstance(container: ContainerApp, request: http.HRequest): Dispatcher
            
        }
    }

    export module http {
        class HRequest {
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
    }

    module "url-state"{
        export default class URLStateCapture {
            state(dispatcher: route.Dispatcher): void
        }
    }
}
/* 
declare module "jspatron/route" {


    export default class Route {
        private _group: string
        private pattern: RoutePattern
        private actions: Array<RouteAction>
        group(base_path: string, callback: (route: Route)=> void): void
        hash(path: string, action: Function | RouteAction): void
    }
} */

/* export = jspatron;
export as namespace jspatron */