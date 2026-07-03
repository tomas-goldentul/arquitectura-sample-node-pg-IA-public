# 📓 Bitácora de Prompts — Ejercicio N° _01__

> Copiá este archivo por cada ejercicio que entregues. Nombralo, por ejemplo, `entregas/01-bitacora.md`.
> Esta bitácora **es parte de la nota**. Un ejercicio sin bitácora no se corrige.

---

## Datos

- **Alumno/a:** _Tomas Goldentul__
- **Ejercicio:** N° _01__ — ___________________
- **Fecha:** _3/7__
- **Modelo de IA usado:** (ej: ChatGPT, Claude, Gemini, Copilot) _Gemini__

---

## 1. 🎯 Qué me pidieron

Resumí en 2–3 líneas el objetivo del ejercicio con tus palabras (no copiado del enunciado).

```
Me pidieron que desarolle el crud de materias siguiendo la estructura de cursos.
```

---

## 2. 💬 Mis prompts (en orden)

Pegá **todos** los prompts que usaste, en orden, con la respuesta resumida y qué hiciste con ella. Agregá tantos como necesites.

### Prompt #1

**Lo que escribí:**
```
# ROL
Actua como desarrollador backend Node/Express.

# CONTEXTO
arquitectura en capas, pg sin ORM, ES modules, y te voy a pasar cursos-repository.js, cursos-service.js y db-pg.js como referencia de estilo.

# TAREA
Necesito que generes las 3 capas para materias

# RESTRICCIONES
sin dependencias nuevas, mismo estilo (clases, delegar el acceso a datos en la clase DbPg con this.db.queryAll/queryOne/queryReturnId/queryRowCount, queries $1), mantener los console.log.

# ITERACIÓN
Pasame el primeramente el repository, lo reviso y luego te pido los siguientes.```

**Auto-chequeo de las 5 partes EFSI** (marcá lo que incluiste):
- [x] Rol
- [x] Contexto (¿pegaste código del proyecto?)
- [x] Tarea
- [x] Restricciones
- [x] Iteración

**Qué me devolvió (resumen):**
```
Me iba devolviendo un codigo a la vez, lo revisaba, pegaba y le pedia el siguiente 
```

**¿Me sirvió tal cual, o tuve que corregir/repreguntar?**
```
Me sirvio tal cual
```


## 3. 🔧 Qué hizo la IA y qué hice yo

Marcá esto **también en el código** con comentarios `// [IA]` y `// [YO]`. Acá resumilo:

| Archivo / función | Lo generó la IA | Lo modifiqué/escribí yo | Por qué |
|materias-repository|genero todo|---|---|
|materias-service |genero todo | | |
|materias-controller |genero gran parte |Modifique una return .json |Lo considere poco claro ya que si eliminaba a una materia retornaba null |

---

## 4. 🐛 Errores o cosas mal que detecté en la respuesta de la IA

> Si ponés "ninguno", probablemente no las viste. **Siempre** hay algo (un import de más, un estilo distinto, un caso borde olvidado, una mala práctica de seguridad).

```
Detecté que le falto claridad en una respuesta. En el endpoint de delete, cuando elimina una materia retornaba null, por esto lo cambie a un mensaje mas claro.
```

---

## 5. ✅ Verificación

Pegá el checklist de verificación del ejercicio y marcá lo que comprobaste **vos** (con qué evidencia: captura de Postman, salida de `npm test`, número de ms, etc.).

```
Marcá cada ítem cuando lo verifiques vos (no la IA):

✔️ El repository delega el acceso a datos en la clase DbPg (this.db.queryAll/queryOne/...), igual que alumnos-repository.js. No toca el Pool directamente ni crea un Client nuevo por request (de eso se encarga db-pg.js con lazy init).
✔️ Las queries usan placeholders $1, $2... (no concatenación de strings → eso sería SQL injection, ver ejercicio 09).
✔️ El controller devuelve los status codes correctos: 200, 201 en POST, 404 cuando no existe, 400 en error de input.
 ✔️El update valida que el id de la URL coincida con el del body (mirá cómo lo hace alumnos-controller.js en el PUT).
 ✔️El controller está registrado en server.js y los 5 endpoints responden en Postman.
✔️ No aparecieron dependencias nuevas en package.json.
```

---

## 6. ✍️ Reflexión (300–600 palabras)

Cubrí: qué proceso seguiste, qué decisiones tomaste y por qué, qué aprendiste, y —lo más importante— **qué corregiste de lo que te dio la IA**. Escribí con tus palabras; esto se contrasta con el oral.

```
Para armar el CRUD de materias tome todo los archivos que habia en relacion a cursos y la usé como base para no romper la estructura del proyecto. Empecé por el Repository para conectar la base de datos, después fui al Service y terminé con el Controller 


Al revisar el código, corregí un detalle endpoint del DELETE. Originalmente, la IA me había respondido con un .json(null). Por eso, decidí cambiarlo para que devuelva un objeto JSON: { message: "Se eliminó con éxito la materia" }. 
```

---

## 7. 🔗 Adjuntos

- [x] Link/PDF de la conversación completa con la IA (prompting 01)
- [x] Commit(s) en GitHub: `_1_  _611930c63aa83bfc90ed2f614d21db9a14fb2670_________`
- [x] Capturas / evidencias de verificación
