import multer from 'multer';
import path from 'path'
import crypto from 'crypto'

const tmpFolder = path.resolve(__dirname,'..','..','tmp')

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback){
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
    // destination => onde jogarei os arquivos que sao feitos os uploads na minha aplicação
    // file name
  })
}
