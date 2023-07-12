// Inicializando select de Materialize

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});

// Funcion que calcula la cantidad de arroz de los LUNES

const calculateProductionMonday = (wheat) => {
    let rice = 3 * wheat;
    return rice;
}

// Funcion que calcula la cantidad de arroz de los MARTES

const calculateProductionTuesday = (wheat) => {
    let rice = wheat / 2;
    return rice;
}

// Funcion que calcula la cantidad de arroz de los MIERCOLES

const calculateProductionWednesday = (wheat) => {
    let rice = wheat / 4;
    return rice;
}

// Funcion que calcula la cantidad de arroz de los JUEVES

const calculateProductionThursday = (wheat) => {
    let rice = (3 * wheat) / 4;
    return rice;
}

// Funcion que calcula la cantidad de arroz de los VIERNES

const calculateProductionFriday = (wheat) => {
    let rice = 5 * wheat;
    return rice;
}

// Funcion que calcula la cantidad de arroz de los SABADO

const calculateProductionSaturday = (wheat) => {

    let rice = calculateProductionMonday(wheat);
    rice += calculateProductionTuesday(wheat);
    rice += calculateProductionWednesday(wheat);
    rice += calculateProductionThursday(wheat);
    rice += calculateProductionFriday(wheat);

    rice = 3 * rice;

    return rice;
}

// Funcion que calcula la cantidad de arroz de los DOMINGO

const calculateProductionSunday = (wheat) => {

    //Calculo lo ganado de lunes a viernes
    let riceWeek = calculateProductionSaturday(wheat) / 3;

    //Calculo lo ganado el sabado
    let riceSaturday = calculateProductionSaturday(wheat);

    //Calculo el total ganado en la semana
    let rice = riceWeek + riceSaturday;

    //Dono el 10%
    rice -= rice * (0.10);

    return rice;
}


// Funcion general 

const calculateProduction = () => {

    let wheatInput = document.getElementById('wheat_input');
    let wheat = parseFloat(wheatInput.value);

    let daySelect = document.getElementById('day_select');
    let day = parseFloat(daySelect.value);

    let dayText = '';

    let rice = 0;

    switch (day) {
        case 0:
            let riceMonday = calculateProductionMonday(wheat);
            let riceTuesday = calculateProductionTuesday(wheat);
            let riceWednesday = calculateProductionWednesday(wheat);
            let riceThursday = calculateProductionThursday(wheat);
            let riceFriday = calculateProductionFriday(wheat);
            let riceSaturday = calculateProductionSaturday(wheat);
            let riceSunday = calculateProductionSunday(wheat);

            rice = [{day: 'Lunes', rice: riceMonday},
            {day: 'Martes', rice: riceTuesday},
            {day: 'Miércoles', rice: riceWednesday},
            {day: 'Jueves', rice: riceThursday},
            {day: 'Viernes', rice: riceFriday},
            {day: 'Sábado',rice: riceSaturday},
            {day: 'Domingo', rice: riceSunday}]
            
            break;
        case 1:
            rice = calculateProductionMonday(wheat);
            dayText = 'Lunes';
            break;
        case 2:
            rice = calculateProductionTuesday(wheat);
            dayText = 'Martes';
            break;
        case 3:
            rice = calculateProductionWednesday(wheat);
            dayText = 'Miércoles';
            break;
        case 4:
            rice = calculateProductionThursday(wheat);
            dayText = 'Jueves';
            break;
        case 5:
            rice = calculateProductionFriday(wheat);
            dayText = 'Viernes';
            break;
        case 6:
            rice = calculateProductionSaturday(wheat);
            dayText = 'Sábado';
            break;
        case 7:
            rice = calculateProductionSunday(wheat);
            dayText = 'Domingo';
            break;
        default:
            console.log('Opción inválida');
    }

    showProduction(day, dayText, rice)

    return rice;

}

const showProduction = (day, dayText, rice) => {

    const resultsDiv = document.getElementById('results_div');

    if (day === 1 || day === 2 || day === 3 || day === 4 || day === 5 || day === 6) {
        resultsDiv.innerHTML = `<p>Resultados: La cantidad de arroz producida el día ${dayText} fue de ${rice} toneladas.</p>`;
    }

    if (day === 7){
        resultsDiv.innerHTML = `<p>Resultados: El ${dayText} se donó el 10% de la producción total, quedando un total de ${rice} toneladas de arroz para la producción.</p>`;
        resultsDiv.classList.add('results');
    }

    if (day === 0){

        resultsDiv.innerHTML = '';
        

        const p = document.createElement('p');
        p.innerText = 'Resultados:';

        resultsDiv.appendChild(p);

        const list = document.createElement('ul');

        for (const r of rice){
            const element = document.createElement('li');
            element.innerHTML = `${r.day} : ${r.rice} toneladas`;
            list.appendChild(element);
        }
        
        resultsDiv.appendChild(list);

        //For each y lista
    }

    resultsDiv.classList.add('results');


}

