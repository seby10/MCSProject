# 🗳️ Sistema de Gestión de Procesos Electorales

Este proyecto es una plataforma web diseñada para gestionar y visualizar información relacionada con procesos electorales. Los usuarios pueden explorar candidatos, sus propuestas y eventos, interactuar con sugerencias y realizar votaciones. Además, incluye herramientas administrativas para gestionar el contenido del sistema.

---

## 🚀 **Características Principales**

### 👥 **Usuario General**
- 🔹 **Candidatos**: Visualiza información detallada sobre los candidatos y sus propuestas, permitiendo a los usuarios tomar decisiones informadas.
- 🔹 **Propuestas**: Examina las propuestas de cada candidato de manera detallada, organizadas por categorías como economía, educación, y salud.
- 🔹 **Eventos**: Consulta eventos relacionados con los candidatos, como debates, conferencias o encuentros con la ciudadanía.
- 🔹 **Sugerencias y Votos**: Envía sugerencias o participa en votaciones de forma interactiva, fomentando la participación ciudadana.

### 🔧 **Administradores**
- 🛠️ **Gestión de Contenidos**:
  - Visualiza todos los datos de la página en un panel centralizado.
  - Edita la personalización del sistema, información de candidatos, propuestas y eventos mediante una interfaz amigable.
  - Los elementos existentes pueden ser modificados, garantizando un sistema dinámico y actualizado.
- 📊 **Panel de Control**:
  - Acceso a métricas y estadísticas clave del sistema, como el número de votantes y sugerencias enviadas.

---

## 🛠️ **Tecnologías Utilizadas**

### Backend:
- 🟢 **Node.js**: Plataforma basada en JavaScript para construir aplicaciones escalables y de alto rendimiento. Permite manejar múltiples solicitudes de forma eficiente.
- 💀 **Express.js**: Framework minimalista y flexible para Node.js que facilita la creación de API RESTful. Se utiliza para gestionar rutas, middlewares y solicitudes HTTP.

### Frontend:
- 🌈 **Bootstrap**: Framework CSS que garantiza un diseño responsivo, adaptable a dispositivos móviles y con estilos modernos. Incluye componentes reutilizables como menús, formularios y botones.
- 🗭️ **HTML5 y CSS3**: Lenguajes base para la estructura y estilos de la interfaz de usuario. HTML5 permite incluir multimedia y formularios avanzados, mientras que CSS3 asegura personalización estética.

### Base de Datos:
- 💾 **MySQL**: Base de datos SQL utilizada para almacenar información estructurada, como candidatos, propuestas y eventos. Ofrece flexibilidad y escalabilidad.

---

## ⚙️ **Instalación y Configuración**

1. Clona este repositorio:
   ```bash
   git clone https://github.com/seby10/MCSProject.git
   ```
2. Instala las dependencias del backend:
   ```bash
   cd MCSProject
   npm install
   ```
3. Configura la conexión a la base de datos en el archivo `connection.js`:
   ```
    export const getConnection = async () => {
      return await mysql.createConnection({
        host: 'localhost',   //Tu host     
        user: 'root',       //Tu usuario de base de datos
        password: '',       //Tu contraseña
        database: 'elecciones2024',  //Nombre de tu base de datos
        port:3306, //Puerto de la base de datos
      });
    };
   ```
4. Inicia el servidor:
   ```bash
   node app.js
   ```
5. Abre tu navegador y accede a:
   [http://localhost:4000](http://localhost:4000)

---

## 💻 **Uso**

### 👥 **Usuario General**
- Explora la lista de candidatos desde la página principal.
- Haz clic en un candidato para ver sus propuestas detalladas.
- Consulta eventos disponibles relacionados con los candidatos.
- Utiliza la ventana de sugerencias para enviar opiniones o votar en encuestas.

### 🔧 **Administradores**
- Accede al panel administrativo con tus credenciales.
- Gestiona información de candidatos, propuestas y eventos desde un entorno seguro.
- Personaliza la interfaz de usuario y agrega nuevas categorías de contenido.

---

## 📊 **Evidencia de Uso de GitFlow en GitHub**

Este proyecto sigue la metodología GitFlow para un flujo de trabajo profesional:
1. **Ramas principales:**
   - **`main`**: Contiene el código de producción completamente funcional.
   - **`develop`**: Incluye el código en desarrollo con las últimas funcionalidades añadidas.
2. **Ramas auxiliares:**
   - **`feature/*`**: Desarrollo de nuevas funcionalidades específicas.
   - **`hotfix/*`**: Corrección de errores críticos en producción.
   - **`release/*`**: Preparación de nuevas versiones antes de la integración en `main`.

---

## 📈 **Resultados y Discusión**

### Resultados Obtenidos:
- ✅ Desarrollo de una página web funcional para la gestión de contenido electoral.
- ✅ Implementación de una API REST para interacción entre frontend y backend.
- ✅ Uso efectivo de GitHub para control de versiones, con seguimiento de cambios en cada etapa del proyecto.
- ✅ Integración de MySQL como base de datos para almacenamiento eficiente de datos.
- ✅ Uso de Bootstrap para garantizar un diseño responsivo.

### Mejoras Futuras:
- Optimización de rendimiento para soportar mayores volúmenes de usuarios simultáneos.
- Adición de notificaciones en tiempo real mediante WebSockets.
- Integración con redes sociales para compartir propuestas y eventos.
- Desarrollo de una aplicación móvil complementaria.
- Pruebas adicionales para garantizar escalabilidad y accesibilidad en distintos entornos.

---

## 📝 **Créditos y Colaboradores**

Equipo de desarrollo comprometido con la creación de una solución integral para la gestión de procesos electorales:
- **Sebastián Constante**
- **Jhanina Conterón**
- **Pablo Montero**
- **Daylé García**

---

## 📚 **Glosario Técnico**

- **API REST**: Interfaz de programación que permite la comunicación entre sistemas mediante solicitudes HTTP.
- **Node.js**: Entorno de ejecución de JavaScript que opera en el lado del servidor.
- **Express.js**: Framework web para Node.js que simplifica la gestión de solicitudes y respuestas.
- **Bootstrap**: Herramienta para crear interfaces web modernas y responsivas.
- **MySQL**: Base de datos orientada a documentos para manejo eficiente de datos relacionales.

