function home() {
    window.location.href = 'index.html'
}
function biblioteca() {
    window.location.href = 'bibiIndex.html'
}
function playlist() {
    window.location.href = 'playlistIndex.html'
}
function accountConfig() {
    window.location.href  = 'configUserIndex.html'
}
function config() {
    window.location.href = 'configIndex.html'
}
function planos() {
    window.location.href = 'planosIndex.html'
}
function musica() {
    window.location.href = 'postSongIndex.html'
}
function burguer() {
    const burguer = document.getElementById('listaBurguer')
    if(burguer.style.display === 'flex'){
        burguer.style.display = 'none'
    }else{
        burguer.style.display = 'flex'
    }
}