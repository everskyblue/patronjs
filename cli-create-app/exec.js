const {exec} = require('child_process')

module.exports = (cd_dir) => {
    console.log('running npm command\n');

    const cmd = (cd_dir ? `cd ./${cd_dir} && ` : '') + 'npm install';
    
    exec(cmd, (error, stdout, stderr) => {
        if (error) console.error(error);
        if (stderr) console.log(`stderr: ${stderr}`);
        console.log(`stdout: ${stdout}`);
    });
}