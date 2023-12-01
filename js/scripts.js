import { updateTable } from "./tabla.js";
import { Monstruo } from "./monstruo.js";
import { obtenerCriteriosOrdenamiento, ordenarData } from "./ordenamiento.js";
import { filtrar } from "./filtrar.js";

const $seccionTabla = document.getElementById("tabla");                     
const $btnEliminar = document.getElementById("btnEliminar");
const $btnGuardar = document.getElementById("btnGuardar");
const $btnCancelar = document.getElementById("btnCancelar");
const $opciones = document.getElementById("opciones");                          // Obtiene el id del select 'opciones' que permite seleccionar el tipo de monstruo
const $detalleAccion = document.getElementById("detalleAccion");                // Obtiene el id de un h3 para modificar su texto dependiendo la acción a realizar
const $formulario = document.forms[0];
const monstruos = JSON.parse(localStorage.getItem("monstruos")) || [];          // Obtiene del localStorage los monstruos almacenados
const loader = document.querySelector("#loader");     
const $opcionesOrdenamiento = document.getElementById("opcionesOrdenamiento");
const $fieldsetTipo = document.getElementById("fieldset-tipos");
const $fieldsetDefensa = document.getElementById("fieldset-defensa");
const $miedoMin = document.getElementById("miedo-min");
const $miedoMax = document.getElementById("miedo-max");
const $fieldsetAtaques = document.getElementById("fieldset-ataques");

let armas = (localStorage.getItem("armas")) || [];                       // Obtiene del localStorage las armas/tipos de monstruos almacenados
let listaCriteriosOrdenamiento = (localStorage.getItem("metodosDeOrdenamiento")) || [];  // Obtiene del localStorage los criterios de ordenamiento almacenados                          

let metodosDeOrdenamiento = "";
let dataOrdenada = [];
let dataFiltradaFinal = [];

$detalleAccion.innerText="CREAR MONSTRUO";                                      // Inicialmente la acción será la creación de un monstruo                                            
$btnEliminar.style.display = "none";
$btnCancelar.style.display = "none";
loader.classList.add("oculto");

if(listaCriteriosOrdenamiento.length == 0)
{
    listaCriteriosOrdenamiento = ["Default","Nombre (A-Z)","Nombre (Z-A)","Tipo (A-Z)","Tipo (Z-A)","Alias (A-Z)","Alias (Z-A)","Miedo (mayor a menor)","Miedo (menor a mayor)","Defensa (A-Z)","Defensa (Z-A)"];
    localStorage.setItem("metodosDeOrdenamiento", listaCriteriosOrdenamiento);
    listaCriteriosOrdenamiento = (localStorage.getItem("metodosDeOrdenamiento")).split(",");
}
else
{
    listaCriteriosOrdenamiento = listaCriteriosOrdenamiento.split(','); 
}


if(armas.length == 0)
{
     armas = ["Esqueleto", "Zombie", "Vampiro", "Fantasma", "Bruja", "Hombre Lobo"];
     localStorage.setItem("armas", armas);
    armas = (localStorage.getItem("armas")).split(','); 
}
else
{
     armas = armas.split(','); 
}


fillWeaponOptions(opciones, armas);    
obtenerCriteriosOrdenamiento($opcionesOrdenamiento,listaCriteriosOrdenamiento);


// Se encarga de controlar los eventos click en la página
//  Si el click fue en un "td" significa que se quiere modificar/eliminar un monstruo. También se da la opción de cancelar la acción
//  Si el click se da en el boton eliminar, se llama a la función handlerDelete
//  Si el click se da en el boton cancelar, se cancela la acción y se vacia el formulario
//  Si el click se da en el select "opcionesOrdenamiento" se ordenan los datos de la tabla según el criterio seleccionado
window.addEventListener("click", (e) =>{
    
    if(e.target.matches("td"))
    {               
        $detalleAccion.innerText="MODIFICAR/ELIMINAR MONSTRUO";
        $btnEliminar.style.display = "flex";
        $btnGuardar.value = "Modificar";      
        $btnCancelar.style.display = "flex";
        const id = e.target.parentElement.dataset.id;        
        const selectedMonster = monstruos.find((mons) => {
            return mons.id == id;
        });
        fillForm($formulario, selectedMonster);
    }
    else if(e.target.matches("input[value='Eliminar']"))
    {                      
        const id = parseInt($formulario.txtId.value);    
                                
        handlerDelete(id);       
        $btnEliminar.style.display = "none";
        $btnGuardar.value = "Guardar";
        $btnCancelar.style.display ="none";
    }
    else if(e.target.matches("input[value='Cancelar']"))
    {       
        $detalleAccion.innerHTML="CREAR MONSTRUO";
        $formulario.reset();
        $btnGuardar.value = "Guardar";            
        $btnEliminar.style.display = "none";
        $btnCancelar.style.display = "none";        
    }  
    else if(e.target.matches("select[id='opcionesOrdenamiento']") || e.target.matches("input[name='cboxTipo']") || e.target.matches("input[name='rdoDefensa']") || e.target.matches("input[id='miedo-min") || e.target.matches("input[id='miedo-max"))
    {               
        dataFiltradaFinal = filtrar($fieldsetTipo, $fieldsetDefensa, monstruos, $miedoMin.value, $miedoMax.value);
        metodosDeOrdenamiento = $opcionesOrdenamiento.value;
        dataOrdenada = ordenarData(dataFiltradaFinal, metodosDeOrdenamiento);
        if(monstruos.length) updateTable($seccionTabla, dataOrdenada);
    }
    else if(e.target.matches("button[id='btnRestaurarMiedo"))        
    {
        $miedoMax.value = 100;
        $miedoMin.value = 0;
        dataFiltradaFinal = filtrar($fieldsetTipo, $fieldsetDefensa, monstruos, $miedoMin.value, $miedoMax.value);
        metodosDeOrdenamiento = $opcionesOrdenamiento.value;
        dataOrdenada = ordenarData(dataFiltradaFinal, metodosDeOrdenamiento);
        if(monstruos.length) updateTable($seccionTabla, dataOrdenada);
    }
    else if(e.target.matches("button[id='btnConfirmDialog']"))
    {
        confirmacionDialog = true;        
    }   
    else if(e.target.matches("button[id='btnCancelDialog']"))
    {
        confirmacionDialog = false;
    }
});

