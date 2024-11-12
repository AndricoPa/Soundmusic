const urlMusica = "http://localhost:3000/musicas";
const urlGenero = "http://localhost:3000/generomusical"
const urlUsuarios = "http://localhost:3000/usuarios" 
const urlPlaylist = "http://localhost:3000/playlist"

async function generoMusical() {
    const res = await fetch(urlGenero);
    const dados = await res.json();
    const generoOption = document.getElementById('generoMusical');
    generoOption.innerHTML += dados.genero.map((genero) => {
        return`
        <option value="${genero.id}">${genero.nome_genero}</option>
        `
    }).join('')
}
generoMusical()

async function userPush() {
    const res = await fetch(urlUsuarios);
    const dados = await res.json();
    const usuarioOption = document.getElementById('usuarioMusica');
    usuarioOption.innerHTML += dados.usuarios.map((user) => {
        return `
        <option value="${user.id}">${user.username}</option>
        `
    }).join('');
}
userPush()

async function popularPlaylists(idUsuario) {
    const res = await fetch(`${urlPlaylist}/usuario/${idUsuario}`);
    const dados = await res.json();
    const playlistOption = document.getElementById('albumMusica');
    playlistOption.innerHTML = dados.playlist.map((album) => {
        return `
            <option value="${album.id}">${album.nome_album}</option>
        `
    }).join('');
}

document.getElementById('usuarioMusica').addEventListener('change', function () {
    const idUsuario = this.value;
    if (idUsuario) {
        popularPlaylists(idUsuario);
    }else{
        document.getElementById('albumMusica').innerHTML = '<option value="">Escolha um usuario primeiro</option>';
    }
});

const formulario = document.getElementById('formularioMusica');
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dataForm = {
        foto_musica: document.getElementById('foto').value,
        nome_musica: document.getElementById('nome').value,
        link_musica: document.getElementById('link').value,
        id_genero: document.getElementById('generoMusical').value,
        id_usuario: document.getElementById('usuarioMusica').value,
        id_album: document.getElementById('albumMusica').value
    }
    const resposta = await fetch("http://localhost:3000/musicas", {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(dataForm),
    })
    if(resposta.ok){
        alert('postado com sucesso');
        formulario.reset();
    }else{
        alert('erro')
    }
})