function carregar() {
    // Seleciona o elemento HTML com o ID "msg".
    var msg = window.document.getElementById('msg')
    // Seleciona o elemento HTML com o ID "periodo".
    var img = window.document.getElementById('periodo')
    // Cria um novo objeto Date com a data e hora atuais.
    var data = new Date();

    // Obtém a hora atual do objeto Date e armazena em uma variável.
    var hora = data.getHours();
    // Testando as horas 
  /*   var hora = 1 */7

    // Obtém os minutos atuais do objeto Date e armazena em uma variável.
    var minutos = data.getMinutes();

    // Obtém os segundos atuais do objeto Date e armazena em uma variável.
    var segundos = data.getSeconds();
    /*     msg.innerHTML = `Agora são ${hora} : hs : ${minutos}m : ${segundos}s.` */
    // Define um intervalo de 1 segundo para atualizar o horário.
    setInterval(carregar, 1000);
    // Bom dia !
    if (hora >= 0 && hora < 12) {
        // Boa tarde !
        msg.innerHTML = `Bom dia! Agora são ${hora}hs : ${minutos}m : ${segundos}s.`;
        img.src = "img/manha250.png";
        document.body.style.background = '#af9680'

    } else if (hora >= 12 && hora <= 18) {
        // Boa noite !
        msg.innerHTML = `Boa tarde ! Agora são ${hora}hs: ${minutos}m :${segundos}s.`
        img.src = " img/tarde250.png"
        document.body.style.background = '#f6c188'

    }
    else {
        msg.innerHTML = `Boa noite ! Agora são ${hora}hs: ${minutos}m :${segundos}s.`
        img.src = "img/noite250.png"
        document.body.style.background = '#1d4654'
    }
}
