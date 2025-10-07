const API_URL_PREMIOS = 'localhost:8080/api/premios';

export async function get() {
    const res = await fetch(`${API_URL_PREMIOS}/mostrarPremios`);
    return res.json();
}

export async function post(data){
    await fetch(`${API_URL_PREMIOS}/`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(data)
    });
}

export async function put(id, data){
    await fetch(`${API_URL_PREMIOS}//${id}`, {
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(data)
    });
}

export async function eliminate(id){
    await fetch(`${API_URL_PREMIOS}//${id}`, {
        method: "DELETE"
    });
}

const API_URL_PELICULAS = '';

export async function getPeliculas() {
    const res = await fetch(`${API_URL_PELICULAS}/`);
    return res.json();
}