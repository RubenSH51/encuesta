
const listaPreguntas = [
    {   pregunta: '¿Qué tan probable es que recomiendes esta página a un conocido?',
        opciones: {
            1: 'Es poco probable',
            10: 'Es muy probable',
        }
    },
    {   pregunta: '¿Qué te pareció el formato de los cursos?',
        opciones: {
            1: 'No me gustó nada',
            10: 'Me gustó muchísimo',
        }
    },
    {   pregunta: '¿Qué opinas del precio de los productos que ofrece la plataforma?',
        opciones: {
            1: 'Bastante caros',
            10: 'Muy baratos',
        }
    },
    {   pregunta: '¿Cómo calificarías al equipo de soporte?',
        opciones: {
            1: 'Bastante malo',
            10: 'Extremandamente eficiente',
        }
    },
    {   pregunta: '¿Qué tan conforme estás con el servicio?',
        opciones: {
            1: 'Nada conforme',
            10: 'Muy conforme',
        }
    },
]

const main = document.querySelector('main')
let valueBase = 0
const altoDeLaPantalla = document.documentElement.clientHeight;
const preguntasContainer = document.querySelector('.preguntasContainer')
let respuestas = {}
let preguntaActual = ''


window.onload = function(){

    /*  >>>> Documentación
        En la carga de la página se generan las preguntas y se 
        modifica el alto de los contenedores de cada pregunta.
    */    

    for (let j = 1; j <= listaPreguntas.length; j++) 
    {
        const div = document.createElement('div');
        div.setAttribute('class','pregunta')
        
        const h2 = document.createElement('h2');
        h2.textContent = `${j}) ${listaPreguntas[j-1].pregunta}`

        const p1 = document.createElement('p');
        p1.textContent = `1: ${listaPreguntas[j-1].opciones[1]}`
        const p2 = document.createElement('p');
        p2.textContent = `10: ${listaPreguntas[j-1].opciones[10]}`

        const div2 = document.createElement('div');
        div2.setAttribute('class','botonera');

        for (let k = 1; k <= 10; k++) 
        {
            const button = document.createElement('button');
            button.textContent = k;
            button.setAttribute('class','eleccion')
            button.setAttribute('onclick','opcionElegida(this)')
            div2.appendChild(button);
        }

        const button2 = document.createElement('button');
        button2.textContent = "Enviar";
        button2.setAttribute('class','botonEnviar')
        button2.setAttribute('onclick','next()')
        
        
        div.appendChild(h2)
        div.appendChild(p1)
        div.appendChild(p2)
        div.appendChild(div2)
        div.appendChild(button2);

        preguntasContainer.appendChild(div);
    }

    const divCierre = document.createElement('div');
    divCierre.setAttribute('class','pantallaCierre');
    divCierre.style = `height: ${altoDeLaPantalla}px;`;

    const algoMas = document.createElement('h2');
    algoMas.textContent = "¿Algo más que te gustaría aportar?"
    algoMas.setAttribute('class','feedback')

    const textarea = document.createElement('textarea');
    textarea.setAttribute('cols','40');
    textarea.setAttribute('rows','10');
    textarea.setAttribute('class','textarea');

    const botonEnviarCierre = document.createElement('button');
    botonEnviarCierre.setAttribute('class','submit');
    botonEnviarCierre.setAttribute('type','button');
    botonEnviarCierre.textContent="Enviar";
    botonEnviarCierre.setAttribute('onclick','closer()')
    
    
    const divCloser = document.createElement('div');
    divCloser.setAttribute('class','closer');
    divCloser.style = `height: ${altoDeLaPantalla}px;`;

    const tituloGracias = document.createElement('h2');
    tituloGracias.textContent = "Muchas gracias"
    tituloGracias.setAttribute('class','gracias')

    divCierre.appendChild(algoMas)
    divCierre.appendChild(textarea)
    divCierre.appendChild(botonEnviarCierre)
    preguntasContainer.appendChild(divCierre);

    divCloser.appendChild(tituloGracias)
    preguntasContainer.appendChild(divCloser);

    cargandoAlto()

}

function cargandoAlto(){

    /*  >>>> Documentación
        En la carga de la página se generan las preguntas y se 
        modifica el alto de los contenedores de cada pregunta.
    */    


    const preguntas = document.querySelectorAll('main .pregunta')

    for (let i = 0; i < preguntas.length; i++)    {
        preguntas[i].style = `height: ${altoDeLaPantalla}px` 
    }
}

