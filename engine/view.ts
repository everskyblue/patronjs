import compile, { getText } from "./source";

export interface ConfigView {
    pathView?: string
    defaultExtension?: string
    defaultData?: unknown
    output?: string | HTMLElement
}

export class View {
    public data: Record<string, any> = {};

    constructor(public config: ConfigView = {}) {}

    setData(data: Record<string, any> = {}) {
        this.data = Object.assign(data, this.config.defaultData??{});
        return this;
    }

    compile(source: string, data?: Record<string, any>) {
        if (typeof data === 'object') this.setData(data);
        compile(this, source)
    }

    resolvePath(file: string) {
        const slashEnd = (path: string) => {
            if (!path.endsWith('/')) {
                path += '/';
            }
            return path;
        }
        const removeDot = ( path: string) => {
            if (path.startsWith('./')) {
                path = path.slice(1);
            }
            if (!path.startsWith('/')) {
                path = '/' + path;
            }
            return path;
        }
        const join = (base: string, path: string) => {
            base = slashEnd(base);
            path = removeDot(path);
            return base.concat(path.slice(1));
        }
        
        file = join(this.config.pathView, file);

        if (!file.endsWith(this.config.defaultExtension)) {
            file += this.config.defaultExtension;
        }

        return file;
    }

    async readAndCompile(file: string): Promise<string> {
        return getText(this.resolvePath(file))
    }
}