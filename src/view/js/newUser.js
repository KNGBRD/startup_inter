document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm_password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    confirmPasswordField.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '🙈'; // Muda o ícone de olho conforme a ação
});

document.getElementById('submit').addEventListener('click', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const permission = document.getElementById('permission').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const backendUrl = 'http://127.0.0.1:5000';

    if (name === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Preencha todos os campos!');
        return;
    }
    if (password !== confirmPassword) {
        alert('As senhas não conferem!');
        return;
    }
    //validaçao de e-mail
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, insira um endereço de e-mail válido!');
        return;
    }
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        alert('A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial!');
        return;
    }

    const dataBody = {
        name: name,
        email: email,
        permission: permission,
        password: password,
        confirm_password: confirmPassword,
    };

    const url = `${backendUrl}/signup`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataBody) // Aqui é onde você insere os dados do corpo
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }  
        const data = await response.json();
        console.log(data);//teste     
        alert("Usuário cadastrado com sucesso!");   

    } catch (error) {
        console.error(`Erro ao fazer a requisição: ${error}`);
    }


});
