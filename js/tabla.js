export const crearTabla = (data) =>{

    if(!Array.isArray(data)) return null;

    const tabla = document.createElement("table");
    tabla.appendChild(crearCabecera(data[0]));
    tabla.appendChild(crearCuerpo(data));

    return tabla;
}
const crearCabecera = (elemento) =>{
    const tHead = document.createElement("thead"),
    headRow = document.createElement("tr");

    for (const key in elemento) {       
        if(key === "id") continue;
        const th = document.createElement("th");
        th.textContent = key;       
        headRow.appendChild(th);       
    }
    tHead.appendChild(headRow);

    return tHead;
}

const crearCuerpo = (data) =>{

    if(!Array.isArray(data)) return null;

    const tBody = document.createElement("tbody");
    data.forEach((element) => {

        const tr = document.createElement("tr");
    
        for (const key in element) {
            if(key === "id")
            {
                tr.dataset.id = element[key];
            }
            else
            {
                const td = document.createElement("td");
                td.textContent = element[key];
                
                tr.appendChild(td);
            }           
        }
        tBody.appendChild(tr);
    })
    return tBody;
}

export const updateTable = (container, data) =>{
    
    while(container.hasChildNodes()){
        container.removeChild(container.firstElementChild);
    }
    container.appendChild(crearTabla(data));
}