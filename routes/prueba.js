const data = {
    name: 'valeria chinchilla',
    email: 'valeriachmj30@gmail.com',
    password: 'tuContraseñaSegura'
};

fetch('http://localhost:3001/users/createUser', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
