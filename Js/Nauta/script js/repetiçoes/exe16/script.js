function contar() {
    let init = window.document.getElementById('init')
    let final = window.document.getElementById('final')
    let pular = window.document.getElementById('pular')
    let msg = window.document.getElementById('msg')
    while (init > final) {
        msg.innerHTML = 'Contanto: '
        msg.innerHTML = ` ${pular}`
        pular++
    }
}