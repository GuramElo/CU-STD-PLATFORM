import { join } from 'path';
import { rename } from 'fs';
const baseDir = 'dist/apps';
const foldersToMove = ['cu-std-forms', 'cu-std-ocr', 'cu-std-home'];
const destination = join(baseDir, 'cu-std-plat');

foldersToMove.forEach((folder) => {
  const currentPath = join(baseDir, folder);
  const newPath = join(destination, folder);

  rename(currentPath, newPath, (err) => {
    if (err) {
      console.error(`Error moving ${folder}:`, err);
    } else {
      console.log(`${folder} moved successfully to ${destination}`);
    }
  });
});
