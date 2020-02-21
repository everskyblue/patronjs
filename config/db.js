// ruta donde esta los archivos json
export const LOCATION_DB_PATH = location.origin + '/data/db';

// conexion local o una url donde reciba los datos
export const CONNECTION = 'stream'; // URL

// valores paso como false o string
export const DB_ROOT = LOCATION_DB_PATH + '/def.json'; 

/// se usa cuando no esta habilitado el uso del servidor
export const ABILITY_SAVE_LOCAL_DATA = true;
