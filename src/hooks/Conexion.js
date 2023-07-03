const URLN = "http://localhost:3006/api"
export const InicioSesion = async (data) => {
    const cabeceras = {
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URLN + "/sesion", {
        method: "POST",
        headers: cabeceras,
        body: JSON.stringify(data)
    })).json();
    //console.log("DATOS"+JSON.stringify(data));
    return datos;
}

export const Marca = async (key) => {
    const cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(URLN + "/marcas/listar", {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const AutosCant = async (key) => {
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(URLN + "/autos/cantidadautos", {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const AutosCantDisp = async (key) => {
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(URLN + "/autos/cantidadautosdisp", {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const MarcasCant = async (key) => {
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(URLN + "/marcas/cantidadmarcas", {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const Autos = async (key) => {
    const cabeceras={
        "X-API-TOKEN":key
    };
    const datos = await (await fetch(URLN + "/autos/listar/disponibles",  {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const AutosVendidos = async (key) => {
    const cabeceras={
        "X-API-TOKEN":key
    };
    const datos = await (await fetch(URLN + "/autos/listar/vendidos",  {
        method: "GET",
        headers: cabeceras
    })).json();
    //console.log("DATOS QUE TRAE", JSON.stringify(datos));
    return datos;
}

export const GuardarAuto = async (data, key) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/autos/guardar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    //console.log("GUARDAR", JSON.stringify(data));
    return datos;
}

export const ActualizarAuto = async (data, key) => {
    
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    
    const datos = await (await fetch(URLN + "/autos/modificar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    //console.log("TOY AQUI", datos);
    //console.log("GUARDAR", JSON.stringify(data));
    return datos;
}

export const ObtenerAuto = async (id, key) => {
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(`${URLN}/autos/obtener/${id}`, {
        method: "GET",
        headers: cabeceras
    })).json();
    //console.log("DATOS QUE TRAE", JSON.stringify(datos));
    return datos;
} 

export const AutosIngresados = async (key) => {
    const cabeceras={
        "X-API-TOKEN":key
    };
    const datos = await (await fetch(URLN + "/autos/ingreso/listar",  {
        method: "GET",
        headers: cabeceras
    })).json();
    //console.log("DATOS QUE TRAE", JSON.stringify(datos));
    return datos;
}

export const ObtenerIngreso = async (id, key) => {
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(`${URLN}/autos/ingreso/obtener/${id}`, {
        method: "GET",
        headers: cabeceras
    })).json();
    //console.log("DATOS QUE TRAE", JSON.stringify(datos));
    return datos;
} 

export const ObtenerVendidos = async (id, key) => {
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(`${URLN}/autos/obtenervendidos/${id}`, {
        method: "GET",
        headers: cabeceras
    })).json();
    //console.log("DATOS QUE TRAE", JSON.stringify(datos));
    return datos;
} 

export const GuardarIngreso = async (data, key) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/autos/ingreso", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    //console.log("GUARDAR", JSON.stringify(data));
    return datos;
}

export const GenerarFactura = async (data, key) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/reparacion/generar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log("GUARDAR", JSON.stringify(data));
    return datos;
}

export const Repuesto = async (key) => {
    const cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(URLN + "/repuestos/listar", {
        method: "GET",
        headers: cabeceras
    })).json();
    //console.log("GUARDAR", JSON.stringify(datos));
    return datos;
}

export const ObtenerOrdenes = async (id, key) => {
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(`${URLN}/autos/orden/obtener/${id}`, {
        method: "GET",
        headers: cabeceras
    })).json();
    //console.log("DATOS QUE TRAE", JSON.stringify(datos));
    return datos;
} 

export const ReparacionListar = async (key) => {
    const cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(URLN + "/autos/orden/listar", {
        method: "GET",
        headers: cabeceras
    })).json();
    //console.log("GUARDAR", JSON.stringify(datos));
    return datos;
}

export const ObtenerExt = async (id, key) => {
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(`${URLN}/autos/orden/obtenerExt/${id}`, {
        method: "GET",
        headers: cabeceras
    })).json();
    console.log("DATOS QUE TRAE", JSON.stringify(datos));
    return datos;
} 

export const DetallesOrden = async (key) => {
    const cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(URLN + "/autos/detalle/listar", {
        method: "GET",
        headers: cabeceras
    })).json();
    //console.log("GUARDAR", JSON.stringify(datos));
    return datos;
}

export const DetalleGuardar = async (data, key) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/detallereparacion/guardar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log("GUARDAR", JSON.stringify(data));
    return datos;
}

export const ObtenerDetalle = async (data, key) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLN + "/detallereparacion/guardar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    //console.log("GUARDAR", JSON.stringify(data));
    return datos;
}

export const DetallesFact = async (id, key) => {
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(`${URLN}/autos/detalleObterner/${id}`, {
        method: "GET",
        headers: cabeceras
    })).json();
    console.log("DATOS QUE TRAE AQUI", JSON.stringify(datos));
    return datos;
} 

export const DetOrdenExter = async (id, key) => {
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(`${URLN}/detalle/Obterner/${id}`, {
        method: "GET",
        headers: cabeceras
    })).json();
    console.log("DATOS QUE TRAE AQUI", JSON.stringify(datos));
    return datos;
} 

export const CalcularValores = async (data, key) => {
    console.log("AQUI");
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    
    const datos = await (await fetch(URLN + "/orden/calcularvalores", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    console.log("DATOS QUE TRAE AQUI", JSON.stringify(datos));
    return datos;
}

export const ValoresMostrar = async (id, key) => {
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(`${URLN}/autos/orden/obtenervalores/${id}`, {
        method: "GET",
        headers: cabeceras
    })).json();
    //console.log("DATOS QUE TRAE AQUI", JSON.stringify(datos));
    return datos;
} 





