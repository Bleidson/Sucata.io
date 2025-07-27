    const registros = [];

    const form = document.querySelector('form');
    const selectMaterial = document.querySelector('#material-opt')
    const weigthMaterial = document.querySelector('#weigth-form')

    let tabelaAtual = 'registroRotaA';

    const valoresPorKg = {
        latinha: 7.50,
        cobre: 35,
        chaparia: 5,
        aluminioDuro: 4,
        metal: 13,
        ferroLata: 0.50,
        ferroPesado: 0.70
    };

    selectMaterial.addEventListener('change', function(){
        const materialSelecionado = selectMaterial.value;
        const valorkg = valoresPorKg[materialSelecionado] || 0;
    })


    form.addEventListener('submit', function(event){
        event.preventDefault();

        const material = selectMaterial.value;       
        const peso = weigthMaterial.value;
        const pesoFormatado = Number(peso).toFixed(2);

        if(!peso || peso <= 0){
            alert("Inserir um peso valido maior que zero");
            return;
        }

        const valorKg = valoresPorKg[material] || 0;
        const total = peso * valorKg;
        const totalFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(total);


        const dataBuy = new Date();
        const hourBuy = dataBuy.toLocaleString('pt-BR');

        const registro = {
            material,
            peso: pesoFormatado,
            valorKg,
            total: totalFormatado,
            hourBuy,

        }
        registros.push(registro);
        salvarRegistros();
        

        form.reset();
        renderTable();

    });


    document.addEventListener('DOMContentLoaded', function () {
        // Escuta os botões depois que o DOM carregar
        
        document.getElementById('btn-rota-a').addEventListener('click', function(){
            tabelaAtual = 'registroRotaA';
            carregarRegistros();
            renderTable();
            document.querySelector('form').style.display = `block`;
        });

        document.getElementById('btn-rota-b').addEventListener('click', function(){
            tabelaAtual = 'registroRotaB';
            carregarRegistros();
            renderTable();
            document.querySelector('form').style.display = `block`;
        });

        document.getElementById('btn-deposito').addEventListener('click', function(){
            tabelaAtual = 'registroDeposito';
            carregarRegistros();
            renderTable();
            document.querySelector('form').style.display = `block`;
        });

        document.getElementById('btn-total').addEventListener('click', function(){
            tabelaAtual = 'registroTotal';
            carregarRegistros();
            renderTabelaTotal();
            document.querySelector('form').style.display = `none`;
        })

        carregarRegistros();
        renderTable();

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

    function salvarRegistros(){
        localStorage.setItem(tabelaAtual, JSON.stringify(registros));
    };    

    function carregarRegistros(){
        const dadosSalvos = localStorage.getItem(tabelaAtual);
        registros.length = 0;
        if(dadosSalvos){
            registros.push(...JSON.parse(dadosSalvos));
        }
    };

    function renderTabelaTotal(){
        const thead = document.querySelector('#thead');
        const tbody = document.querySelector('#tbody');

        thead.innerHTML = `
            <thead>
                <tr>
                    <th>Material</th>
                    <th>Data/Hora</th>
                    <th>Peso</th>
                    <th>Valor</th>
                    <th>Origem</th>
                </tr>
            </thead>
        `;
        tbody.innerHTML = '';

        const tabelas = ['registroRotaA', 'registroRotaB', 'registroDeposito'];
        let todosRegistros = [];

        tabelas.forEach((tabela) => {
            const dados = JSON.parse(localStorage.getItem(tabela)) || [];
            const origem = tabela.replace('registro', '');
            dados.forEach(registro => {
                todosRegistros.push({ ...registro, origem});
            });
        });

        if(todosRegistros.length === 0){
            const voidRow = document.createElement('tr');
            voidRow.classList.add('void-row');
            voidRow.innerHTML = `<td class="void-table"> Nenhuma Compra Registrada</td>`;
            return;
        }

        todosRegistros.reverse().forEach((registro) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${registro.material}</td>
                <td>${registro.hourBuy}</td>
                <td>${registro.peso}</td>
                <td>${registro.total}</td>
                <td>${registro.origem}</td>
            `;

            tbody.appendChild(row);
        });
    }

    function renderTable(){
        const thead = document.querySelector('#thead');
        const tbody = document.querySelector('#tbody');

        thead.innerHTML = `
            <thead>
                <tr>
                    <th>Material</th>
                    <th>Data/Hora</th>
                    <th>Peso</th>
                    <th>Valor</th>
                </tr>
            </thead>
        `;
        tbody.innerHTML = '';

        if(registros.length === 0){
            const voidRow = document.createElement('tr');
            voidRow.classList.add('void-row');

            const tdVoid = document.createElement('td');
            tdVoid.classList.add('void-table');
            tdVoid.textContent = "Nenhuma Compra Registrada";

            tdVoid.colSpan = 5;

            voidRow.appendChild(tdVoid);
            tbody.appendChild(voidRow);
            return;
        }

        registros.reverse().forEach((registro, index) => {
            const row = document.createElement('tr');
            row.classList.add('row-table');

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

            row.appendChild(tdMaterial);
            row.appendChild(tdHourBuy);
            row.appendChild(tdWeigth);
            row.appendChild(tdValue);
            row.appendChild(tdAction);

            tbody.appendChild(row);
        });
    };