# 📓 Bitácora de Prompts — Ejercicio N° ___

> Copiá este archivo por cada ejercicio que entregues. Nombralo, por ejemplo, `entregas/01-bitacora.md`.
> Esta bitácora **es parte de la nota**. Un ejercicio sin bitácora no se corrige.

---

## Datos

- **Alumno/a:** _Tomas Goldentul__
- **Ejercicio:** N° _03__ — ____helpers______
- **Fecha:** ___
- **Modelo de IA usado:** (ej: ChatGPT, Claude, Gemini, Copilot) _Gemini__

---

## 1. 🎯 Qué me pidieron

Resumí en 2–3 líneas el objetivo del ejercicio con tus palabras (no copiado del enunciado).

```
El objetivo era eliminar la repeticion de codigo que había en los controllers. Esto se tenía que hacer llamando a helpers que realizen las funcionalidades que antes se repetian y asi evitar la repeticion de código.
```

---

## 2. 💬 Mis prompts (en orden)

Pegá **todos** los prompts que usaste, en orden, con la respuesta resumida y qué hiciste con ella. Agregá tantos como necesites.

### Prompt #1

**Lo que escribí:**
```
# ROL
Actuá como desarollador de node.js senior

# CONTEXTO
Quiero extraer lógica repetida a funciones reutilizables (helpers). El primero que quiero desarollar es un Helper de respuestas (responderOk, responderNotFound, responderError…) para unificar el formato de las respuestas HTTP que hoy está copiado en cada endpoint de los controllers. El segundo es  Helper de fechas: sacar calcularEdad / agregarEdad, que hoy viven adentro de alumnos-service.js, a un helper reutilizable. Ese cálculo no es lógica de "alumnos": es una utilidad de fechas que mañana podrían usar otras entidades. Tu trabajo es darte cuenta de que no pertenece al service y mudarlo a src/helpers/.

# TAREA
Necesito que reemplaces las repeticiones por llamados a los helpers.

# RESTRICCIONES
el helper tiene que ser una función pura / un módulo independiente, exportado con ES modules, y no debe cambiar la respuesta HTTP que ya devuelven los endpoints

# ITERACIÓN
Explicame donde poner el helper y cómo nombrarlo según la convención del proyecto (mirá cómo está hecho LogHelper: clase con métodos estáticos vs. funciones sueltas). Coherencia > "lo más moderno
```

**Auto-chequeo de las 5 partes EFSI** (marcá lo que incluiste):
- [X] Rol
- [X] Contexto (¿pegaste código del proyecto?)
- [X] Tarea
- [X] Restricciones
- [X] Iteración

**Qué me devolvió (resumen):**
```
Me devolvio los dos helpers, uno en donde habia funcionalidades para usar y otro que decia los status codes. Ademas me daba el codigo de todos los controllers corregidos en base a los nuevos helpers
```

**¿Me sirvió tal cual, o tuve que corregir/repreguntar?**
```
No me sirvió tal cual porque me retorno los status codes en los helpers
```

### Prompt #2

**Lo que escribí:**
```
# ROL
ActUÁ como un Arquitecto de Software Senior y un revisor de código  extremadamente riguroso,

# CONTEXTO
En nuestra interacción anterior, me diste una solución donde delegabas la definición o el manejo de los HTTP Status Codes dentro de los Helpers, en lugar de mantenerlos en la capa de los Controllers. Esto es un error.

# TAREA
Corrige tu ERROR . Reubica la responsabilidad de los Status Codes exclusivamente en los Controllers. El Helper de respuestas debe ser agnóstico a la lógica de negocio

# RESTRICCIONES
Los Helpers NO pueden contener constantes de status codes (como 200, 404, 500) ni métodos acoplados a un estado específico (como helper.sendNotFoundError). Deben recibir el status code como un parámetro dinámico enviado por el Controller.
```
**Por qué necesité este segundo prompt** (qué falló o faltó en el anterior):
```
No me sirvió tal cual porque me retorno los status codes en los helpers
```

*(Repetí la estructura para cada prompt. Si resolviste todo con un solo prompt gigante, ⚠️ eso es 🟡 según EFSI — explicá por qué.)*

---

## 3. 🔧 Qué hizo la IA y qué hice yo

Marcá esto **también en el código** con comentarios `// [IA]` y `// [YO]`. Acá resumilo:

| Archivo / función | Lo generó la IA | Lo modifiqué/escribí yo | Por qué |
|---|---|---|---|
|date-helper|todo | | |
|response-helper|todo| | |
|alumnos-controller|todo| | |
|cursos-controller|todo| | |
|materias-controller|todo| | |

---

## 4. 🐛 Errores o cosas mal que detecté en la respuesta de la IA

> Si ponés "ninguno", probablemente no las viste. **Siempre** hay algo (un import de más, un estilo distinto, un caso borde olvidado, una mala práctica de seguridad).

```
La IA se confundio ya que en su primera respuesta me retorno el codigo de los helpers y estos devolvian status codes. Algo que esta mal ya que el encargado de determinar estos es el controller.
```

---

## 5. ✅ Verificación

Pegá el checklist de verificación del ejercicio y marcá lo que comprobaste **vos** (con qué evidencia: captura de Postman, salida de `npm test`, número de ms, etc.).

```
- [x] Los helpers están en `src/helpers/` y son `import`-ables (ES modules, no `require`).
- [x] Cada endpoint que usa el helper quedó **más corto** y se lee mejor.
- [x] Los **status codes no cambiaron**: probá happy path **y** casos de error (404, 400) en Postman.
- [x] `calcularEdad` / `agregarEdad` ya **no están definidos dentro de `alumnos-service.js`**: viven en `src/helpers/fechas-helper.js` y el service los importa. La edad de los alumnos sigue dando el mismo número.
- [x] El helper no quedó "atado" a una entidad puntual (es reutilizable por `cursos`, `materias`, etc.).
```

---

## 6. ✍️ Reflexión (300–600 palabras)

Cubrí: qué proceso seguiste, qué decisiones tomaste y por qué, qué aprendiste, y —lo más importante— **qué corregiste de lo que te dio la IA**. Escribí con tus palabras; esto se contrasta con el oral.

```
El proceso empezo viendo que todos los controllers repetían la misma estructura en los try/catch. Para evitar esto habia que crear `date-helper.js` y `response-helper.js`.

El error fue cuando la IA sugirió meter los códigos de estado  adentro del helper de respuestas. Detecté ese error y lo frené en seco aplicando una estricta separación de responsabilidades, el helper no retorna los protocolos HTTP ya que le pertenecen al controller. De esto aprendí que la IA simplifica mucho los tiempos pero tambien puede cometer pequeños detalles que pueden alterar a todo el sistema
```

---

## 7. 🔗 Adjuntos

- [ ] Link/PDF de la conversación completa con la IA
- [ ] Commit(s) en GitHub: `__Fin actividad 03__________`
- [ ] Capturas / evidencias de verificación
