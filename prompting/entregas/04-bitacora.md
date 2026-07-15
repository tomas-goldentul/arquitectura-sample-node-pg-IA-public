# 📓 Bitácora de Prompts — Ejercicio N° _04__

> Copiá este archivo por cada ejercicio que entregues. Nombralo, por ejemplo, `entregas/01-bitacora.md`.
> Esta bitácora **es parte de la nota**. Un ejercicio sin bitácora no se corrige.

---

## Datos

- **Alumno/a:** _Tomas Goldentul__
- **Ejercicio:** N° _04__ — _____validaciones______________
- **Fecha:** _15/7__
- **Modelo de IA usado:** (ej: ChatGPT, Claude, Gemini, Copilot) _Gemini__

---

## 1. 🎯 Qué me pidieron

Resumí en 2–3 líneas el objetivo del ejercicio con tus palabras (no copiado del enunciado).

```
El objetivo del ejercicio es ordenar el código para que los helpers solo se encarguen de verificar si los datos de la aplicación son correctos o no. Asi dejamos que el controller sea el único que decida cómo responderle al usuario y qué error mostrar en cada situación.
```

---

## 2. 💬 Mis prompts (en orden)

Pegá **todos** los prompts que usaste, en orden, con la respuesta resumida y qué hiciste con ella. Agregá tantos como necesites.

### Prompt #1

**Lo que escribí:**
```
# ROL
Actua como analista en node.js

# CONTEXTO
Estoy construyendo un proyecto y necesito que desarolles un patron de validacion

# TAREA
Implementa  validaciónes de input antes de llegar al repository usando middlewareCrear un helper que valide y convierta el id (p. ej. parsearId en src/helpers/validaciones-helper.js) y usarlo en GET /:id, PUT /:id y DELETE /:. Un id no numérico tiene que devolver un código claro (400), no un 500.
Unificar los códigos de error: 400 para input inválido, 404 para no encontrado, 409 para conflicto, 500 para error inesperado. Que sea consistente entre entidades.
Devolver mensajes de error útiles para el cliente pero que no filtren detalles internos de la base.
```

**Auto-chequeo de las 5 partes EFSI** (marcá lo que incluiste):
- [x] Rol
- [x] Contexto (¿pegaste código del proyecto?)
- [x] Tarea
- [x] Restricciones
- [ ] Iteración

**Qué me devolvió (resumen):**
```
Me devolvió un helper que valida y convierte los IDs para las rutas GET, PUT y DELETE, evitando que un ID con letras rompa la base de datos. Además, implementó códigos de error claros como el 400, 404, 409 y 500.  
```

**¿Me sirvió tal cual, o tuve que corregir/repreguntar?**
```
No me sirvio tal cual ya que la IA había puesto originalmente los códigos de estado HTTP dentro del helper, por lo que hice que esta responsabilidad sola la tenga los controllers
```

### Prompt #2

**Lo que escribí:**
```
# ROL
Actuá como un desarrollador Backend Senior especializado en Node.js, Express y diseño de APIs REST, siguiendo principios de Clean Architecture y separación de responsabilidades.

# CONTEXTO
En el proyecto creaste un helper de validaciones que devuelve códigos de estado HTTP (por ejemplo, 400, 404 y 409). Quiero modificar esto para que la lógica de validación no dependa del protocolo HTTP.
El objetivo es que únicamente los controllers sean responsables de construir la respuesta HTTP y decidir qué status code devolver.

# TAREA
Modifica el código para cumplir con esto: Los helpers de validación no pueden devolver códigos HTTP, Los helpers solo validan los datos.
Los controllers deben interpretar el resultado de la validación y decidir qué código HTTP devolver (400, 404, 409, etc.).

# RESTRICCIONES
No modificar la lógica de negocio existente, no cambies nombres de endpoints, no introducir dependencias o librerías nuevas., mantener el código lo más limpio y reutilizable posible.
Evitar duplicación de lógica.
Conservar el comportamiento actual de la aplicación; únicamente cambiar la distribución de responsabilidades.
Mantener el estilo de código ya utilizado en el proyecto.
```
**Por qué necesité este segundo prompt** (qué falló o faltó en el anterior):
```
Necesité este segundo prompt porque me di cuenta de que el helper decidia los status codes. Entonces escribi este segundo prompt para que solo los controllers fueran los  encargados de manejar las respuestas  y decidir los status codes según el resultado de cada validación.
```

*(Repetí la estructura para cada prompt. Si resolviste todo con un solo prompt gigante, ⚠️ eso es 🟡 según EFSI — explicá por qué.)*

---

## 3. 🔧 Qué hizo la IA y qué hice yo

Marcá esto **también en el código** con comentarios `// [IA]` y `// [YO]`. Acá resumilo:

| Archivo / función | Lo generó la IA | Lo modifiqué/escribí yo | Por qué |
|---|---|---|---|
| | | | |
| | | | |

---

## 4. 🐛 Errores o cosas mal que detecté en la respuesta de la IA

> Si ponés "ninguno", probablemente no las viste. **Siempre** hay algo (un import de más, un estilo distinto, un caso borde olvidado, una mala práctica de seguridad).

```
Detecté que la IA puso todos los status codes en los helpers, algo que no respeta la separacion de responsabilidades.
```

---

## 5. ✅ Verificación

Pegá el checklist de verificación del ejercicio y marcá lo que comprobaste **vos** (con qué evidencia: captura de Postman, salida de `npm test`, número de ms, etc.).

```
- [x] `POST /api/alumnos` con body `{}` devuelve **400** (no 500, no un 201 con campos vacíos).
- [x] `POST` con `id_curso` que no existe sigue devolviendo el error de negocio correcto (no rompas `validarCursoExiste`).
- [x] `GET /api/alumnos/abc` (id no numérico) devuelve **400** con un mensaje claro, no un 500 críptico.
- [x] El `id` se valida y convierte con **un solo helper** (`parsearId`), usado en `GET`, `PUT` y `DELETE` — ya no hay un endpoint con `parseInt` y otro sin él.
- [x] Los mensajes de error **no incluyen** el texto crudo del error de PostgreSQL (nombres de tablas, columnas, etc.).
- [x] La validación es **consistente**: `alumnos` y `cursos` validan con el mismo patrón.
- [x] Mostrás que entendés **dónde** pusiste la validación y por qué (no "porque la IA la puso ahí").
```

---

## 6. ✍️ Reflexión (300–600 palabras)

Cubrí: qué proceso seguiste, qué decisiones tomaste y por qué, qué aprendiste, y —lo más importante— **qué corregiste de lo que te dio la IA**. Escribí con tus palabras; esto se contrasta con el oral.

```
Para el trabajo, primero empecé por la lógica organizando las validaciones en middlewares para limpiar los datos antes de que llegaran al repositorio. Mi decisión clave fue corregir lo que me había puesto la IA, ya que al principio me devolvió un helper de validaciones que manejaba los status codes y armaba respuestas JSON . Corregí esto sacando los status codes del helper y haciendo que este solo lance errores semánticos personalizados. De esta forma, reescribí el controlador para que sea la única capa que  decida qué responder. Con esto aprendí que ahora el helper es completamente independiente y, si mañana quiero cambiar un código de error de la API, solo tengo que tocar una línea del controller.
```

---

## 7. 🔗 Adjuntos

- [ ] Link/PDF de la conversación completa con la IA
- [ ] Commit(s) en GitHub: `___Fin actividad 04_________`
- [ ] Capturas / evidencias de verificación
