const galeria_menu = document.querySelector(".galeria_menu");
const galeria = document.querySelector("#galeria");

if(galeria_menu){
  galeria_menu.addEventListener('click', e => {
    if(e.target.classList.contains("btn_proyect")){
      e.preventDefault();
      const proyectNum = e.target.dataset.proyect;
  
      cargarGaleria(proyectNum);
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  cargarModales();
  cargarMobilemenu();
  cargarGaleria();
})

function cargarModales() {
  const modalImagen = document.querySelector("#modal-img");
  const divImagen = document.querySelector('.modal-body');

if(modalImagen) {
    modalImagen.addEventListener('show.bs.modal', (e) =>{ 
        const link = e.relatedTarget;
        const rutaImagen = link.getAttribute('data-bs-image');
        const folderImagen = link.getAttribute('data-bs-folder');
    
        const imagen = document.createElement('IMG');
        imagen.src = `../build/img/${folderImagen}/${rutaImagen}.webp`;
        imagen.setAttribute('href', imagen.src);
        imagen.classList.add('img-fluid');
        imagen.alt = 'Imagen galeria';
    
        divImagen.appendChild(imagen);
    })
    
    modalImagen.addEventListener('hidden.bs.modal', (e) =>{ 
        divImagen.textContent= "";
    })
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
})()
}

function cargarMobilemenu() {
  const mobile_menu = document.querySelector("#mobile_menu");
  const menu = document.querySelector("#menu");
  const close_menu = document.querySelector("#menu .close");

  if(mobile_menu) {
    mobile_menu.addEventListener("click", () => {
      menu.classList.add("active");
      console.log(menu.classList.contains("active"));
    })
  }

  close_menu.addEventListener("click", () => {
    menu.classList.remove("active");
  })
}

function cargarGaleria(num) {
  const url = "../../json/galeria.json";
  const numProyecto = num ?? 0;

  if(galeria) {
    fetch(url)
      .then( res => res.json() )
      .then( data => printImages(data.galeria[numProyecto].images_data) )
      .catch( error => console.log(error) );
  }
}

function printImages(data) {
  console.log(data)
  clearSelector(galeria);

  data.forEach(image => {
    const  { name, url, folder } = image;
    
    const li_image = document.createElement("li");
    li_image.classList.add("col-md-6", "col-lg-4");
    li_image.innerHTML = `
    <a data-bs-toggle="modal" data-bs-target="#modal-img" data-bs-image="${name}" data-bs-folder="${folder}">
      <img class="img-fluid" src="${url}" alt="${name}">
    </a>
    `;

    galeria.appendChild(li_image);
  })
}

function clearSelector(selector) {
  while(selector.firstChild){
    selector.removeChild(selector.firstChild);
  }
}