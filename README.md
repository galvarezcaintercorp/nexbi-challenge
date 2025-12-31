# Nexbi Challenge - Pokémon Trainer App

## 🎯 Descripción del Proyecto

Este es el proyecto base para el desafío técnico de desarrollo frontend. La aplicación permite a un entrenador Pokémon gestionar su colección de criaturas capturadas.

## 📦 Estado Actual

El proyecto contiene:
- ✅ Configuración básica de Angular 17
- ✅ Angular Material configurado
- ✅ Componente de lista de Pokémon (vista principal)
- ✅ Modelo de datos básico
- ✅ Servicio básico para PokeAPI
- ⚠️ **El código contiene malas prácticas intencionadas que deben ser corregidas**

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (v18 o superior)
- npm (v9 o superior)

### Pasos para ejecutar

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar el servidor de desarrollo:
```bash
npm start
```

3. Abrir el navegador en: `http://localhost:4200/`

## 📝 Tareas del Desafío

Consulta el archivo `CHALLENGE.md` en la carpeta raíz del repositorio para ver las especificaciones completas del desafío técnico.

### Resumen de tareas principales:

1. **Vista de Detalle** de Pokémon capturado
2. **Página 404** para rutas inexistentes
3. **Funcionalidad de Captura** (añadir Pokémon desde PokeAPI)
4. **Funcionalidad de Edición** de datos de captura
5. **Funcionalidad de Liberación** (eliminar Pokémon)
6. **Organización en capas** con arquitectura limpia
7. **Identificar y corregir malas prácticas** presentes en el código base
8. **Mejoras opcionales** (localStorage, tests, animaciones, etc.)

## 🏗️ Estructura del Proyecto

```
src/app/
├── models/           # Modelo de datos básico
├── services/         # Servicio básico de API
├── pokemon-list.component.ts  # Componente principal
├── app.component.ts
└── app.config.ts
```

**Nota**: Esta estructura es inicial. Se espera que reorganices el código aplicando mejores prácticas de arquitectura.

## 🔗 Recursos

- [Documentación de Angular](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [PokeAPI Documentation](https://pokeapi.co/docs/v2)
- [RxJS](https://rxjs.dev/)

## 📊 Criterios de Evaluación

- **Arquitectura y Organización (40%)** - Peso mayor
- **Funcionalidad (25%)**
- **Calidad del Código (20%)**
- **Mejores Prácticas de Angular (10%)**
- **UI/UX (5%)**

## ⚠️ Importante

Este proyecto base contiene **intencionadamente malas prácticas** que debes identificar, documentar y corregir como parte de la evaluación.

## 🛠️ Comandos Útiles

- `npm start` - Iniciar servidor de desarrollo
- `npm run build` - Compilar proyecto para producción
- `npm test` - Ejecutar tests unitarios
- `ng generate component <nombre>` - Crear nuevo componente

---

**¡Buena suerte con el desafío!** 🍀
