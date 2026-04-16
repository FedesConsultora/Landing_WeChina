# 🇨🇳 Landing WeChina

Landing page premium para **WeChina**, una consultora de logística y comercio exterior especializada en el mercado asiático. Construida con un enfoque en performance, estética moderna y estándares actuales.

## 🚀 Tecnologías

- **Vite:** Herramienta de frontend de última generación.
- **Sass (Dart Sass):** Estructurado con un patrón modular 7-1.
- **Vanilla JS:** Ligero y de alto rendimiento.

## 🎨 Principios de Diseño

El proyecto sigue una estética **Industrial Premium**:
- **Colores:** Rojo WeChina (#da251c), Carbono Profundo y Blanco Suave.
- **Tipografía:** Outfit (Títulos) e Inter (Cuerpo) vía Google Fonts.
- **Interactividad:** Transiciones suaves, headers con glassmorphism y grillas responsivas.

## 🛠 Guía de Sass (CRÍTICO)

Para mantener un código limpio y moderno, se deben seguir estas reglas al editar estilos:

1. **NO usar `@import`:** Utilizar el sistema de módulos moderno de Sass con **`@use`**.
2. **NO usar `lighten()` ni `darken()`:** Estas funciones están deprecadas. En su lugar, usar el módulo `sass:color`:
   - Usar `color.adjust($color, $lightness: 20%)` o `color.scale()`.
   - Se proporcionan funciones de ayuda en `src/scss/abstracts/_variables.scss`.
3. **Sass Modular:** Mantener los estilos dentro de sus respectivos módulos (abstracts, base, layout, pages).

## 📦 Comenzando

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```

### Construcción para Producción
```bash
npm run build
```

---
*Creado por Antigravity para FedesConsultora.*
