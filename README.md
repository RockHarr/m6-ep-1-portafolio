# 🎨 Portafolio Frontend — Módulo 6

Landing page tipo portafolio construida con **Vue 3** como proyecto final del Módulo 6 del curso de Frontend. Presenta los proyectos y ejercicios realizados durante el curso en un diseño dark premium con efectos visuales elegantes.

## 🔧 Fixes Aplicados (Pre-Entrega)

**Bug #1 - Navbar vacío**: Corregido mapeo de datos desde `portfolioData.nav.links` (antes intentaba leer `navLinks` que no existía en el JSON).

**Bug #2 - Imágenes faltantes**: Agregados 4 assets PNG generados (Axis, Nexus, Spark, Profile) en `src/assets/img/` para eliminar warnings de build.

**Pulidos**: Agregado `type="button"` a botones de navegación para mejor accesibilidad.

---

## ✅ Cumplimiento de la Rúbrica (PDF)

| Criterio                      | Implementación                                                   |
| ----------------------------- | ---------------------------------------------------------------- |
| Landing page funcional        | `HomeView.vue` como landing completa                             |
| Navbar                        | `NavBar.vue` con links funcionales + logout                      |
| Cards                         | `InfoCard.vue` renderizadas dinámicamente                        |
| Data centralizada en JSON     | `src/assets/portfolio.json` con todo el contenido                |
| Cards por props               | InfoCard recibe title, summary, tags, etc. por props             |
| Render dinámico con `v-for`   | `CardsGrid.vue` itera items filtrados con v-for                  |
| Modularización en componentes | 9 componentes SFC separados                                      |
| Uso del ciclo de vida         | `onMounted` en HomeView para cargar el JSON                      |
| Estilos con `<style>`         | Tokens CSS, animaciones, focus ring en style.css + scoped styles |

---

## 🚀 Valor Agregado

### 🔐 Login Demo

- **Usuario**: `profe` / **Contraseña**: `1234`
- Autenticación simulada con **Pinia** + **localStorage**
- Navigation guard que protege la ruta `/` y redirige a `/login`
- **Nota pedagógica**: Es una demo sin backend. En producción, las credenciales nunca se validan en el frontend.

### ✨ Efectos Visuales

