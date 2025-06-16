const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");

async function folderPost (req, res) {
    try {
        const folder = JSON.parse(req.body.folder);
        await prisma.folder.create({
        data: {
            name: folder.name
        }
        });

        const folderPath = path.join(__dirname, '..', 'uploads', folder.name);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        res.redirect("upload")
  } catch (error) {
        res.status(500).json({ error: error.message });
  }
}

async function folderGet(req, res) {
    try {
        const folders = await prisma.folder.findMany();
        res.json(folders);
  } catch (error) {
        res.status(500).json({ error: error.message });
  }
}

module.exports = { folderGet, folderPost }