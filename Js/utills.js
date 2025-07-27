export function renderTabelaTotal(thead, tbody, limiteTabelaTotal) {
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
            todosRegistros.push({ ...registro, origem });
        });
    });

    if (todosRegistros.length === 0) {
        const voidRow = document.createElement('tr');
        voidRow.classList.add('void-row');
        voidRow.innerHTML = `<td class="void-table"> Nenhuma Compra Registrada</td>`;
        tbody.appendChild(voidRow);
        return;
    }

    todosRegistros.splice(0, limiteTabelaTotal).reverse().forEach((registro) => {
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
