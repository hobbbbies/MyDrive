const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function uploadPost(req, res) {
    try{
        if (!req.file) {
            return res.status(400).send("No file uploaded!");
        }

        const { 
            originalname,  
            size, 
            path 
        } = req.file;

        const file = await prisma.file.create({
            data: {
                name: originalname,
                size: size,
                storagePath: path,
                folderId: req.body.folder.id
            }
        });
    } catch {

    }
    console.log(req.file);
    res.redirect("/upload");
}

async function uploadGet(req, res) {
    try {
        const folders = await prisma.folder.findMany({
            select: {
                id: true,
                name: true
            },
            orderBy: {
                name: 'asc'
            }
        });
        res.render('uploadView', { folders });
    } catch (error) {
        console.error("Error fetching folders:", error);
        res.render('uploadView', { folders: [] });
    }
}

module.exports = { uploadGet, uploadPost };