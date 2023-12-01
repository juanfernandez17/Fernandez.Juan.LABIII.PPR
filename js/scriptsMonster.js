import { crearArticulo } from "./articulo.js";
import { Monstruo } from "./Monstruo.js";


const monstruos = JSON.parse(localStorage.getItem("monstruos")) || []; 
const loader = document.querySelector("#loader");
loader.classList.remove("oculto");

setTimeout(() =>{
    loader.classList.add("oculto")
    if(monstruos.length) crearArticulo(monstruos);
}, 2000);

