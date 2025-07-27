# 💰 Sistema de Controle de Compras — Sucata.io

Este projeto nasceu de uma necessidade real dentro de um ferro-velho, onde o controle de compras era feito manualmente em cadernos físicos. Essa abordagem tradicional dificultava o acesso, a análise e a confiabilidade das informações, especialmente na hora de fechar o caixa ao final do dia.

**Sucata.io** é a solução digital criada para organizar, visualizar e consolidar esses dados de maneira simples, acessível e funcional.

---

## 🚀 Funcionalidades Implementadas

### 📝 Registro de Compras
- Interface dinâmica para registrar materiais comprados por:
  - Rota A 
  - Rota B
  - Depósito
- Cada origem funciona como um "caderno digital" separado
- Os dados são armazenados localmente no navegador via `localStorage`

### 🗃️ Tabela Total Consolidada
- Visualização geral com todos os registros, independentemente da origem
- Filtro de exibição com limite de registros (ex: últimos 5 registros)

### 📊 Relatório Diário
- Página de relatório que exibe:
  - Tabela total consolidada
  - Total arrecadado (R$)
  - Total de quilos comprados
  - Número total de entradas
  - Gráfico em pizza com arrecadação por origem
  - Horário de fechamento do caixa

### 📄 PDF e Impressão
- Geração de um **PDF com o extrato completo** da tabela total
- Botão de **impressão direta do relatório** para arquivamento físico

### 🕔 Fechamento de Caixa com Hora
- Ao clicar em **"Fechar Caixa"**:
  - O sistema salva a data/hora
  - Redireciona automaticamente para a página de relatório
  - Exibe o relatório do dia com todas as informações processadas

---

## 🧱 Tecnologias Utilizadas

- **HTML + CSS + JavaScript Vanilla** (sem frameworks)
- **Chart.js** para visualização gráfica (pizza)
- **jsPDF + autoTable** para geração de extratos em PDF
- **LocalStorage** para persistência de dados sem back-end

---


## 💼 Caso de Uso Real

Este sistema foi idealizado por alguém que trabalha diretamente em um ferro-velho, onde diariamente são compradas cargas de materiais recicláveis em diferentes rotas. Ao digitalizar esse processo, **a conferência de valores, o fechamento diário e a organização geral melhoraram drasticamente**.

---

## 👨‍💻 Autor

**Dr. Bleidson** — Desenvolvedor web & lutador de Jiu-Jitsu nas horas vagas.  
Criando soluções que nascem da prática e viram código.

---

## 📌 Licença

Este projeto é de uso pessoal e educacional. Fique à vontade para se inspirar, adaptar ou contribuir.
