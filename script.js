 
    // Login simples
    const loginForm = document.getElementById('loginForm');
    const loginPage = document.getElementById('loginPage');
    const parkingPage = document.getElementById('parkingPage');

    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const usuario = document.getElementById('usuario').value;
      const senha = document.getElementById('senha').value;

      if (usuario && senha) {
        loginPage.style.display = 'none';
        parkingPage.style.display = 'block';
      } else {
        alert("Usuário e senha são obrigatórios!");
      }
    });

    // Cadastro de veículos
    const formVeiculo = document.getElementById('formVeiculo');
    const tabela = document.querySelector('#tabelaVeiculos tbody');
    const placasCadastradas = new Set();
    const successMessage = document.getElementById('successMessage');

    formVeiculo.addEventListener('submit', function(e) {
      e.preventDefault();

      const placa = document.getElementById('placa').value.toUpperCase();
      const tipo = document.getElementById('tipo').value;
      const nome = document.getElementById('nome').value;
      const entrada = document.getElementById('entrada').value;

      // Verificar placa duplicada
      if (placasCadastradas.has(placa)) {
        alert("Essa placa já está cadastrada!");
        return;
      }

      // Verificar se hora de entrada é futura
      const agora = new Date();
      const [hora, minuto] = entrada.split(":");
      const horaEntrada = new Date();
      horaEntrada.setHours(hora, minuto, 0, 0);

      if (horaEntrada > agora) {
        alert("Não é permitido cadastrar veículos com hora futura!");
        return;
      }

      // Criar linha na tabela
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${placa}</td>
        <td>${tipo}</td>
        <td>${nome}</td>
        <td>${entrada}</td>
        <td><button class="remove-btn">Remover</button></td>
      `;

      tabela.appendChild(row);
      placasCadastradas.add(placa);

      formVeiculo.reset();

      // Mostrar mensagem de sucesso
      successMessage.style.display = 'block';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);

      // Remover veículo
      row.querySelector('.remove-btn').addEventListener('click', function() {
        tabela.removeChild(row);
        placasCadastradas.delete(placa);
      });
    });
  