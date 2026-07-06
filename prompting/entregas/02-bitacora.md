# 📓 Bitácora de Prompts — Ejercicio N° __02_

> Copiá este archivo por cada ejercicio que entregues. Nombralo, por ejemplo, `entregas/01-bitacora.md`.
> Esta bitácora **es parte de la nota**. Un ejercicio sin bitácora no se corrige.

---

## Datos

- **Alumno/a:** _Tomas Goldentul__
- **Ejercicio:** N° _02__ — _____Refactorizacion del CRUD repetido.md________
- **Fecha:** _6/7__
- **Modelo de IA usado:** (ej: ChatGPT, Claude, Gemini, Copilot) _Gemini__

---

## 1. 🎯 Qué me pidieron

Resumí en 2–3 líneas el objetivo del ejercicio con tus palabras (no copiado del enunciado).

```
Me pidieron que cambie la estructura y el codigo de los repositories porque en cada uno (cursos, materias y alumnos), se repetia lo mismo y lo unico que cambiaba era el nombre de la tabla.
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
Te voy a pasar una arquitectura en capas, pg sin ORM, ES modules. La estrategia para evitar la repeticion es esta: B) Repository por composición ("tiene un"), sin herencia
En vez de heredar, cada repositorio tiene adentro un objeto genérico que sabe hacer lo común, y al crearlo le pasa su nombre de tabla por parámetro. No hay clase madre/hija: hay un objeto que se parametriza y al que se le delega.

// Un repositorio genérico que sabe hacer lo común para CUALQUIER tabla
class GenericRepository {
    constructor(tabla) {
        this.tabla = tabla;
        this.db = new Db();
    }
    getAllAsync = async () => await this.db.queryAll(`SELECT * FROM ${this.tabla}`);
    // ...getByIdAsync y deleteByIdAsync también viven acá
}

// CursosRepository "TIENE UN" GenericRepository configurado con 'cursos':
class CursosRepository {
    constructor() {
        this.base = new GenericRepository('cursos');   // ← crea el objeto y le pasa la tabla
    }
    // Lo común se lo PIDE a su objeto interno (delega):
    getAllAsync = async () => await this.base.getAllAsync();

    // Y agrega lo suyo:
    createAsync = async (entity) => { /* INSERT INTO cursos (nombre) ... */ }
}
AlumnosRepository hace lo mismo: this.base = new GenericRepository('alumnos') y delega lo común.

🔤 Diferencia con A: en A heredás ("es un": un curso-repo es un repository base). En B tenés un objeto adentro y lo parametrizás ("tiene un": un curso-repo tiene un repository genérico configurado con 'cursos'). Las dos eliminan la duplicación. Para este proyecto, A suele ser la más corta; B evita la herencia a cambio de delegar cada método común.

# TAREA
Necesito que crees una clase GenericRepository que reciba el nombre de la tabla en el constructor y maneje los métodos comunes (getAllAsync, getByIdAsync, deleteByIdAsync). Luego, refactorizá cursos-repository.js, alumnos-repository y materias-repository.js para que implementen el patrón de composición (instanciando GenericRepository adentro de su constructor y delegándole los métodos comunes).

# RESTRICCIONES
la API pública no debe cambiar", "los tests/Postman tienen que seguir pasando igual", "no rompas el patrón de LogHelper".seguí usando pg con SQL crudo, no introduzcas un ORM


```

**Auto-chequeo de las 5 partes EFSI** (marcá lo que incluiste):
- [X] Rol
- [X] Contexto (¿pegaste código del proyecto?)
- [X] Tarea
- [X] Restricciones
- [] Iteración

**Qué me devolvió (resumen):**
```
Me devolvió los 3 repositories modificados para evitar la repeticion y ademas creo un nuevo repository llamado generic
```

**¿Me sirvió tal cual, o tuve que corregir/repreguntar?**
```
Me sirvio tal cual
```

### Prompt #2

**Lo que escribí:**
```
¿cuántas líneas tenía cada repository antes y cuántas comparten ahora? 
```
**Por qué necesité este segundo prompt** (qué falló o faltó en el anterior):
```
En el anterior faltó que me diga la diferencia de lineas de codigo que habia antes y despues.
```

*(Repetí la estructura para cada prompt. Si resolviste todo con un solo prompt gigante, ⚠️ eso es 🟡 según EFSI — explicá por qué.)*

---

## 3. 🔧 Qué hizo la IA y qué hice yo

Marcá esto **también en el código** con comentarios `// [IA]` y `// [YO]`. Acá resumilo:

| Archivo / función | Lo generó la IA | Lo modifiqué/escribí yo | Por qué |
|materias-repository|genero todo|---|---|
|alumnos-repository |genero gran parte |Elimine un par de lineas |Verificacion innecesaria ya que luego de todas formas se verificaba |
|cursos-repository |genero todo |--|--|

---

## 4. 🐛 Errores o cosas mal que detecté en la respuesta de la IA

> Si ponés "ninguno", probablemente no las viste. **Siempre** hay algo (un import de más, un estilo distinto, un caso borde olvidado, una mala práctica de seguridad).

```
En alumnos-repository antes de hacer el update se llamaba al metodo getID para verificar si el id existe, sin embargo esto no hacia falta porque si la funcion retornaba  0, queria decir que el id no existe.
```

---

## 5. ✅ Verificación

Pegá el checklist de verificación del ejercicio y marcá lo que comprobaste **vos** (con qué evidencia: captura de Postman, salida de `npm test`, número de ms, etc.).

```
- [x] Los 5 endpoints de `alumnos`, `cursos` **y** `materias` siguen respondiendo **igual que antes** (mismos status codes, mismo JSON). Probalo en Postman antes y después.
- [x] La lógica común está **en un solo lugar** (si arreglás un bug en `getAllAsync`, se arregla para todas las entidades).
- [x] Lo específico de cada entidad (nombre de tabla, columnas del INSERT/UPDATE) sigue siendo claro y fácil de cambiar.
- [x] La regla de negocio de `alumnos` (calcular `edad`, validar que el curso existe) **no se perdió** en el refactor.
- [x] No se agregó un ORM ni dependencias nuevas.
```

---

## 6. ✍️ Reflexión (300–600 palabras)

Cubrí: qué proceso seguiste, qué decisiones tomaste y por qué, qué aprendiste, y —lo más importante— **qué corregiste de lo que te dio la IA**. Escribí con tus palabras; esto se contrasta con el oral.

```
Primero le consulte a la IA que opinaba sobre las estrategias para evitar la repeticion. Luego le comente sobre la de la creacion de un generic-repository para evitar la repeticion y me dijo de que era una buena manera ya que ademas de reducir bastante la cantidad de lineas, era facil de implementar. Finalmente decidi esta ultima opcion.
Aprendi a evitar la repeticion en el codigo y lo voy a aplicar en el proyecto final ya que tiene una estructura similar a este tp y repite los repositories.
Lo que corregi que me dio la IA es que habia una parte innecesaria, en alumnos-repository update. En esta funcion, antes de actualizar al alumno, llamaba a una funcion para verificar la existencia del id pasado por parametros. Esto no hacia falta implementar porque ya la funcion, con el return queryRowCount, si te da 0 es que no existe el alumno.
```

---

## 7. 🔗 Adjuntos

- [ ] Link/PDF de la conversación completa con la IA (prompting 02)
- [ ] Commit(s) en GitHub: `___Avances en actividad 02, falta completar la bitacora; Fin actividad 02___`
- [ ] Capturas / evidencias de verificación
