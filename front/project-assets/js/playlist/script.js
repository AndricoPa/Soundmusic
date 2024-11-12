const param = new URLSearchParams(window.location.search);
const idParams = param.get('id') 
const urlPlaylist = `http://localhost:3000/playlist/${idParams}`
const urlMusica = `http://localhost:3000/musicas/playlist/${idParams}`

async function pushAlbum() {
    const res = await fetch(urlPlaylist);
    const dados = await res.json();
    console.log(dados);
    const capaAlbum = document.getElementById('foto')
    const album = Array.isArray(dados.playlist) ? dados.playlist[0] : dados.playlist;
    capaAlbum.innerHTML = `<img src="${album.foto_album}" alt="">`
    const nomeAlbum = document.getElementById('nome')
    nomeAlbum.innerHTML = `<h2>${album.nome_album}</h2>`
}
pushAlbum()

async function pushSong() {
    const res = await fetch(urlMusica);
    const dados = await res.json();
    console.log(dados);
    const listaMusica = document.getElementById('musicas')
    listaMusica.innerHTML = dados.musicas.map((musica) => {
        return`
            <div class="musica" onclick="window.location.href='${musica.link_musica}'">
                <img src="${musica.foto_musica}" alt="">
                <div>
                    <p>${musica.nome_musica}</p>
                </div>
            </div>
        `
    }).join('')
}
pushSong()