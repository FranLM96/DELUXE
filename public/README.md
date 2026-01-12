# Public Assets

Esta carpeta contiene los archivos públicos estáticos de la aplicación Deluxe.

## Estructura

- **logos/** - Logotipos de la aplicación (logo principal, favicon, etc.)
- **images/** - Imágenes estáticas (iconos, fondos, etc.)

## Cómo usar

Los archivos en esta carpeta se sirven directamente desde la raíz de la aplicación. 

Para referenciar un archivo, usa:
```tsx
// Logo
<img src="/logos/deluxe-logo.png" alt="Deluxe Logo" />

// Imagen
<img src="/images/background.jpg" alt="Background" />
```

## Tamaño recomendado para logos

- **Favicon**: 32x32px o 64x64px (ICO, PNG)
- **Logo Principal**: 200x100px (PNG con fondo transparente)
- **Logo de marca**: 1024x1024px (PNG con fondo transparente)