1. **Vue Bits — SplitText** (`HeroSection.vue`): El título del Hero se divide en caracteres individuales y aparecen con un efecto reveal escalonado. Componente inspirado en [Vue Bits](https://vue-bits.dev/) (DavidHDev/vue-bits).

2. **Efecto propio — Hover lift + borde neon** (`InfoCard.vue`): Las cards se elevan 4px con sombra ampliada y borde neon cyan al hacer hover. Transición suave de 180ms.

3. **Efecto propio — Transición de rutas** (`App.vue`): Fade + slide de 300ms entre Login ⇄ Home usando `<Transition>` de Vue con `mode="out-in"`.

### 💡 Mejoras Adicionales

- **Stagger en cards** (Mejora #1): Las cards aparecen escalonadas usando `<TransitionGroup>` con delay incremental.
- **Tag colors dinámicos** (Mejora #2): Cada tecnología tiene un color único asignado (Vue verde, Pinia dorado, etc.).
- **Loading state en login** (Mejora #3): Spinner de 300ms que simula latencia de red al autenticarse.
- **Scroll-to-section** (Mejora #4): Los links del NavBar navegan suavemente a la sección correspondiente.
- **Badge de tipo** (Mejora #5): Chip `PROYECTO` / `EJERCICIO` con color diferenciado en cada card.
- **StatusBadge** (Mejora #7): Micro-componente extraído para demostrar composición granular.

---

## 🛠️ Stack Tecnológico

| Tecnología      | Rol                                         |
| --------------- | ------------------------------------------- |
| Vue 3           | Framework reactivo (Composition API)        |
| Vite            | Build tool + dev server                     |
| Vue Router      | Navegación + navigation guard               |
| Pinia           | Estado global (auth store)                  |
| Tailwind CSS v4 | Framework de utilidades CSS                 |
| Vue Bits        | Inspiración para SplitText (text animation) |

---

## 📁 Estructura del Proyecto

```
m6-ep-1/
├─ public/favicon.svg
├─ src/
│   ├─ assets/
│   │   ├─ portfolio.json       ← JSON centralizado
│   │   └─ img/                 ← Imágenes de personajes
│   │       ├─ profile.png
│   │       ├─ axis.png
│   │       ├─ nexus.png
│   │       └─ spark.png
│   ├─ components/
│   │   ├─ NavBar.vue           ← Navegación + logout
│   │   ├─ HeroSection.vue      ← Hero con SplitText
│   │   ├─ SplitText.vue        ← Animación de texto (Vue Bits)
│   │   ├─ AboutSection.vue     ← Sección "Sobre Mí" con perfil
│   │   ├─ SectionHeader.vue    ← Encabezado de sección + mascotas
│   │   ├─ CardsGrid.vue        ← Grid + TransitionGroup
│   │   ├─ InfoCard.vue         ← Card con hover effect
│   │   ├─ StatusBadge.vue      ← Badge de estado
│   │   └─ FooterSection.vue    ← Footer
│   ├─ views/
│   │   ├─ HomeView.vue         ← Landing (protegida)
│   │   └─ LoginView.vue        ← Login demo con Axis
│   ├─ stores/auth.js           ← Pinia auth store
│   ├─ router/index.js          ← Rutas + guard
│   ├─ App.vue                  ← Raíz + transición rutas
│   ├─ main.js                  ← Entry point
│   └─ style.css                ← Tokens + animaciones + a11y
├─ index.html
├─ vite.config.js
└─ package.json
```

---

## ▶️ Cómo Correr el Proyecto

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción (opcional)
npm run build
```

El proyecto corre en `http://localhost:5173` por defecto.

---

## ♿ Accesibilidad

- **`prefers-reduced-motion`**: Todas las animaciones (SplitText, hover, stagger, transiciones de ruta) se desactivan automáticamente si el usuario tiene esta preferencia activada en su sistema operativo.
- **Focus ring visible**: Todos los elementos interactivos tienen un outline neon visible al navegar con teclado (`:focus-visible`).
- **Contraste**: El modo oscuro usa ratios de contraste adecuados (texto claro sobre fondos oscuros).
- **ARIA**: Roles y labels en navbar, alertas de login, y secciones.

---

## 📝 Comentarios Pedagógicos

Cada archivo del proyecto incluye comentarios por bloque lógico explicando:

- **Por qué** existe ese bloque/componente
- **Qué** hace y cómo se conecta con el resto
- **Cómo** fluye la data (props, stores, JSON)

Se evitan comentarios obvios ("esto es un div") y se priorizan los que aportan valor educativo.

---

## 🤖 Personajes & Mascotas

El portafolio incluye 4 personajes ilustrados que le dan identidad única:

- **Axis (Robot Azul)**: Guardián del login, flota sobre el formulario de acceso
- **Nexus (Robot Morado)**: Acompaña la sección de Proyectos con glow morado
- **Spark (Robot Amarillo)**: Energiza la sección de Ejercicios con efecto eléctrico
- **Perfil Personal**: Sección "Sobre Mí" con ilustración del autor

Todos los personajes tienen animaciones flotantes suaves y efectos de glow que respetan `prefers-reduced-motion`.

---

## 🔍 Para Revisores (Peer Review)

### Puntos Clave a Verificar

1. **Funcionalidad del Login**: Probar con credenciales correctas (`profe`/`1234`) e incorrectas
2. **Navegación**: Los links del navbar deben hacer scroll suave a las secciones
3. **Responsive**: Verificar en mobile (cards 1 col), tablet (2 cols), desktop (3 cols)
4. **Animaciones**: Observar el stagger de las cards al cargar cada sección
5. **Persistencia**: Cerrar sesión, recargar página → debe redirigir a login
6. **Accesibilidad**: Navegar con Tab, verificar focus visible en todos los elementos

### Estructura de Código

- **Componentes**: Cada uno tiene responsabilidad única y está bien documentado
- **Props vs State**: Las cards son componentes puros (solo props), el estado está en stores/views
- **JSON Centralizado**: Todo el contenido editable está en `portfolio.json`

### Posibles Mejoras Sugeridas

- [ ] Agregar más proyectos/ejercicios al JSON
- [ ] Implementar filtros por tecnología en las cards
- [ ] Agregar modo claro/oscuro toggle
- [ ] Conectar a un backend real para autenticación
- [ ] Agregar animaciones de página de carga

---

## ⚠️ Limitaciones Conocidas

- **Autenticación**: Es solo demo frontend. Las credenciales están hardcodeadas en el store.
- **Imágenes**: Las rutas de assets usan `new URL()` de Vite. Si las imágenes no cargan, verificar que estén en `src/assets/img/`.
- **Tailwind v4**: Usa la sintaxis `@theme` que puede generar warnings en algunos editores (es normal, funciona correctamente).

---

## 📦 Dependencias Principales

```json
{
  "vue": "^3.5.0",
  "vue-router": "^4.5.0",
  "pinia": "^3.0.0",
  "tailwindcss": "^4.0.0",
  "vite": "^6.1.0"
}
```

---

## 👤 Autor

**Rockwell Harrison** — 2026  
Curso de Frontend · Módulo 6

---

## 📄 Licencia

Este proyecto es de uso educativo para el curso de Frontend.
