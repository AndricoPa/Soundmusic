import express from 'express';
import knex from 'knex';
import cors from 'cors';
import bcrypt from 'bcrypt';
const app = express()
const port = 3000
app.use(express.json())
app.use(cors());

const database = knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1', // <-- localhost
        port: 3306,
        user: 'aluno',
        password: 'senacrs',
        database: 'soundmusic',
    },
});
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/', async (req, res) => {
    res.send('pagina inicial')
});

app.get('/planos', async (req, res) => {
    const planos = await database('planos').select('*')
    res.json({planos})
})

app.get('/usuarios', async (req, res) => {
    const  usuarios  = await database('usuarios').select('*')
    res.json({usuarios})
})

app.post('/usuarios', async (req, res) => {
    const {id_plano, username, senha, foto_usuario} = req.body
    const senhaCriptografada = await bcrypt.hash(senha, 10)
    const usuarios =  await database('usuarios').insert({id_plano, username, senha : senhaCriptografada, foto_usuario})
    res.json({usuarios})
})

app.get('/usuarios/:id', async (req, res) => {
    const {id} = req.params
    const usuario = await database('usuarios').select('*').where({id})
    res.json({usuario})
})

// app.post('/login', async (req, res) => {
//     const {username , senha} = req.body
//     const usuario = await database('usuarios').select('*').where({username}).first()
//     if(!usuario){
//         res.status(400).json('Usuario nao existe')
//     }
//     const senhaValida = await bcrypt.compare(senha, usuario.senha)
//     if(!senhaValida){
//         res.status(400).json('Usuario nao existe')
//     }
//     res.json("logado com sucesso")
// })
// deu erro o login 

app.get('/generomusical', async (req, res) => {
    const genero = await database('genero_musical').select('*')
    res.json({ genero })
})

app.post('/generomusical', async (req, res) => {
    const { nome_genero } = req.body
    const genero = await database('genero_musical').insert({ nome_genero })
    res.json({ genero })
})

app.get('/generomusical/:id', async (req, res) => {
    const { id } = req.params
    const genero = await database('genero_musical').select('*').where({ id })
    res.json({ genero })
})

app.get('/playlist', async (req, res) => {
    const playlist = await database('album').select('*')
    res.json({playlist})
})

app.post('/playlist', async (req, res) => {
    const {id_usuario, nome_album, foto_album} = req.body
    const playlist = await database('album').insert({id_usuario, nome_album, foto_album})
    res.json({playlist})
})

app.get('/playlist/:id', async (req, res) => {
    const {id} = req.params
    const playlist = await database('album').select('*').where({id})
    res.json({playlist})
})

app.get('/playlist/usuario/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const playlist = await database('album').select('*').where({ id_usuario });
    res.json({ playlist });
});


app.get('/musicas', async (req, res) => {
    const musicas = await database('musica')
    .select('musica.*', 'usuarios.username as usuarios')
    .join('usuarios', 'musica.id_usuario', 'usuarios.id')
    res.json({musicas})
})

app.post('/musicas', async (req, res) => {
    const { id_genero, id_album, id_usuario, nome_musica, link_musica, foto_musica} = req.body
    const musica = await database('musica').insert({ id_genero, id_album, id_usuario, nome_musica, link_musica, foto_musica })
    res.json({musica})
})

app.get('/musicas/:id', async (req, res) => {
    const { id } = req.params
    const musica = await database('musica').select('*').where({ id })
    .select('musica.*   ', 'usuarios.username as usuarios')
    .join('usuarios', 'musica.id_usuario', 'usuarios.id')
    res.json({ musica })
})

app.get('/musicas/playlist/:id_album', async (req, res) => {
    const {id_album} = req.params
    const musicas = await database('musica').select('*').where({id_album})
    res.json({musicas})
})