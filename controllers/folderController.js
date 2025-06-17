const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");

async function folderPost (req, res) {
    try {
        const { folderName } = req.body;
        const parentId = JSON.parse(req.body.folder).id || null;
        const folder = await prisma.folder.create({
        data: {
            name: folderName,
            parentId: parentId
        }
        });

        const folderPath = path.join(__dirname, '..', 'uploads', folder.name);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        res.redirect("/upload");
  } catch (error) {
        res.status(500).json({ error: error.message });
  }
}

// async function folderGet(req, res) {
//     try {
//         const folders = await prisma.folder.findMany();
//         res.json(folders);
//   } catch (error) {
//         res.status(500).json({ error: error.message });
//   }
// }

async function folderCreateGet(req, res) {
    try {
        const folders = await prisma.folder.findMany();
        res.render('folderCreateView', { folders: folders });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

async function folderGet(req, res) {
    const folders = await prisma.folder.findMany({});
    let files = await prisma.file.findMany({});
    const folderId = req.params.folderId;
    const chosenFolder = await prisma.folder.findUnique({
        where: { id: folderId}
    })

    files = files.filter((file) => {
        return file.folderId === folderId
    });

    const nestedFolders = folders.filter((folder) => folder.parentId === chosenFolder.id);

    res.render('indexViews', { headerTitle: chosenFolder.name, folders: folders, files: files, nestedFolders: nestedFolders });
}

module.exports = { folderGet, folderPost, folderCreateGet }