    const registros = [];

    const form = document.querySelector('form');
    const selectMaterial = document.querySelector('#material-opt')
    const weigthMaterial = document.querySelector('#weigth-form')


    form.addEventListener('submit', function(event){
        event.preventDefault();

        const material = selectMaterial.value;
        
        const peso = weigthMaterial.value;
        const pesoFormatado = Number(peso).toFixed(2);
        if(!peso || peso <= 0){
            alert("Inserir um peso valido maior que zero");
            return;
        }

        const valorKg = 5.00;

        const total = peso * valorKg;
        const totalFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(total);


        const dataBuy = new Date();
        const hourBuy = dataBuy.toLocaleTimeString('pt-BR');

        const registro = {
            material,
            peso: pesoFormatado,
            valorKg,
            total: totalFormatado,
            hourBuy,

        }

        registros.push(registro);

        

        form.reset();
        renderTable();




    });
    /*
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                registros.splice(index, 1);
                renderTable();
            })
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const item = registros[index];
         

                selectMaterial.value = item.material;
                weigthMaterial.value = item.peso;

                registros.splice(index, 1);
                renderTable();
            });
        });
*/

        document.addEventListener('DOMContentLoaded', function () {
            // Escuta os botões depois que o DOM carregar
            document.querySelector('#main-table').addEventListener('click', function (e) {
                const target = e.target;
                const index = parseInt(target.dataset.index);

                if (target.classList.contains('delete-btn')) {
                    registros.splice(index, 1);
                    renderTable();
                }

                if (target.classList.contains('edit-btn')) {
                    const item = registros[index];
                if (!item) {
                    console.error('Item não encontrado no índice:', index);
                    return;
                }

                selectMaterial.value = item.material;
                weigthMaterial.value = item.peso;
                registros.splice(index, 1);
                renderTable();
                }
            });
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
            tdAction.innerHTML = `
                <button class="edit-btn" data-index="${index}">✏️</button>
                <button class="delete-btn" data-index="${index}">🗑️</button>
            `;

            line.appendChild(tdMaterial);
            line.appendChild(tdHourBuy);
            line.appendChild(tdWeigth);
            line.appendChild(tdValue);
            line.appendChild(tdAction);

            table.appendChild(line);
        });
    };