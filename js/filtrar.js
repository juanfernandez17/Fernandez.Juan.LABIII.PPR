function verificarTiposChecked(container){
    const checkboxes = container.querySelectorAll("input[type='checkbox']");
    const tiposSeleccionados = [];

    checkboxes.forEach((element) => {
        if(element.checked){
            tiposSeleccionados.push(element.value);         
        }
    });
    return tiposSeleccionados;
}

function filtrarDataPorTipos(data, tiposSeleccionados){
   
    const dataFiltrada = data.filter((element) => {
        
        for (const key in tiposSeleccionados) {

            if (element.tipo == tiposSeleccionados[key]) {
                return 1;
            }
            else {
                continue;
            }
        }
    })
    return dataFiltrada;    
}

function verificarDefensaChecked(container){
    
    const $rdoButton = container.querySelector('input[name="rdoDefensa"]:checked');
    let defensaSeleccionada = $rdoButton.value;
    
    return defensaSeleccionada;
}

function filtrarDataPorDefensa(data, defensaSeleccionada){
    
    const dataFiltrada = data.filter((element) => {
        
        if(element.defensa === defensaSeleccionada || defensaSeleccionada === "Todos")
        {
            return 1;
        }
    })
    return dataFiltrada;   
}

function filtrarDataPorMiedo(data, miedoMin, miedoMax) {
    const dataFiltrada = data.filter((element) => {
        if (element.miedo > miedoMin && element.miedo < miedoMax) {
            return 1;
        }
        else {
            return 0;
        }
    })
    return dataFiltrada;
}

export function filtrar(containerTipos, containerDefensa, data, miedoMin, miedoMax)
{
    
    const copyData = data.concat();
    const tiposSeleccionados = verificarTiposChecked(containerTipos);    
    const defensaSeleccionada = verificarDefensaChecked(containerDefensa);
    const dataFiltradaPorTipo = filtrarDataPorTipos(copyData, tiposSeleccionados);
    const dataFiltradaPorDefensa = filtrarDataPorDefensa(dataFiltradaPorTipo, defensaSeleccionada);
    const dataFiltradaPorMiedo = filtrarDataPorMiedo(dataFiltradaPorDefensa, miedoMin, miedoMax);

    return dataFiltradaPorMiedo;
}