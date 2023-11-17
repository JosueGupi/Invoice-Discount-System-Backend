const data = {
    password: 1234,
    email: 'vchinchilla02@hotmail.com'
};

fetch('http://localhost:3001/users/login', {
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
        console.log("NOOOOOOOOOOOOOOOOOOO");
        console.error('Error:', error);
    });