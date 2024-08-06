const estadosAVisitar = [
    ['A', 'DIRTY', 'DIRTY'],
    ['B', 'DIRTY', 'DIRTY'],
    ['A', 'DIRTY', 'CLEAN'],
    ['B', 'DIRTY', 'CLEAN'],
    ['A', 'CLEAN', 'DIRTY'],
    ['B', 'CLEAN', 'DIRTY'],
    ['A', 'CLEAN', 'CLEAN'],
    ['B', 'CLEAN', 'CLEAN']
];

function reflexAgent(location, state, cont) {
    if (state === "DIRTY") {
        return 'CLEAN';
    } else if (cont === 2 || cont === 4) {
        return 'DIRTY';
    } else if (location === 'A') {
        return 'RIGHT';
    } else if (location === 'B') {
        return 'LEFT';
    }
}

function test(states) {
    let aBclean = 0;
    let estadoInicial = [...states];

    const interval = setInterval(() => {
        const location = states[0];
        const state = (states[0] === 'A') ? states[1] : states[2];
        const action = reflexAgent(location, state, aBclean);
        console.log(`Location: ${location} | Action: ${action}`);
        document.getElementById("log").innerHTML+="<br>Location: ".concat(location).concat(" | Action: ").concat(action);
        
        if (action === "CLEAN") {
            if (location === 'A') {
                states[1] = "CLEAN";
            } else if (location === 'B') {
                states[2] = "CLEAN";
            }
        } else if (action === "RIGHT") {
            states[0] = 'B';
        } else if (action === "LEFT") {
            states[0] = 'A';
        } else if (action === "DIRTY") {
            // Ensuciando los dos estados (A,B), en posición opuesta al estado inicial
            if (states[0] !== estadoInicial[0]) {
                estadoInicial = [...states];
                states[1] = "DIRTY";
                states[2] = "DIRTY";
                aBclean = 0;
            }
        }
        
        // Eliminando estado visitado
        const index = estadosAVisitar.findIndex(e => e.toString() === states.toString());
        if (index !== -1) {
            estadosAVisitar.splice(index, 1);
            console.log(`(Estado ${states} visitado)`);
        }

        if (estadosAVisitar.length === 0) {
            console.log("Se visitaron los 8 estados!");
            clearInterval(interval);
        }

        // Validación de ciclo en estados A, B = CLEAN, CLEAN
        if (states[1] === 'CLEAN' && states[2] === 'CLEAN') {
            aBclean += 1;
        }
    }, 1000);
}

test(['A', 'DIRTY', 'DIRTY']);