if(monstruos.length) updateTable($seccionTabla, monstruos);

$formulario.addEventListener("submit", (e) =>{
    
    e.preventDefault();
    
    const {txtId, txtNombre, txtAlias, rdoDefensa, rangeMiedo, opciones, cboxAtaque} = $formulario;
    
    if(!validarDatosIngresados(txtNombre.value, txtAlias.value)){
        window.alert("Error! Debe ingresar un nombre y alias para el monstruo");
    }
    else
    {
        if(txtId.value === "" || $btnGuardar.value === "Guardar"){

            let ataque = verificarAtaquesSeleccionados($fieldsetAtaques);            
                            
            const newMonster = new Monstruo(Date.now(), txtNombre.value, opciones.value, txtAlias.value, parseInt(rangeMiedo.value), rdoDefensa.value, ataque);
            
            handlerCreate(newMonster);     
        }
        else
        {
            if($btnGuardar.value === "Modificar")
            {
                const updatedMonster = new Monstruo(txtId.value, txtNombre.value, opciones.value, txtAlias.value, parseInt(rangeMiedo.value), rdoDefensa.value);                
                handlerUpdate(updatedMonster);        
            }        
        }
        $formulario.reset();
        $btnGuardar.value = "Guardar";
        $btnEliminar.style.display = "none";
        
        loader.classList.remove("oculto");
        setTimeout(() =>{
            updateTable($seccionTabla, monstruos);        
            loader.classList.add("oculto");     
        }, 2000);        
    }
})

// Funcion para el manejo de creación de monstruos
function handlerCreate(newMonster, ){

    let confirm = window.confirm("¿Desea agregar el monstruo a la lista?");
    
    if(confirm)
    {
        monstruos.push(newMonster);
        updateStorage("monstruos", monstruos);   
    }
}

// Funcion para el manejo de modificaciones de monstruos
function handlerUpdate(updatedMonster){

    let confirm = window.confirm("¿Desea modificar los datos del monstruo?");
    
    if(confirm)
    {
        let index = monstruos.findIndex((mons) => mons.id == updatedMonster.id);
        monstruos.splice(index, 1, updatedMonster);    
        updateStorage("monstruos", monstruos);            
    
    }     
    $btnCancelar.style.display = "none";
}

// Funcion para el manejo de baja de monstruos
function handlerDelete(id){
    let confirm = window.confirm("¿Desea eliminar el monstruo de la lista?");

    if(confirm)
    {
        let index = monstruos.findIndex((mons) => mons.id == id);
        monstruos.splice(index, 1);    
        updateStorage("monstruos", monstruos);   
        
        loader.classList.remove("oculto");
        setTimeout(() =>{
            updateTable($seccionTabla, monstruos);
            loader.classList.add("oculto");  
        },2000);        
    }
    $formulario.reset();
}

// Actualiza el storage con los datos ingresados 
function updateStorage(key, data){

    localStorage.setItem(key, JSON.stringify(data));
}

// Rellena el formulario con los datos del monstruo seleccionado
function fillForm(form, monster){

    form.txtId.value = monster.id;
    form.txtNombre.value = monster.nombre;
    form.txtAlias.value = monster.alias;
    form.rdoDefensa.value = monster.defensa;
    form.opciones.value = monster.tipo;
    form.rangeMiedo.value = monster.miedo;
}

// Rellena el select "Tipos" con los valores que se encuentran en el localStorage
function fillWeaponOptions(opciones, array){
   
    for (const key in array) {
        const opcion = document.createElement("option");
        opcion.value = array[key];
        opcion.textContent = array[key];
        opciones.appendChild(opcion);
    }
}

// Valida que el txtNombre y txtAlias no esten vacios 
function validarDatosIngresados(txtNombre, txtAlias)
{
    let cadenaNombre = txtNombre.trim();
    let cadenaAlias = txtAlias.trim();

    if(cadenaNombre == "" || cadenaAlias == "") return false

    return true;
}

function verificarAtaquesSeleccionados(container){
    
    const checkboxes = container.querySelectorAll("input[type='checkbox']");
    const ataques = [];
    let ataquesStr = "";
    checkboxes.forEach((element) => {
        if(element.checked){
            ataques.push(element.value);         
        }
    });    
    ataquesStr = ataques.toString();
    return ataquesStr;
}

/*
function abrirDialogo() {
    let dialogo = document.getElementById("dialog");
    dialogo.style.display = "flex";
  }
  
  function cerrarDialogo() {
    let dialogo = document.getElementById("dialog");
    dialogo.style.display = "none";
  }
  
  
  */