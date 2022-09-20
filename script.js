const activar = () => {
    disactivarBoton(GLOBAL.verdad)
    const bolos = document.getElementsByClassName(GLOBAL.bolosClass);
    
    moverTombola(bolos);
}

const disactivarBoton = (opcion) => {
    const btn = document.getElementById(GLOBAL.botonId);
    btn.disabled = opcion;
}

const moverTombola = (bolos) => {
    let interval = setInterval(() => {
        for(let bolo of bolos){
            bolo.setAttribute(GLOBAL.atributoEstilo, GLOBAL.estiloDifuminado)
            bolo.innerHTML = numeroAleatorio(GLOBAL.decena.fin, GLOBAL.decena.inicio, GLOBAL.falsedad)
        }
    }, GLOBAL.tiempo.rapido);

    conseguirResultados();
    setTimeout(() => {
        pararTombola(interval, bolos)
    }, GLOBAL.tiempo.espera);
}

const numeroAleatorio = (max, min, useNoIgual, resultados = []) => {
    const num = Math.floor((Math.random() * (max - min + GLOBAL.decena.inicio)) + min);
    
    return useNoIgual ? (resultados.includes(num) ? numeroAleatorio(max, min, GLOBAL.verdad, resultados) : num) : num;
}

const conseguirResultados = () => {
    const max = GLOBAL.rangoNumeros.maximo;
    const min = GLOBAL.rangoNumeros.minimo;
    const resultados = []
    let numeroAlazar = GLOBAL.numeroVacio;
    
    while(resultados.length <  GLOBAL.boloCantidad){
        numeroAlazar = numeroAleatorio(max, min, GLOBAL.verdad, resultados);
        resultados.push(numeroAlazar)
    }
    
    return resultados;
}

const pararTombola = (interval, bolos) => {

    const resultados = conseguirResultados();
    clearInterval(interval);
    mostrarResultados(bolos, resultados)
}

const mostrarResultados = (bolos, resultados) => {
    for(let i = GLOBAL.numeroVacio; i < bolos.length; i++){
        bolos[i].removeAttribute(GLOBAL.atributoEstilo)
        bolos[i].innerHTML = resultados[i]
    }
    disactivarBoton(GLOBAL.falsedad)
    console.log(resultados)
}

const GLOBAL = {
    bolosClass: "bolo",
    botonId: "btn",
    atributoEstilo: "style",
    estiloDifuminado: 'filter: blur(4px);',
    verdad: true,
    falsedad: false,
    tiempo: {
        espera: 5000,
        rapido: 0 
    },
    numeroVacio: 0,
    decena: {
        inicio: 1,
        fin: 9
    },
    rangoNumeros: {
        maximo: 80,
        minimo: 1
    },
    boloCantidad: 6
}