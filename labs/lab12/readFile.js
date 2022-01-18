const fs = require('fs');
const pathToFile = './file/StudentList.json';

module.exports = function readFile() {
    try {
        fs.accessSync(pathToFile);

        stats = fs.lstatSync(pathToFile);
        if (stats.isDirectory()) {
            process.stderr.write(
                'ERROR: It is not file!\n'
            );

            process.exit(1);
        }

        return fs.readFileSync(pathToFile).toString();
    } catch (e) {
        process.stderr.write(
            'ERROR: File not exist'
        );

        process.exit(1);
    }
};