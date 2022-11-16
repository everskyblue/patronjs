import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    root: __dirname,
    resolve: {
        alias: {
            '@controllers': resolve(__dirname, 'app/controllers'),
            '@views': resolve(__dirname, 'views'),
            '@assets': resolve(__dirname, 'public/assets'),
        }
    }
});
