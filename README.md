# ✅ Lista de Tareas

Aplicación de tareas pendientes construida con JavaScript puro. Permite crear, completar, editar y eliminar tareas, con persistencia en el navegador y filtros por estado.

**Demo en vivo:** [pega aquí tu link de Vercel/Netlify]

![Captura de la app](./screenshot.png)

## Funcionalidades

- Crear tareas con validación (no permite tareas vacías ni duplicadas)
- Marcar como completada / pendiente
- Editar el texto de una tarea con doble clic
- Eliminar tareas individuales
- Filtrar por: todas, pendientes, completadas
- Eliminar todas las completadas de una vez
- Persistencia con `localStorage`: la lista se mantiene aunque cierres el navegador
- Diseño responsive y modo claro/oscuro automático según el sistema

## Tecnologías

- HTML5
- CSS3 (variables CSS, Flexbox)
- JavaScript (ES6+) — sin frameworks ni librerías

## Cómo correrlo localmente

Este proyecto no necesita instalación ni build. Solo:

1. Clona el repositorio
   ```bash
   git clone https://github.com/tu-usuario/lista-de-tareas.git
   ```
2. Abre el archivo `index.html` en tu navegador (doble clic, o con la extensión "Live Server" de VS Code)

## Qué aprendí construyendo esto

- A manejar el estado de una aplicación sin un framework, usando arreglos de JavaScript como única fuente de verdad
- A persistir datos en el navegador con `localStorage`, incluyendo manejo de errores si el almacenamiento falla
- A pensar en estados vacíos: qué le muestro al usuario cuando no hay tareas, o cuando un filtro no tiene resultados
- Buenas prácticas de accesibilidad: `aria-label`, `aria-pressed` en los filtros y foco visible con teclado

## Posibles mejoras futuras

- Arrastrar y soltar para reordenar tareas
- Fechas de vencimiento y recordatorios
- Sincronizar con una base de datos (Firebase o similar) en vez de `localStorage`

---

Proyecto creado como parte de mi portafolio de desarrollo frontend. [Ver portafolio completo](#)
