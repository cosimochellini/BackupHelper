const fs = require("fs");
const backupController = require("./controller/backup");

const settings = JSON.parse(fs.readFileSync('./settings/settings.json'));

backupController.execute(settings, __dirname)
    .then(() => process.stdout.write("script runned correctly\n"))
    .catch(error => process.stdout.write(error));