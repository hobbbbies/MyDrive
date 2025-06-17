const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function indexGet(req, res) {
    const folders = await prisma.folder.findMany({});
    let files = await prisma.file.findMany({});
    const rootFolders = folders.filter((folder) => folder.parentId === null);
    res.render('indexViews', { headerTitle: "MyDrive", folders: folders, files: files, nestedFolders: rootFolders });
}

module.exports = { indexGet };