const params = new URLSearchParams(window.location.search);
const idParams = params.get('id');
let urlUser = `http://localhost:3000/usuarios/${idParams}`;
let urlPlaylist = `http://localhost:3000/playlist/usuario/${idParams}`;


async function pushUser() {
    try {
        const response = await fetch(urlUser);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const dados = await response.json();
        console.log("Dados recebidos da API:", dados);
        const userDados = document.getElementById('userTop');
        const usuario = Array.isArray(dados.usuario) ? dados.usuario[0] : dados.usuario;
        if (usuario && usuario.foto_usuario && usuario.username) {
            userDados.innerHTML = `
                <div class="userImg">
                    <img src="${usuario.foto_usuario}" alt="Foto do usuario ${usuario.username}">
                </div>
                <div class="username">
                    <h1>@${usuario.username}</h1>
                </div>
            `;
        } else {
            throw new Error("A estrutura dos dados não contém as propriedades esperadas.");
        }

    } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
    }
}
pushUser();

async function pushPlaylist() {
    try {
        const response = await fetch(urlPlaylist);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const dados = await response.json();
        console.log(dados);

        const userPlaylist = document.getElementById('playlistList');
        userPlaylist.innerHTML = dados.playlist.map((album) => {
            return `
                <div class="playlistUser" onclick="location.href='playlistIndex.html?id=${album.id}'">
                    <div class="capaAlbum">
                        <img src="${album.foto_album}" alt="Foto da capa do álbum ${album.nome_album}">
                    </div>
                    <div class="nomeAlbum">
                        <h1>${album.nome_album}</h1>
                    </div>
                </div>
            `
        }).join('')
    } catch (error) {
        console.error("Erro ao buscar as playlists:", error);
    }
}
pushPlaylist()
