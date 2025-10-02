// Cadastro (front-end)
const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
  formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmar = document.getElementById('confirmar-senha').value;
    if (senha !== confirmar) return alert('As senhas não coincidem');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.error || 'Erro no cadastro');
    alert('Cadastro realizado com sucesso!');
    window.location.href = '/index.html';
  });
}

// Login (front-end)
const formLogin = document.getElementById('form-login');
if (formLogin) {
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.error || 'Erro no login');

    localStorage.setItem('user', JSON.stringify(data.user));
    alert('Login realizado!');
    window.location.href = '/plantio.html';
  });
}
