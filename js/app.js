//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');2
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);


    // Vaciar le carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []; //reseteamos el carrito

        limpiarHTML();//eliminamo todo el HTML

    })

}
    //funciones

    function agregarCurso(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')) {
            const cursoSeleccionado = e.target.parentElement.parentElement;
            leerDatosCurso(cursoSeleccionado);
        }
        
    }
    
    //Elimina un curso del carrito
    function eliminarCurso(e){
        console.log(e.target.classList);
        if(e.target.classList.contains('borrar-curso')){
            const cursoId = e.target.getAttribute('data-id');


            //Elimina del arregloe de articulosCarrito por el data-id
            articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
            
            carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
        }
    }
    
    
    
    //Lee el contenido del HTML y extrae la info del curso
    function leerDatosCurso(curso) {
        // console.log(curso);

        //Crear un objeto con el curso actual
        const infoCurso = {
            imagen: curso.querySelector('img').src,
            titulo: curso.querySelector('h4').textContent,
            precio: curso.querySelector('.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id'),
            cantidad: 1 
        }

        //Revisa si un elemento ya existe en el carrito
        const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
        if(existe) {
            //actualizamos la cantidad
            const cursos = articulosCarrito.map( curso => {
                if(curso.id === infoCurso.id){
                        curso.cantidad++;
                        return curso; // retorna el objeto actualizado
                }else {
                    return curso; //retorna los objetos que no son los duplicados
                }
            });
            articulosCarrito = [...cursos];
        }else {
            //Agregamos el curso al carrito
            articulosCarrito = [...articulosCarrito, infoCurso];
        }


            //Arregla elementos al arreglo de carrito
            

            console.log(articulosCarrito);

            carritoHTML();
    }

    //Muestra el carrito de compras en el HTML
    function carritoHTML(){

        //Limpiar el HTML
            limpiarHTML();
        
        //Recorre el carrito y henera el HTML
        articulosCarrito.forEach (curso =>{
            const { imagen, titulo, precio, cantidad, id } = curso;
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
            <img src="${imagen}" width="100">
            <td>${titulo}</td> 
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>

            `;
                //Agrega el HTML del carrito en el TBody
                contenedorCarrito.appendChild(row);



        })

    }

    //Elimina los cursos dle tbody
    function limpiarHTML() {

        //Forma Lenta
        //contenedorCarrito.innerHTML = '';

        while(contenedorCarrito.firstChild) {
                contenedorCarrito.removeChild(contenedorCarrito.firstChild)
        }
    }