function listaDeBotonesEnPantalla()
{
    let botonesEnPantalla = [];
    const buttons = document.querySelectorAll("button.eleccion");

    for (let button of buttons) 
    {
    const rect = button.getBoundingClientRect();

    if (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || 
        document.documentElement.clientHeight) && rect.right <= 
        (window.innerWidth || document.documentElement.clientWidth)) 
        {
            botonesEnPantalla.push(button);
        }
    }

    return botonesEnPantalla
}

function preguntaEnPantalla()
{
    const questions = document.querySelectorAll("h2");

    for (let q of questions) 
    {
    const rect = q.getBoundingClientRect();

    if (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || 
        document.documentElement.clientHeight) && rect.right <= 
        (window.innerWidth || document.documentElement.clientWidth)) 
        {
            if (q.textContent === '¿Algo más que te gustaría aportar?')
            {
                return "feedback"
            }
            else if (q.textContent === 'Muchas gracias') 
            {
                return "gracias"
            }
            else 
            {
                return Number(q.innerText[0]) 
            }
        }
    }

}


function opcionElegida(boton) 
{

    // Obteniendo selector de los botones en pantalla
    let botonesEnPantalla = listaDeBotonesEnPantalla()

    for (let i = 0; i < botonesEnPantalla.length; i++) 
    {
        if(botonesEnPantalla[i].classList.contains('opcionElegida'))
        {
            botonesEnPantalla[i].classList.remove('opcionElegida')
        }
        
    }
    boton.classList.toggle("opcionElegida");
}


function goUp()
{
    window.scrollTo(0,0);
    main.style = `transform: translateY(${0}px); transition: 0.6s all;`
    valueBase = 0
}


function goBack()
{
    let preguntaActual = preguntaEnPantalla();
    let valor = 0;

    if (preguntaActual == 'feedback')
    {
        valor = -631*4;
        main.style = `transform: translateY(${valor}px); transition: 0.6s all;`

        return
    }
    else if (preguntaActual == 'gracias')
    {
        valor = -631*5;
        main.style = `transform: translateY(${valor}px); transition: 0.6s all;`

        return
    }


    if (preguntaActual>2)
    {
        valor = -631*(preguntaActual-2)
        valueBase = 631*(preguntaActual-1);
    }
    main.style = `transform: translateY(${valor}px); transition: 0.6s all;`
    
}


// >>>>>>>>>>>>

function next()
{

    let botonesEnPantalla = listaDeBotonesEnPantalla();
    let hayUnaOpcionSeleccionada = false;

    for (let i = 0; i < botonesEnPantalla.length; i++) 
    {
        if(botonesEnPantalla[i].classList.contains("opcionElegida"))
        {
            hayUnaOpcionSeleccionada = true;
            break;
        }
        else
        {
            if (i===9)
            {
                //alert('Elija una opción antes de continuar');
                let listita = listaDeBotonesEnPantalla();

                for (let i = 0; i < listita.length; i++) 
                {
                    listita[i].classList.add('animate')
                }

                setTimeout(function() 
                {
                    for (let i = 0; i < listita.length; i++) 
                    {
                        listita[i].classList.remove('animate')
                    }
                }, 3000);
                
                return
            }
        }
        
    }


    for (let j = 0; j < botonesEnPantalla.length; j++) 
    {
        if(botonesEnPantalla[j].classList.contains("opcionElegida"))
        {
            //respuestas.push(botonesEnPantalla[j].textContent)
            preguntaActual = preguntaEnPantalla()
            respuestas['Pregunta '+preguntaActual] = botonesEnPantalla[j].textContent
        }
        
    }

    let voyPorAca = preguntaEnPantalla()
    let algo = 631

    //valueBase+=altoDeLaPantalla
    main.style = `transform: translateY(-${631+algo*(voyPorAca-1)}px); transition: 0.6s all;`

    /*
        1) Ver que halla seleccionado algo
        2) ir guardando valores
        3) avanzar
    
    */
}

function closer()
{

    //
    let esFeedback = preguntaEnPantalla();
    if (esFeedback === 'feedback')
    {
        const textarea = document.querySelector('textarea');
        respuestas['Feedback'] = textarea.value;
    }
    //


    let cantPreguntas = Object.keys(respuestas).length;
    main.style = `transform: translateY(-${631*(cantPreguntas)}px); transition: 0.6s all;`
}

