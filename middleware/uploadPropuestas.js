import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar el almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Directorio donde se guardarán las imágenes
    const uploadDir = path.join(__dirname, '../wwwroot/images/propuestas');
    
    // Crear el directorio si no existe
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generar un nombre de archivo único
    cb(null, `propuesta-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Configurar los filtros de archivo
const fileFilter = (req, file, cb) => {
  // Aceptar solo ciertos tipos de archivos de imagen
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'), false);
  }
};

// Configurar Multer
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Límite de 5MB
  }
});

export default upload;