//const criteriosOrdenamiento = ["Default","Nombre (A-Z)", "Nombre (Z-A)", "Tipo (A-Z)", "Tipo (Z-A)", "Alias (A-Z)", "Alias (Z-A)", "Miedo (mayor a menor)", "Miedo (menor a mayor)", "Defensa (A-Z)", "Defensa (Z-A)"];
//localStorage.setItem("metodosDeOrdenamiento", criteriosOrdenamiento);


export function obtenerCriteriosOrdenamiento(container, listaCriteriosOrdenamiento)
{
    for (const key in listaCriteriosOrdenamiento) {
        const newOption = document.createElement("option");
        newOption.textContent = listaCriteriosOrdenamiento[key];
        container.appendChild(newOption);
    }
}

export function ordenarData(data, metodo) {
    let newData = data.concat(); // Concat devuelve un array con los mismos valores que data pero sin apuntar a la misma direccion de memoria

    if (metodo === "Nombre (A-Z)") {
        newData = ordenarPorNombre(newData, true);
    }
    else if (metodo === "Nombre (Z-A)") {
        newData = ordenarPorNombre(newData, false);
    }
    else if (metodo === "Tipo (A-Z)") {

        newData = ordenarPorTipo(newData, true);
    }
    else if (metodo === "Tipo (Z-A)") {

        newData = ordenarPorTipo(newData, false);
    }
    else if (metodo === "Alias (A-Z)") {

        newData = ordenarPorAlias(newData, true);
    }
    else if (metodo === "Alias (Z-A)") {

        newData = ordenarPorAlias(newData, false);
    }
    else if (metodo === "Miedo (menor a mayor)") {

        newData = ordenarPorMiedo(newData, true);
    }
    else if (metodo === "Miedo (mayor a menor)") {

        newData = ordenarPorMiedo(newData, false);
    }
    else if (metodo === "Defensa (A-Z)") {

        newData = ordenarPorDefensa(newData, true);
    }
    else if (metodo === "Defensa (Z-A)") {

        newData = ordenarPorDefensa(newData, false);
    }
    return newData;
}

function ordenarPorNombre(data, asc) {
    if (asc) {
        data.sort((a, b) => {
            let nombreA = a.nombre.toUpperCase();
            let nombreB = b.nombre.toUpperCase();

            if (nombreA < nombreB) {
                return -1;
            }
            if (nombreA > nombreB) {
                return 1;
            }
            return 0;
        })
    }
    else {
        data.sort((a, b) => {
            let nombreA = a.nombre.toUpperCase();
            let nombreB = b.nombre.toUpperCase();

            if (nombreA > nombreB) {
                return -1;
            }
            if (nombreA < nombreB) {
                return 1;
            }
            return 0;
        })
    }
    return data;
}

function ordenarPorTipo(data, asc) {
    if (asc) {
        data.sort((a, b) => {
            let tipoA = a.tipo.toUpperCase();
            let tipoB = b.tipo.toUpperCase();

            if (tipoA < tipoB) {
                return -1;
            }
            if (tipoA > tipoB) {
                return 1;
            }
            return 0;
        })
    }
    else {
        data.sort((a, b) => {
            let tipoA = a.tipo.toUpperCase();
            let tipoB = b.tipo.toUpperCase();

            if (tipoA > tipoB) {
                return -1;
            }
            if (tipoA < tipoB) {
                return 1;
            }
            return 0;
        })
    }
    return data;
}

function ordenarPorAlias(data, asc) {
    if (asc) {
        data.sort((a, b) => {
            let aliasA = a.alias.toUpperCase();
            let aliasB = b.alias.toUpperCase();

            if (aliasA < aliasB) {
                return -1;
            }
            if (aliasA > aliasB) {
                return 1;
            }
            return 0;
        })
    }
    else {
        data.sort((a, b) => {
            let aliasA = a.alias.toUpperCase();
            let aliasB = b.alias.toUpperCase();

            if (aliasA > aliasB) {
                return -1;
            }
            if (aliasA < aliasB) {
                return 1;
            }
            return 0;
        })
    }
    return data;
}

function ordenarPorMiedo(data, asc) {
    if (asc) {
        data.sort((a, b) => {
            let miedoA = a.miedo;
            let miedoB = b.miedo;

            if (miedoA < miedoB) {
                return -1;
            }
            if (miedoA > miedoB) {
                return 1;
            }
            return 0;
        })
    }
    else {
        data.sort((a, b) => {
            let miedoA = a.miedo;
            let miedoB = b.miedo;

            if (miedoA > miedoB) {
                return -1;
            }
            if (miedoA < miedoB) {
                return 1;
            }
            return 0;
        })
    }
    return data;
}

function ordenarPorDefensa(data, asc) {
    if (asc) {
        data.sort((a, b) => {
            let defensaA = a.defensa;
            let defensaB = b.defensa;

            if (defensaA < defensaB) {
                return -1;
            }
            if (defensaA > defensaB) {
                return 1;
            }
            return 0;
        })
    }
    else {
        data.sort((a, b) => {
            let defensaA = a.defensa;
            let defensaB = b.defensa;

            if (defensaA > defensaB) {
                return -1;
            }
            if (defensaA < defensaB) {
                return 1;
            }
            return 0;
        })
    }
    return data;
}