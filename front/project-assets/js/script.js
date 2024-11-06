let url = "http://localhost:3000/usuarios"

async function pushUsuarios() {
    const response = await fetch(url)
    console.log(response);
    const dados = await response.json();
    console.log(dados);
    const cardUser = document.getElementById('artistasSeguidos')
    console.log(cardUser);
    cardUser.innerHTML = dados.usuarios.map((user) => {
        return `
        <div id="artistaCard">
        <img src="${user.foto_usuario}" alt="Artista X">
        <h3>${user.username}</h3>    
        <p>Artista</p>
        </div>
        `

    })
}
pushUsuarios()