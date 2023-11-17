const data = {
    idUser: 28, // Suponiendo que sea un ID de usuario válido
    cord1: 85, // Ejemplo de valores de coordenadas
    cord2: 18,
    cord3: 4,
    cord1Showed: 'C3', // Asume que estos valores son correctos
    cord2Showed: 'A3',
    cord3Showed: 'D3'
};

fetch('http://localhost:3001/users/evalMatrix', {
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