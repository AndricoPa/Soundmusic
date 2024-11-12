const modal = document.getElementById('modal')
const button = document.getElementById('botao')
var span = document.getElementsByClassName("close")[0];
    
button.onclick = function(){
    modal.style.display = "block";
} 
span.onclick = function(){
    modal.style.display = "none";
 }
 
const urlUser = 'http://localhost:3000/usuarios'

async function pushUser() {
    const res = await fetch(urlUser)
    const dados = await res.json()
    console.log(dados)
    const opicoes = document.getElementById('usuarios')
    opicoes.innerHTML += dados.usuarios.map((user) => {
        return `<option value="${user.id}">${user.username}</option>`
    })
}
pushUser()

const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = {
        nome_album: document.getElementById('nome').value,
        foto_album: document.getElementById('url').value,
        id_usuario: document.getElementById('usuarios').value
    }
    console.log(dados);
    
    const resposta = await fetch("http://localhost:3000/playlist", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    if(resposta.ok){
        alert('Playlist criada com sucesso')
        formulario.reset();
    }else{
        alert('Erro ao criar playlist')
    }
}) 