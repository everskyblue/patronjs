import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    root: __dirname,
    build: {
        minify: true,
        lib: {
            entry: resolve(__dirname, "global.js"),
            name: "Patron",
            fileName: "patronjs",
        },
        rollupOptions: {
            output: {
                dir: resolve(__dirname, ".dist")
            }
        }
    }
});
