const params = new URLSearchParams(window.location.search);
const idParams = params.get('id');
let urlUser = `http://localhost:3000/usuarios/${idParams}`;

async function pushUser() {
    try {
        const response = await fetch(urlUser);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const dados = await response.json();
        console.log("Dados recebidos da API:", dados);

        const userDados = document.getElementById('userTop');

        // Verificar se 'dados.usuario' existe e é um array com pelo menos um item
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

