const API_URL_PREMIOS = 'http://localhost:8080/api/premios';

export async function get() {
    const res = await fetch(`${API_URL_PREMIOS}/mostrarPremios`);
    return res.json();
}

export async function post(data){
    await fetch(`${API_URL_PREMIOS}/ingresarPremio`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(data)
    });
}

export async function put(id, data){
    await fetch(`${API_URL_PREMIOS}/actualizarPremio/${id}`, {
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(data)
    });
}

export async function eliminate(id){
    await fetch(`${API_URL_PREMIOS}/eliminarPremio/${id}`, {
        method: "DELETE"
    });
}

const API_URL_PELICULAS = 'http://localhost:8080/api/peliculas';

export async function getPeliculas() {
    const res = await fetch(`${API_URL_PELICULAS}/mostrarPeliculas`);
    return res.json();
}