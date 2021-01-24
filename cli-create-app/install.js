#!/usr/bin/env node

const exec = require("./exec");
const path = require('path');

const name_dir = process.argv[2] || '';
const download = require('download-git-repo')

download('everskyblue/patronjs', resolve(name_dir), function (err) {
    console.log(err ? 'an error occurred in the installation process\n' : 'installed!\n')
    console.error(err);
    exec(name_dir);
})

function resolve(...dirs) {
    return path.resolve(process.cwd(), ...dirs);
}