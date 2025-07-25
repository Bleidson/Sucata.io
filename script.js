    const registros = [];

    const form = document.querySelector('form');
    const selectMaterial = document.querySelector('#material-opt')
    const weigthMaterial = document.querySelector('#weigth-form')


    form.addEventListener('submit', function(event){
        event.preventDefault();

        const material = selectMaterial.value;
        const peso = weigthMaterial.value;
        const valorKg = 5.00;
        const total = peso * valorKg;

        const dataBuy = new Date();
        const hourBuy = dataBuy.toLocaleTimeString('pt-BR');

        const registro = {
            material,
            peso,
            valorKg,
            total,
            hourBuy,

        }

        registros.push(registro);

        

        form.reset();
        renderTable();

    });

    function renderTable(){
        const table = document.querySelector('#main-table');

        table.innerHTML = '';

        registros.forEach((registro, index) => {
            const line = document.createElement('tr');
            line.classList.add('row-table');

            const tdMaterial = document.createElement('td');
            tdMaterial.classList.add('material-table');
            tdMaterial.textContent = registro.material;

            const tdHourBuy = document.createElement('td');
            tdHourBuy.classList.add('time-table');
            tdHourBuy.textContent = registro.hourBuy;

            const tdWeigth = document.createElement('td');
            tdWeigth.classList.add('weigth-table');
            tdWeigth.textContent = registro.peso;

            const tdValue = document.createElement('td');
            tdValue.classList.add('value-table');
            tdValue.textContent = registro.total;

            const tdAction = document.createElement('td');
            tdAction.classList.add('more-table');
            tdAction.innerHTML = `<button class="more-togle-table">⋮</button>`;

            line.appendChild(tdMaterial);
            line.appendChild(tdHourBuy);
            line.appendChild(tdWeigth);
            line.appendChild(tdValue);
            line.appendChild(tdAction);

            table.appendChild(line);
        });
    };