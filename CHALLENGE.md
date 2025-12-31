# Desafío Técnico - Gestor de Pokémon

## 📋 Contexto

Bienvenido al desafío técnico de desarrollo frontend Nexbi. En este ejercicio trabajarás con una aplicación Angular que permite a un entrenador Pokémon gestionar su colección de criaturas capturadas.

## 🎯 Objetivo

Mejorar, completar y optimizar una aplicación de gestión de Pokémon, aplicando las mejores prácticas de Angular y demostrando tus habilidades en el desarrollo de aplicaciones web modernas.

## 🛠️ Tecnologías

- **Angular**: v17
- **Angular Material**: Para componentes UI
- **Jasmine & Karma**: Para pruebas unitarias
- **TypeScript**: Lenguaje principal
- **RxJS**: Para programación reactiva

## 🔌 API a Utilizar

El proyecto debe consumir la **PokeAPI** (API pública de Pokémon):

- **Base URL**: `https://pokeapi.co/api/v2/`
- **Documentación**: https://pokeapi.co/docs/v2

### Endpoints Relevantes:

- **Pokédex completa**: `GET /pokemon?limit=100000&offset=0` - Lista de todos los Pokémon disponibles
- **Detalle de Pokémon**: `GET /pokemon/{id o nombre}` - Información detallada de un Pokémon específico
- **Tipos de Pokémon**: `GET /type` - Lista de tipos disponibles

### Flujo de la Aplicación:

1. **Pokédex (API)**: Lista de TODOS los Pokémon disponibles que pueden ser capturados
2. **Capturados (Local)**: Lista personal del entrenador con Pokémon que ha capturado

**Importante**: 
- La **lista de capturados** NO se obtiene de la API, se gestiona localmente
- Para añadir un Pokémon, primero se busca en la Pokédex (API)
- Luego se añade a la lista de capturados con información adicional
- Deberás implementar **adaptadores/mappers** para transformar los datos de la API

### Estructura de Datos

#### Modelo de Dominio (Pokémon Capturado)

```typescript
interface CapturedPokemon {
  id: number;                    // ID único de la captura (autogenerado)
  pokemonId: number;             // ID del Pokémon en la Pokédex
  name: string;
  type: string[];
  image: string;
  hp: number;
  attack: number;
  defense: number;
  
  // Datos adicionales de captura
  captureDate: Date;             // Fecha de captura
  captureLocation: string;       // Lugar donde fue capturado (ej: "Bosque Verde")
  pokeballType: string;          // Tipo de Pokeball usada (ej: "Pokeball", "Superball", "Ultraball")
  level: number;                 // Nivel al ser capturado (1-100)
  nickname?: string;             // Apodo opcional
  description?: string;          // Descripción o notas del entrenador
}
```

#### Respuesta de la API (PokeAPI)

