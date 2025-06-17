const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
    // Get the command line argument (process.argv[2] is the first argument after the script name)
    const arg = parseInt(process.argv[2]);
    
    try {
        if (arg === 1 || arg === 0) {
            // Delete all File records
            const deletedFiles = await prisma.file.deleteMany({});
            console.log(`Deleted ${deletedFiles.count} files`);
        }
        
        if (arg === 2 || arg === 0) {
            // Delete all Folder records
            const deletedFolders = await prisma.folder.deleteMany({});
            console.log(`Deleted ${deletedFolders.count} folders`);
        }

        if (![0, 1, 2].includes(arg)) {
            console.log('Invalid argument. Use:');
            console.log('1 - Delete all files');
            console.log('2 - Delete all folders');
            console.log('0 - Delete both files and folders');
        }
    } catch (error) {
        console.error('Error deleting records:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Execute the main function
main().catch(e => {
    console.error(e);
    process.exit(1);
});

