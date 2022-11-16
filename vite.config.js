import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    root: resolve(__dirname, 'skeleton'),
    //base: resolve(__dirname, 'skeleton'),
    resolve: {
        alias: {
            'patron': resolve(__dirname, 'core'),
            '@controllers': resolve(__dirname, 'skeleton/app/controllers'),
            '@views': resolve(__dirname, 'skeleton/views'),
            '@assets': resolve(__dirname, 'skeleton/public/assets'),
        }
    }, 
    build: {
        minify: true,
        /*rollupOptions: {
            input: {
                main: resolve(__dirname, 'skeleton/index.html'),
            },
            output: {
                dir: '.build-library'
            }
        }*/
    },
    
    /*esbuild: {
        jsxFactory: "JSX.createElement",
        jsxFragment: "JSX.Fragment",
    },
    plugins: [tsconfigPaths({
        root: __dirname
    })],
    assetsInclude: ['**\/*.html']*/
});
