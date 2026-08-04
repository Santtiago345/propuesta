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
