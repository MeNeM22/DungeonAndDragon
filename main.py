from fastapi import FastAPI
from pydantic import BaseModel
import sqlite3
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# Crea la aplicación FastAPI
app = FastAPI()

# Permitir solicitudes CORS desde todos los orígenes (localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las solicitudes, puedes especificar orígenes si lo prefieres
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Función para obtener la conexión a la base de datos
def get_db_connection():
    conn = sqlite3.connect('puntuaciones.db', check_same_thread=False)
    conn.row_factory = sqlite3.Row  # Esto permite acceder a los resultados por nombre de columna
    return conn

# Crea la tabla si no existe
def create_table():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS puntuaciones (
                        id INTEGER PRIMARY KEY,
                        nombre TEXT NOT NULL,
                        puntos INTEGER NOT NULL
                    )''')
    conn.commit()
    conn.close()

# Llama a la función para crear la tabla al iniciar la aplicación
create_table()

# Modelo para recibir datos de puntuaciones
class Puntuacion(BaseModel):
    nombre: str
    puntos: int

# Ruta para la raíz del servidor (mostrar jugadores y puntuaciones)
@app.get("/")
async def root():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT nombre, puntos FROM puntuaciones ORDER BY puntos DESC LIMIT 10')
    ranking = cursor.fetchall()
    conn.close()

    # Si no hay resultados, devolver un mensaje
    if not ranking:
        return {"mensaje": "No hay puntuaciones disponibles."}

    # Devolver los resultados en formato JSON
    return [{"nombre": r[0], "puntos": r[1]} for r in ranking]

@app.post("/guardar")
async def guardar_puntuacion(puntuacion: Puntuacion):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO puntuaciones (nombre, puntos) VALUES (?, ?)", 
                   (puntuacion.nombre, puntuacion.puntos))
    conn.commit()
    conn.close()
    return {"mensaje": "Puntuación guardada correctamente"}
