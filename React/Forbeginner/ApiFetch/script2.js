fetch('https://reqres.in/api/users/1', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'Alex oliveira ',
    }),
})
    .then((res) => res.json())
    .then((data) => console.log(data))
