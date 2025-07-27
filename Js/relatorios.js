import { renderTabelaTotal } from "./utills.js";

document.addEventListener('DOMContentLoaded', () => {
    const thead = document.querySelector('#thead');
    const tbody = document.querySelector('#tbody');

    document.querySelector('.extract-btn').addEventListener('click', gerarExtratoPDF);
    document.querySelector('.print-btn').addEventListener('click', () => {
        window.print();
    })

    renderTabelaTotal(thead, tbody, 5);
    renderResumoFinanceiro();
    renderGraficoPizza();
    exibirHorarioFechamento();
});

function renderResumoFinanceiro(){
    const tabelas = ['registroRotaA', 'registroRotaB', 'registroDeposito'];
    
    let saidaTotal = 0;
    let totalKg = 0;
    let totalRegistros = 0;

    tabelas.forEach((tabela) => {
        const dados = JSON.parse(localStorage.getItem(tabela)) || [];
        totalRegistros += dados.length;
        dados.forEach((registro) => {
            const valorNumerico = Number(registro.total.replace("R$", "").replace(/\./g, "").replace(",", ".").trim());
            saidaTotal += valorNumerico;
            totalKg += Number(registro.peso);
        });
    });

    const divResumo = document.querySelector('#info-finances');
    divResumo.innerHTML = `
        <p><strong>Saida Total: </strong>R$${saidaTotal.toFixed(2)}</p>
        <p><strong>Total de KG Comprados: </strong>${totalKg.toFixed(2)}kg</p>
        <p><strong>Total de Entradas: </strong>${totalRegistros} Registros</p>
    `;

};

function renderGraficoPizza(){
    const tabelas = ['registroRotaA', 'registroRotaB', 'registroDeposito'];
    const nomes = ['Rota A', 'Rota B', 'Deposito'];
    const valores = [];

    tabelas.forEach((tabela) => {
        const dados = JSON.parse(localStorage.getItem(tabela)) || [];
        let totalOrigem = 0;

        dados.forEach((registro) => {
            const valorNumerico = Number(registro.total.replace("R$", "").replace(",", "."));
            totalOrigem += valorNumerico;
        });

        valores.push(totalOrigem.toFixed(2));
    });
    const ctx = document.getElementById('graficoPizza');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: nomes,
            datasets: [{
                label: 'Saida Total',
                data: valores,
                backgroundColor: ['#3498db', '#2ecc71', '#e74c3c'],
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '333',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }

    });
};

function gerarExtratoPDF(){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF;

    const colunas = ["Material", "Data/Hora", "Peso (kg)", "Valor (R$)", "Origem"];
    const linhas = [];

    const tabelas = ['registroRotaA', 'registroRotaB', 'registroDeposito'];


    tabelas.forEach((tabela) => {
        const dados = JSON.parse(localStorage.getItem(tabela)) || [];
        const origem = tabela.replace("registro", "");

        dados.forEach((registro) => {
            linhas.push([
                registro.material,
                registro.hourBuy,
                registro.peso,
                registro.total,
                origem
            ]);
        });
    });

    doc.setFontSize(16);
    doc.text("Extrato Diario - Sucata.io", 14, 20);

    doc.autoTable({
       head: [colunas],
       body: linhas,
       startY: 30,
       styles: {
        fontSize: 10,
        cellPadding: 4
       },
       headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
       }
    });

    doc.save("extrato-sucata.pdf");
}

function exibirHorarioFechamento(){
    const horaFechamento = localStorage.getItem('horaFechamento');
    const span = document.querySelector('#horarioFechamento');
    span.innerHTML = `Horario de Fechamento: ${horaFechamento}`
}