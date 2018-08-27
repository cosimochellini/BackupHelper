const folderController = require("./folder");

let backupController = {};

backupController.execute = (settings, dirname) => {

    let outputFolder;

    settings.entryPath.forEach(element => {
        outputFolder = folderController.copyFolder(element.path, settings.outputPath)
    });

    folderController.zipFolder(outputFolder, settings);
};

module.exports = backupController;

