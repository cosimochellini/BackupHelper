const fs = require("fs");
const backupController = require("./controller/backup");

const settings = JSON.parse(fs.readFileSync('./settings.json'));

let result = backupController.execute(settings, __dirname)

if (result) {
    process.stdout.write("script runned correctly\n")
} else {
    process.stdout.write('error')
}