import { RouteAction, ContainerApp } from "./app";
import { HRequest } from "./http";

export class Route {
    private _group: string
    private pattern: RoutePattern
    private actions: Array<RouteAction>
    group(base_path: string, callback: (route: Route)=> void): void
    hash(path: string, action: Function | RouteAction): void
}


export class RoutePattern {
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
    readonly request: HRequest
    private _instance: Dispatcher
    private static instance: Dispatcher

    constructor(container: ContainerApp, request: HRequest)

    getInstance(): Dispatcher
    send(): void
    notFount(callback: Function):  void
    private catch(): void
    private execute(): never
    private stateView(current_url: string): void
    static createInstance(container: ContainerApp, request: HRequest): Dispatcher
    
}