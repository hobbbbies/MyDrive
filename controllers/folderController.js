const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");

async function folderPost (req, res) {
    try {
        const { folderName } = req.body;
        const folder = await prisma.folder.create({
        data: {
            name: folderName
        }
        });

        const folderPath = path.join(__dirname, '..', 'uploads', folder.name);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        res.json(folder);
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