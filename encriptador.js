function validarTexto(texto) {
    // Verifica si el texto contiene mayúsculas o acentos
    const regex = /[ÁÉÍÓÚÑáéíóúñ]/;
    return !regex.test(texto) && texto === texto.toLowerCase();
}

function cifradoTexto(texto, modo) {
    let mayusculasAcentos = document.getElementById('mayus-acentos')
    if (!validarTexto(texto)) {
        mayusculasAcentos.style.color = '#B43F3F';
        return;
    } else {
        mayusculasAcentos.style.color = '#272727';
    }

    var resultado = '';

    // Llaves de encriptación
    var llavesEncriptacion = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    var llavesDesencriptacion = {};
    Object.keys(llavesEncriptacion).forEach(key => {
        llavesDesencriptacion[llavesEncriptacion[key]] = key;
    });


    for (var i = 0; i < texto.length; i++) {
        var letra = texto[i];
        var encriptada = llavesEncriptacion[letra];

        if (modo === 'encriptar') {
            if (encriptada) {
                resultado += encriptada;
            } else {
                resultado += letra;
            }
        } else if (modo === 'desencriptar') {
            // Para desencriptar, se necesita buscar secuencias en el texto
            var tempTexto = texto;
            var keysOrdenadas = Object.keys(llavesDesencriptacion).sort((a, b) => b.length - a.length); // Ordenar por longitud descendente

            keysOrdenadas.forEach(key => {
                var regex = new RegExp(key, 'g'); // Crear una expresión regular para buscar la secuencia
                tempTexto = tempTexto.replace(regex, llavesDesencriptacion[key]); // Reemplazar la secuencia con la letra original
            });

            resultado = tempTexto;
        }
    }
    mostrarTextoEncriptado(resultado);
}

// Función para mostrar el texto encriptado/desencriptado en la interfaz
function mostrarTextoEncriptado(texto) {
    var contenidoTextoEncriptado = document.querySelector('.contenido-texto-encriptado');

    //Estilos desde una funcion para ajustar tamaño pantalla
    ajustarAnchoSegunPantalla(contenidoTextoEncriptado);


    contenidoTextoEncriptado.innerHTML = ''; // Limpia contenido anterior (div (Imagen y Parrafo) )

    var parrafo = document.createElement('textarea');
    parrafo.textContent = texto;
    contenidoTextoEncriptado.appendChild(parrafo);

    //Estilos para mostrar el parrafo encripatdo/Desencriptado
    parrafo.style.width = "100%"
    parrafo.style.height = "100%";
    parrafo.style.textAlign = 'left';
    parrafo.style.display = "flex";
    parrafo.style.flexDirection = "column";
    parrafo.style.alignself = "flex-start";
    parrafo.style.fontSize = "1rem";
    parrafo.style.color = '#0C0C0C';
    parrafo.style.fontFamily = "'Inter', sans-serif";

    // Agregar enlace para copiar texto
    agregarEnlaceCopiar(parrafo);
    limpiarCaja();
}

function limpiarCaja() {
    document.querySelector('#texto').value = ''
}

// Función para agregar el enlace 
function agregarEnlaceCopiar(parrafo) {
    var contenidoTextoEncriptado = document.querySelector('.contenido-texto-encriptado');

    // Crear enlace
    var enlace = document.createElement('a');
    enlace.textContent = 'Copiar';
    enlace.href = '#';

    // Estilos del enlace copiar
    enlace.style.width = '50%';
    enlace.style.backgroundColor = '#006F77';
    enlace.style.padding = '15px 0';
    enlace.style.borderRadius = '24px';
    enlace.style.color = '#FFFFFF';
    enlace.style.textDecoration = 'none';
    enlace.style.display = 'inline-block';
    enlace.style.fontFamily = 'Inter, sans-serif';
    enlace.style.fontSize = '1.25rem';
    enlace.style.fontWeight = '600';
    enlace.style.alignself = "flex-start";
    enlace.style.textAlign = "center"

    // Función para copiar texto al hacer clic en el enlace copiar
    enlace.onclick = function () {
        copiarTextoAlPortapapeles(parrafo.textContent);
        return false; // Evitar que se recargue la página
    };

    // Agregar enlace al contenido
    contenidoTextoEncriptado.appendChild(enlace);
}

// Función para copiar texto 
function copiarTextoAlPortapapeles(texto) {
    // Crear elemento de textarea para copiar el texto
    var textarea = document.createElement('textarea');
    textarea.value = texto;
    document.body.appendChild(textarea);

    // Seleccionar el texto y copiarlo 
    textarea.select();
    document.execCommand('copy');

    // Remover el elemento textarea
    document.body.removeChild(textarea);

    // Alerta o mensaje para indicar que se copió el texto
    alert('Texto copiado ');
}

// Funciones específicas para encriptar y desencriptar, llamando a la función cifradoTexto
function encriptarTexto() {
    var texto = document.getElementById('texto').value;
    cifradoTexto(texto, 'encriptar');

    document.querySelector('#desencriptarr').removeAttribute('disabled')
}

function desencriptarTexto() {
    var texto = document.getElementById('texto').value;
    cifradoTexto(texto, 'desencriptar');

    document.querySelector('#desencriptarr').setAttribute('disabled', 'true')
}

//Ajustar pantalla de acuerdo a dispositivo utilizado
function ajustarAnchoSegunPantalla(elemento) {
    var screenWidth = window.innerWidth;

    if (screenWidth <= 560) {
        elemento.style.width = '350px';
    }
}