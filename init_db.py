import sqlite3
import os

print("Ruta actual:", os.getcwd())

db_path = os.path.join(os.getcwd(), "puntos.db")
print("Creando base de datos en:", db_path)

conn = sqlite3.connect("puntos.db")
c = conn.cursor()

c.execute('''
CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    puntos INTEGER NOT NULL
)
''')

conn.commit()
conn.close()

print("Base de datos creada con éxito.")