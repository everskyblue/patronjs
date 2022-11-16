import { extract } from "./compile";
import { slice } from "./utils";
import { View } from "./view";

export async function getText(file: string) {
    const res = await fetch(file);
    const text = await res.text();
    return text;
}

function replace(str: string): string {
    let isReplace = false;
    let m =
        //"'" +
        str.replace(/\[.*\]/, (find: string) => {
            isReplace = true;
            console.log($$$e);
            
            return $$$e.data[find.replace(/[\[\]]/g, "")];
        });

    //if (!isReplace) m += "'";

    return m;
}

const $$$e = {
    html: "",
    data: {},
    createHTML(tag: string, props: any) {
        const e = document.createElement(tag);
        const str = e.outerHTML;
        const m = str.match(/(<[a-zA-Z\-]*?>)(<\/[a-zA-Z\-]*?>)/);

        const totalProps = []
        if (props.trim().length) {
            props = JSON.parse(props);
            for (const name in props) {
                if (name.charAt(0) !== '@') {
                    totalProps.push(replace(name)+'='+replace(props[name]));
                }
            }
        }
        console.log(m[1], totalProps.join(' '));
        
        return {
            open: m === null ? str : m[1],
            close: m === null ? '' : m[2]
        }
    },
};

export default function sourceDOM(view: View, source: string) {
    const element = document.createElement("div");
    const slots = {};
    element.innerHTML = source;
    const extendFile: HTMLElement[] = slice.call(
        element.querySelectorAll("reference")
    );
    slice.call(element.childNodes).forEach((node: HTMLElement) => {
        const match = node.nodeName.toLowerCase().match(/slot\-[a-z]+/);
        if (Array.isArray(match)) {
            const nameSlot = match.input.split("-").pop();
            if (!(nameSlot in slots)) {
                slots[nameSlot] = [];
            }
            slots[nameSlot] = node;
        }
    });

    if (extendFile.length) {
        return Promise.all(
            extendFile.map(async (node: HTMLElement): Promise<string> => {
                const file = node.getAttribute("path");
                return await view.readAndCompile(file);
            })
        ).then((htmls: string[]) => {
            const fns = [];
            for (const html of htmls) {
                const parse = new DOMParser();
                const dom = parse.parseFromString(html, "text/html");
                const outlet = dom.querySelectorAll("slot");
                for (let index = 0; index < outlet.length; index++) {
                    const element = outlet.item(index);
                    const nameSlot = element.getAttribute("name");
                    if (nameSlot in slots) {
                        const slot: HTMLElement = slots[nameSlot];
                        for (const child of slice.call(slot.children)) {
                            const result = extract(child);
                            fns.push(new Function("lists", "id", "$$$e", result))
                        }
                    }
                }
            }
            return fns;
        }).then(callbacks => {
            $$$e.data = view.data;
            callbacks.forEach(call => {
                call(
                    [1, 3],
                    1,
                    $$$e
                );
            });
        });
    }

}
