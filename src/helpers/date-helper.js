class DateHelper {
    calcularEdad = (fechaNacimiento) => {
        const hoy = new Date();
        const cumpleanos = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - cumpleanos.getFullYear();
        const mes = hoy.getMonth() - cumpleanos.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
        return edad;
    }

    agregarAnios = (fecha, anios) => {
        const resultado = new Date(fecha);
        resultado.setFullYear(resultado.getFullYear() + anios);
        return resultado;
    }
}

export default new DateHelper();