La respuesta de PokeAPI es extensa y contiene muchos campos. Consulta la [documentación oficial](https://pokeapi.co/docs/v2#pokemon) para ver la estructura completa.

**Ejemplo de respuesta**: `GET https://pokeapi.co/api/v2/pokemon/35` (Clefairy)

```json
{
  "id": 35,
  "name": "clefairy",
  "height": 6,
  "weight": 75,
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "fairy",
        "url": "https://pokeapi.co/api/v2/type/18/"
      }
    }
  ],
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png",
    "other": {
      "official-artwork": {
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png"
      }
    }
  },
  "stats": [
    {"base_stat": 70, "stat": {"name": "hp"}},
    {"base_stat": 45, "stat": {"name": "attack"}},
    {"base_stat": 48, "stat": {"name": "defense"}},
    {"base_stat": 60, "stat": {"name": "special-attack"}},
    {"base_stat": 65, "stat": {"name": "special-defense"}},
    {"base_stat": 35, "stat": {"name": "speed"}}
  ],
  "abilities": [...],
  "moves": [...],
  // ... muchos otros campos
}
```

**📌 Requisito Clave**: Debes crear **interfaces TypeScript** para tipar las respuestas de la API e implementar **adaptadores/mappers** para convertir los datos de la API al modelo `CapturedPokemon` de tu aplicación, extrayendo solo los campos necesarios.

## 📝 Tareas a Implementar

### 1. Vista de Detalle de Pokémon (Obligatorio)

**Requisitos:**
- Crear un componente de detalle que muestre toda la información de un Pokémon
- Implementar la navegación desde la lista hacia el detalle
- Mostrar todos los atributos del Pokémon
- Incluir un botón para volver a la lista

**Ruta esperada:** `/pokemon/:id`

### 2. Página de Error 404 (Obligatorio)

**Requisitos:**
- Crear un componente para error 404
- Mostrar esta página cuando se intente acceder a un Pokémon que no existe
- Incluir un botón o enlace para volver a la lista principal

**Ejemplo:** Si se intenta acceder a `/pokemon/999` y ese ID no existe, mostrar la página 404

### 3. Funcionalidad: Añadir Pokémon (Obligatorio)

**Flujo de Captura:**

1. **Buscar en la Pokédex**: 
   - Consumir endpoint `/pokemon?limit=100000&offset=0` para obtener lista completa
   - Implementar buscador/filtro para encontrar el Pokémon deseado
   - Mostrar lista de resultados con nombre e imagen

2. **Seleccionar Pokémon**:
   - Al seleccionar un Pokémon, obtener sus detalles completos con `/pokemon/{id}`
   - Mostrar vista previa con stats (HP, ataque, defensa, tipos)

3. **Completar datos de captura**:
   - Formulario con campos adicionales:
     - **Lugar de captura** (texto, obligatorio)
     - **Tipo de Pokéball** (select: Pokéball, Superball, Ultraball, Masterball, etc.)
     - **Nivel** (número entre 1 y 100, obligatorio)
     - **Apodo** (texto, opcional)
     - **Notas** (textarea, opcional)

**Requisitos:**
- Implementar búsqueda/filtrado eficiente en la Pokédex
- Usar Reactive Forms de Angular
- Validaciones:
  - Lugar de captura no debe estar vacío
  - Nivel debe estar entre 1 y 100
  - Tipo de Pokéball debe ser seleccionado
- **Nota**: Se permite capturar el mismo Pokémon múltiples veces (ej: puedes tener 3 Pikachus)
- Mostrar mensajes de error claros
- Al guardar, añadir a la lista local de capturados
- Actualizar contador de Pokémon capturados
- Asignar fecha de captura automáticamente
- Redirigir a la lista o al detalle del Pokémon recién capturado

**Ruta esperada:** `/pokemon/add` o modal

### 4. Funcionalidad: Editar Pokémon Capturado (Obligatorio)

**Requisitos:**
- Permitir editar solo los **datos de captura** (no los stats del Pokémon):
  - Lugar de captura
  - Tipo de Pokéball
  - Nivel
  - Apodo
  - Notas personales
- Pre-cargar los datos actuales del Pokémon capturado
- Los datos base del Pokémon (nombre, tipo, HP, ataque, defensa, imagen) NO son editables
- Aplicar las mismas validaciones que en el formulario de captura
- Permitir cancelar la edición
- Al guardar, actualizar los datos en el almacenamiento local y mostrar confirmación

**Ruta esperada:** `/pokemon/:id/edit` o modal

### 5. Funcionalidad: Eliminar Pokémon Capturado (Obligatorio)

**Requisitos:**
- Añadir opción para "liberar" (eliminar) un Pokémon de la lista de capturados
- Mostrar un diálogo de confirmación con el mensaje tipo: "¿Estás seguro de liberar a [nombre]?"
- Eliminar el Pokémon del almacenamiento local
- Actualizar la lista y el contador de Pokémon capturados
- Mostrar mensaje de confirmación tras la liberación

### 6. Arquitectura y Organización del Código (Obligatorio)

**Este es uno de los aspectos más importantes del desafío.** Debes demostrar tu capacidad para organizar código en capas bien definidas.

#### Estructura de Capas (Sugerida):

La siguiente es una estructura sugerida. Puedes modificarla si consideras que hay una mejor organización:

```
src/app/
├── core/
│   ├── models/           # Interfaces y tipos
│   ├── services/         # Servicios de lógica de negocio
│   └── adapters/         # Adaptadores/Mappers para transformar datos de API
├── shared/
│   └── components/       # Componentes reutilizables
├── features/
│   └── pokemon/
│       ├── components/   # Componentes presentacionales
│       ├── containers/   # Componentes contenedores (smart)
│       └── pokemon.routes.ts
```

Si decides usar una estructura diferente, documenta tu decisión y justificación en el README.md.

**Notas sobre la arquitectura**:
- Se evaluará la implementación del **patrón Presentational/Container** en la organización de componentes
- Se evaluará la creación e implementación de **adaptadores/mappers** para transformar datos de la API
- La implementación específica de ambos patrones queda completamente a criterio del desarrollador

### 7. Identificación y Corrección de Malas Prácticas (Obligatorio)

El código inicial contiene **intencionadamente malas prácticas**. Tu tarea es:

1. **Identificar** todas las malas prácticas presentes en el código
2. **Documentar** en el README.md qué malas prácticas encontraste y por qué las consideras inadecuadas
3. **Corregir** todas las malas prácticas aplicando las mejores prácticas de Angular

### 8. Mejoras Opcionales (Plus)

Estas mejoras no son obligatorias pero sumarán puntos:

- ✨ **Persistencia con localStorage**: Guardar la lista de capturados en localStorage
- ✨ **Estadísticas**: Panel con estadísticas (total capturados, por tipo, nivel promedio, etc.)
- ✨ Implementar búsqueda/filtrado avanzado en la Pokédex al capturar
- ✨ Agregar ordenamiento por diferentes criterios (nombre, nivel, tipo, fecha de captura)
- ✨ Implementar paginación en la lista de capturados
- ✨ **Sistema de logros**: Badges por capturar cierta cantidad o tipos específicos
- ✨ Añadir animaciones con Angular Animations (captura, liberación)
- ✨ Implementar un sistema de favoritos dentro de los capturados
- ✨ Crear tests unitarios para los nuevos componentes y servicios
- ✨ Implementar guardias de ruta (CanDeactivate para formularios sin guardar)
- ✨ Agregar manejo de estado con signals (Angular 17+)
- ✨ **Exportar/Importar**: Exportar lista de capturados a JSON
- ✨ **Vista de comparación**: Comparar stats de dos Pokémon capturados

## 📊 Criterios de Evaluación

Tu trabajo será evaluado según los siguientes criterios:

### Arquitectura y Organización (40%) ⭐ **PESO MAYOR**

#### Separación de Capas (15%)
- ✅ Código organizado en capas bien definidas (models, services, adapters)
- ✅ Separación clara de responsabilidades
- ✅ Servicios contienen lógica de negocio, no los componentes
- ✅ Adaptadores/Mappers correctamente implementados

#### Patrón Presentational/Container (15%)
- ✅ Componentes contenedores gestionan estado y lógica
- ✅ Componentes presentacionales solo manejan UI
- ✅ Comunicación correcta mediante @Input/@Output
- ✅ Componentes presentacionales sin inyección de servicios
- ✅ Componentes reutilizables y desacoplados

#### Manejo de API (10%)
- ✅ Adaptadores transforman correctamente PokemonApiResponse → Pokemon
- ✅ Servicios procesan respuestas antes de enviarlas a componentes
- ✅ Tipado fuerte en respuestas de API (no usar `any`)
- ✅ Manejo de errores en llamadas HTTP
- ✅ Componentes reciben datos ya procesados/adaptados

### Funcionalidad (25%)
- ✅ Todas las características obligatorias funcionan correctamente
- ✅ La navegación es fluida y lógica
- ✅ Los formularios validan correctamente (incluidos los campos de captura)
- ✅ Integración correcta con PokeAPI para búsqueda en Pokédex
- ✅ Gestión local de Pokémon capturados funciona correctamente
- ✅ Se pueden capturar múltiples instancias del mismo Pokémon
- ✅ Página 404 funciona correctamente
- ✅ Contador de Pokémon capturados se actualiza correctamente

### Calidad del Código (20%)
- ✅ Código limpio y legible
- ✅ Uso correcto de TypeScript (tipado fuerte)
- ✅ Aplicación de principios SOLID
- ✅ Ausencia de código duplicado
- ✅ Nomenclatura clara y consistente

### Mejores Prácticas de Angular (10%)
- ✅ Corrección de todas las malas prácticas identificadas
- ✅ Uso adecuado de trackBy en ngFor
- ✅ Manejo apropiado de suscripciones (uso de async pipe o takeUntil)
- ✅ Uso de Reactive Forms
- ✅ Implementación correcta de routing

### UI/UX (5%)
- ✅ Interfaz limpia y profesional
- ✅ Uso apropiado de Angular Material
- ✅ Experiencia de usuario fluida
- ✅ Mensajes de feedback claros

### Plus (Puntos extra)
- ⭐ Tests unitarios implementados
- ⭐ Funcionalidades opcionales implementadas
- ⭐ Documentación del código
- ⭐ Commits organizados y descriptivos

## 🚀 Instrucciones de Entrega

1. **Clona el repositorio** proporcionado
2. **Crea una rama** con tu nombre: `feature/nombre-apellido`
3. **Desarrolla** las funcionalidades solicitadas
4. **Commits**: Realiza commits frecuentes y descriptivos
5. **Documentación**: Actualiza el README.md con:
   - Cambios realizados
   - Instrucciones de instalación y ejecución
   - Decisiones técnicas importantes
   - Mejoras implementadas
6. **Tests**: Ejecuta `ng test` y asegúrate de que los tests existentes pasen
7. **Build**: Verifica que `ng build` funcione sin errores
8. **Push**: Sube tu rama al repositorio
9. **Pull Request**: Crea un PR con una descripción detallada de tu trabajo

## ⏱️ Tiempo Estimado

Se estima que este desafío puede completarse en **6-8 horas** para un desarrollador semi-senior.

**No hay límite de tiempo estricto**, pero se valorará la eficiencia y gestión del tiempo.

## 📚 Recursos Permitidos

- Documentación oficial de Angular
- Documentación de Angular Material
- Stack Overflow y recursos en línea
- Tu experiencia y conocimientos previos

## ❓ Dudas y Consultas

Si tienes dudas sobre los requisitos, puedes:
- Enviar un email a [correo del reclutador]
- Tomar decisiones razonables y documentarlas en tu entrega

## 🎓 Nota Final

Este desafío está diseñado para evaluar tus habilidades técnicas, capacidad de resolución de problemas y conocimiento de las mejores prácticas de Angular. 

**No se espera perfección**, pero sí un trabajo profesional y bien pensado.

**¡Buena suerte!** 🍀

---

**Fecha de emisión**: Diciembre 2025  
**Versión**: 1.0
