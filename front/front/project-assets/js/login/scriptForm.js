const formularioC = document.getElementById('formularioCadastro');
formularioC.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dataForm = {
        username: document.getElementById('name-user').value,
        senha: document.getElementById('senha-user').value,
        foto_usuario: document.getElementById('url-user').value,
        id_plano: 1
    }
    const resposta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(dataForm),
    })
    if(resposta.ok){
        alert('postado com sucesso');
        formulario.reset();
    } else {
        alert('erro')
    }
})

function olho() {
    const olhar = document.getElementById('senha-user')
    if (olhar.type === 'text'){
        olhar.type = 'password'
    }else{
        olhar.type = 'text'
    }
}
function olhar() {
    const olhar = document.getElementById('Senha-usuario')
    if (olhar.type === 'text'){
        olhar.type = 'password'
    }else{
        olhar.type = 'text'
    }
}