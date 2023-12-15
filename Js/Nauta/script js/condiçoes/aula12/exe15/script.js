function verificar() {
    /*  window.alert('Parabéns funfou! você está evoluindo. ') */
    // Cria um novo objeto Date com a data e hora atuais.
    var data = new Date()
    /* Estamos obtendo o ano atual usando o método getFullYear() do objeto Date e atribuindo-o à variável ano. Vai pegar a ano atual com  os 4 dígitos.  */
    var ano = data.getFullYear()
    /* Formulário do ano. que vai ser o id do Ano de nascimento  */
    var fano = document.getElementById('txtano')
    /* Estamos obtendo o elemento HTML que tem o seletor CSS "div#res" (a div que exibe a saída) e atribuindo-o à variável res. */
    var res = document.querySelector('div#res')
    /* Gênero inicia vazio */
    var gênero = ''
    /* colocando as imagens */
    var img = document.createElement('img')
    img.setAttribute('id', 'foto')/* Veja no html */
    if (fano.value.length == 0 || Number(fano.value) > ano) {
        window.alert('Erro . Tente novamente. verifique o ano Digitado.')
    }
    else {
        /*   window.alert('tudo ok') */
        var fsex = document.getElementsByName('radsex')
        var idade = ano - Number(fano.value)
        /*         res.innerHTML = `Idade calculada: ${idade} ` */
        if (fsex[0].checked) {
            gênero = 'Homem'
            if (idade >= 0 && idade < 12) {
                // criança
                img.setAttribute('src', 'img/bebemacho.png')

            } else if (idade < 21) {
                //jovem
                img.setAttribute('src', 'img/homemjovem.png')
            } else if (idade < 50) {
                // adulto
                img.setAttribute('src', 'img/homemadulto.png')
            } else {
                // idoso
                img.setAttribute('src', 'img/velho.png')
            }


        } else if (fsex[1].checked) {
            gênero = 'Mulher'
            if (idade >= 0 && idade < 12) {
                // criança
                img.setAttribute('src', 'img/bebefemea.png')

            } else if (idade < 21) {
                //jovem
                img.setAttribute('src', 'img/mulherjovem.png')
            } else if (idade < 50) {
                // adulto
                img.setAttribute('src', 'img/mulheradulta.png')
            } else {
                // idoso
                img.setAttribute('src', 'img/velha.png')
            }

        }
        res.style.textAlign = 'center'
        res.innerHTML = `Dectectamos um : ${gênero} com ${idade} anos. `
        /* Apresentar um conteúdo abaixo */
        res.appendChild(img)
    }
}