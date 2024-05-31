import { join } from 'path';
import { rename } from 'fs';
const baseDir = 'dist/apps';
const foldersToMove = ['cu-std-forms', 'cu-std-ocr', 'cu-std-home'];
const destination = join(baseDir, 'cu-std-plat');

foldersToMove.forEach((folder) => {
  const currentPath = join(baseDir, folder);
  const newPath = join(destination, folder);

  handleRename(currentPath, newPath);
});


const formsLocation = 'apps/cu-std-forms-external/dist/angular-form-builder';
const formsDestination = 'dist/apps/cu-std-plat/cu-std-forms-external';
handleRename(formsLocation, formsDestination);

const chatLocation = 'apps/cu-std-chat-external/dist/VideoChatDemo';
const chatDestination = 'dist/apps/cu-std-plat/cu-std-chat-external';
handleRename(chatLocation, chatDestination);

function handleRename(currentPath, newPath) {
  rename(currentPath, newPath, (err) => {
    if (err) {
      console.error(`Error moving ${currentPath}:`, err);
    } else {
      console.log(`${newPath} moved successfully to ${destination}`);
    }
  });
}
