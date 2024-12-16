# Sistema de Gestión de Procesos Electorales

Este proyecto es una plataforma web diseñada para gestionar y visualizar información relacionada con procesos electorales. Los usuarios pueden explorar candidatos, sus propuestas y eventos relacionados, así como interactuar con una ventana de sugerencias y votos. Además, incluye una sección de administración que permite gestionar el contenido del sistema.

## Características Principales

### Usuario General:
- **Candidatos:** Visualización de los candidatos disponibles y sus respectivas propuestas.
- **Propuestas:** Detalle de las propuestas de cada candidato.
- **Eventos:** Acceso a información sobre eventos relacionados con los candidatos y el proceso electoral.
- **Sugerencias y Votos:** Una ventana interactiva para que los usuarios envíen sugerencias o realicen votaciones.

### Administradores:
- **Gestión de Contenidos:** 
  - Edición de información sobre candidatos, propuestas y eventos.
  - Los elementos existentes no pueden ser eliminados, solo editados.
- **Panel de Control:** Acceso a una interfaz simplificada para gestionar toda la información.

## Tecnologías Utilizadas

### Backend:
- **Node.js**: Plataforma principal para el desarrollo del backend.
- **Express.js**: Framework utilizado para construir la API REST.

### Frontend:
- **Bootstrap**: Para un diseño responsivo y estilizado.
- **HTML5 y CSS3**: Lenguajes utilizados para la estructura y los estilos de la interfaz.

### Base de Datos:
- (Incluir aquí la base de datos utilizada, por ejemplo: MySQL, MongoDB, etc.)

## Instalación y Configuración

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
2. Instala las dependencias del backend:
    ```bash
    cd tu_repositorio
    npm install
3. Inicia el servidor:
    ```bash
    node app.js
    Abre tu navegador y accede a http://localhost:4000.

### Uso
**Usuario General**:
  - Explora la lista de candidatos desde la página principal.
  - Haz clic en un candidato para ver sus propuestas detalladas.
  - Revisa los eventos disponibles relacionados con los candidatos.
  - Utiliza la ventana de sugerencias para enviar tu opinión o participar en una votación.
**Administradores**:
  - Accede al panel de administración con tus credenciales.
  - Edita la información de candidatos, propuestas y eventos desde las secciones correspondientes.

