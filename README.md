# Nuestra Historia

Sitio web interactivo con libro digital (flipbook) y propuesta animada, construido para Juanita.

## Estructura del proyecto

```
Propuesta/
├── index.html          # Homepage con botones "Propuesta" y "Libro"
├── propuesta.html      # Flujo interactivo de la propuesta (juegos, preguntas, celebracion)
├── libro.html          # Libro digital tipo flipbook
├── libro.css           # Estilos del flipbook
├── libro.js            # Logica del flipbook + paginacion dinamica
├── style.css           # Estilos de la propuesta
├── script.js           # Logica de juegos y propuesta
├── test-libro.html     # Pruebas automatizadas del flipbook
├── img/                # Imagenes (linternas, torres, pascal, nubes, etc.)
├── package.json        # Dependencias (Vercel Analytics)
└── .gitignore
```

## Tecnologias

- **StPageFlip** (libreria vanilla JS sin dependencias) para el efecto realista de paso de paginas con arrastre
- **Tailwind CSS** (CDN) en la homepage y propuesta
- **CSS custom** para el flipbook con diseño responsive (vw/vh)
- **Vercel Analytics** para metricas
- **Vercel** para deploy continuo desde GitHub

## Funcionalidades

### Homepage (`index.html`)
- Boton "Propuesta" → redirige a la experiencia interactiva
- Boton "Libro" → abre el flipbook digital

### Propuesta (`propuesta.html`)
- Pantalla de bienvenida
- Juego 1: Encontrar la linterna magica
- Juego 2: Encontrar a Pascal entre arbustos
- Juego 3: Subir la torre de Rapunzel
- Pantalla de propuesta con botones "Si" / "No"
- Pantalla de celebracion con confeti

### Libro digital (`libro.html`)
- **Portada** (hard cover) con diseño profesional
- **Hojas en blanco** entre secciones como un libro real
- **Pagina de titulo** centrada
- **Agradecimientos**
- **Indice** profesional con lineas punteadas y numeros de pagina
- **Introduccion** con paginacion dinamica: el texto se divide automaticamente en paginas midiendo el overflow real del DOM
- **6 capitulos** de contenido
- **Contraportada** con boton para volver al inicio
- **Encabezados** con numero de pagina (izquierda/derecha) y titulo centrado
- Navegacion: arrastre de esquina, flechas, teclado, indice overlay
- **Responsive**: modo portrait automatico en moviles
- **Pruebas automatizadas** (`test-libro.html`) con 15+ casos de verificacion

## Sistema de Paginación Dinámica del Libro

Para lograr que el libro digital funcione exactamente como un libro real en la vida real sin cortar ningún texto ni perder oraciones, se implementó un algoritmo de paginación dinámica generalizado en JavaScript y CSS:

### 1. Medición de Dimensiones Físicas Reales (`getPageDimensions`)
- `StPageFlip` fuerza una relación de aspecto fija de `520 : 860` (`0.60465`).
- La función `getPageDimensions` calcula de forma precisa la dimensión exacta en píxeles `(width, height)` que tendrá cada hoja dentro del visor tanto en escritorios (doble página) como en móviles (página individual).

### 2. Estructura Flexbox y Delimitación Útil (`.page-inner`)
- Cada página `.book-page` utiliza `display: flex; flex-direction: column;`.
- El texto habita dentro de un contenedor `.page-inner` con altura explícita y `box-sizing: border-box`.
- Esto separa la altura de los encabezados (`.page-hdr`) de la zona imprimible de texto, eliminando cualquier riesgo de que el texto inferior sea empujado y cortado por `overflow: hidden`.

### 3. Paginación Generalizada y Búsqueda Binaria por Palabras (`paginateSection`)
- Se aplica tanto a la **Introducción** como a la totalidad de los **6 Capítulos**.
- Cuando un párrafo, lista o cita desborda la página actual, una **búsqueda binaria por palabras** encuentra el punto exacto máximo de corte sin romper oraciones.
- Las palabras sobrantes pasan automáticamente a la parte superior de la página siguiente, manteniendo al 100% el texto original y las clases de estilo (`.quote`, `.reasons`, `.signature`, `.ch-title`).
- Se añadió un fallback de altura segura en `getTargetHeight()` para evitar colapsos de medición off-screen.

### 4. Índice Dinámico y Repaginación en Caliente
- Actualiza dinámicamente el **Índice (TOC)** profesional y las etiquetas de encabezado de página.
- Mantiene un total par de páginas para garantizar que la **Contraportada** quede ubicada en la parte exterior trasera.
- Escucha el evento `resize` para recalcular la paginación al cambiar el tamaño de ventana o girar el móvil, restaurando al instante la página de lectura.

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Servir localmente (necesario para test-libro.html)
npx serve .

# Los tests estan en:
# http://localhost:3000/test-libro.html
```

## Deploy

El sitio se despliega automaticamente en Vercel al hacer push a `main`.
