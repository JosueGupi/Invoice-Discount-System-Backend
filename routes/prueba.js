const axios = require('axios');

const data = {
    idUser: 123, // Suponiendo que sea un ID de usuario válido
    cord1: 10, // Ejemplo de valores de coordenadas
    cord2: 20,
    cord3: 30,
    cord1Showed: ['A', 1], // Asume que estos valores son correctos
    cord2Showed: ['B', 2],
    cord3Showed: ['C', 3]
};

axios.post('https://localhost:3001/users/evalMatrix', data)
    .then(response => {
        const matrix = result[0].Matrix;

        if (matrix[cord1Showed[0]][cord1Showed[1] - 1] === cord1 && matrix[cord2Showed[0]][cord2Showed[1] - 1] === cord2
            && matrix[cord3Showed[0]][cord3Showed[1] - 1] === cord3) {
            res.json(0)
        }
        else {
            res.json(1)
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
