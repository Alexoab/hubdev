/* console.log('teste1'); */
/* console.log(fetchhttps://reqre('s.in/api/users')) */
/* Aqui onde e realizado a requisição  */
fetch('https://reqres.in/api/users/1')

    /*  .then((res) => console.log(res)) */
    /* .then((res) => res.json()) */
    /* .then((data) => console.log(data)) */
    /*  .then((data) => console.log(data.data[0].last_name)) */

    /* Tratando o erro :  */
    .then((res) => {
        console.log(res)
        if (res.ok) {

            console.log('success')
        } else {
            console.log('error')
        }
    })
    .then((data) => console.log(data.data))
    .catch((err) => console.log(err))