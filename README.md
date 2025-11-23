# Talent Tracker

Mini demo de RRHH para explorar candidatos, con login mock, i18n y UI basada en DaisyUI/Tailwind.

## Stack
- Angular 20, TypeScript, RxJS, standalone components.
- Tailwind CSS + DaisyUI (temas), SCSS.
- i18n con `@ngx-translate`.
- Jest para tests unitarios.
- Desarrollado con ayuda de Codex (asistente de código).

## Cómo arrancar
```bash
npm install
npm start
# navega a http://localhost:4200
```

## Build y servir el dist
```bash
npm run build
# salida: dist/talent-tracker/browser
# sirve estático, por ejemplo:
npx serve dist/talent-tracker/browser -l 3000
# abre http://localhost:3000
```
