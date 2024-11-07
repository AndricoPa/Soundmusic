let urlUser = "http://localhost:3000/usuarios"
let urlSong = "http://localhost:3000/musicas"

async function pushUsuarios() {
    const response = await fetch(urlUser)
    console.log(response);
    const dados = await response.json();
    console.log(dados);
    const cardUser = document.getElementById('artistasSeguidos')
    console.log(cardUser);
    const maxUser = 5
    cardUser.innerHTML = dados.usuarios.slice(0, maxUser).map((user) => {
        return `
        <div id="artistaCard" onclick="location.href='userIndex.html?id=${user.id}'">
        <img src="${user.foto_usuario}" alt="Artista X">
        <h3>${user.username}</h3>    
        <p>Artista</p>
        </div>
        `

    }).join('')
}
pushUsuarios()

async function pushSong() {
    const response = await fetch(urlSong)
    const dados = await response.json()
    console.log(dados);
    const cardSong = document.getElementById('musicas')
    const maxSong = 10
    cardSong.innerHTML = dados.musicas.slice(0, maxSong).map((song) => {
        return`
        <div class="musicaCardSimples">
            <div class="musicaCardSimplesImg">
                <img src="${song.foto_musica}" alt="Foto da musica ${song.nome_musica}">
            <div class="musicaCardSimplesImgTxt">
                <p>${song.nome_musica}</p>
                <h6>${song.id_usuario}</h6>
            </div>
            </div>
            <div class="musicaCardSimplesIcon">
                <i class="bi bi-plus-circle"></i>
            </div>
        </div>
        `
    }).join('')
}
pushSong()
