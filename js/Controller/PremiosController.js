import {
    get,
    post,
    put,
    eliminate,
    getPeliculas
} from "../Service/PremiosService.js";

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector("#table tbody");
    const form = document.getElementById("form");
    const modal = new bootstrap.Modal(document.getElementById("modal"));
    const lbModal = document.getElementById("modalLabel");
    const btnAdd = document.getElementById("btnAdd");
    const select = document.getElementById("selectPelicula");
    const btnCancelar = document.getElementById("cancelar");
    const btnCloseModal = document.getElementById("btnCloseModal");

    init();

    btnAdd.addEventListener("click", () => {
        form.reset();
        form.idPremio.value = "";
        lbModal.textContent = "Agregar";
        modal.show();
    });

    btnCancelar.addEventListener("click", () => {
        modal.hide();
    });

    btnCloseModal.addEventListener("click", () => {
        modal.hide();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = form.idPremio.value;
        const data = {
            nombrePremio: form.Nombre.value.trim(),
            categoria: form.Categoria.value.trim(),
            anoPremio: form.Ano.value,
            resultado: form.Resultado.value.trim(),
            fecha_Registro: form.Fecha.value,
            peliculaId: form.selectPelicula.value
        };

        try {
            if (id) {
                const putResponse = await put(id, data)
            }
            else {
                const postResponse = await post(data);
            }
            modal.hide();
            await load();
        } catch (err) {
            console.log("Error: ", err);
            /*Swal.fire({
                title: "ERROR",
                text: err,
                icon: "error"
            });*/
        }
    });

    async function load() {
        try {
            const premios = await get();
            tableBody.innerHTML = '';
            if (!premios || premios.length == 0) {
                tableBody.innerHTML = '<td colspan="8">Actualmente no hay registros de premios</td>';
                return;
            }

            premios.forEach((premio) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                        <td>${premio.idPremio}</td>
                        <td>${premio.nombrePremio}</td>
                        <td>${premio.categoria}</td>
                        <td>${premio.anoPremio}</td>
                        <td>${premio.resultado}</td>
                        <td>${premio.fecha_Registro}</td>
                        <td>${premio.nombrePelicula}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-secondary edit-btn">
                                Editar
                            </button>
                            <button class="btn btn-sm btn-outline-danger delete-btn">
                                Eliminar
                            </button>
                        </td>
                `;

                tr.querySelector(".edit-btn").addEventListener("click", () => {
                    form.idPremio.value = premio.idPremio;
                    form.Nombre.value = premio.nombrePremio;
                    form.Categoria.value = premio.categoria;
                    form.Ano.value = premio.anoPremio;
                    form.Resultado.value = premio.resultado;
                    form.Fecha.value = premio.fecha_Registro;
                    form.selectPelicula.value = premio.peliculaId;
                    lbModal.textContent = "Editar";
                    modal.show();
                });

                tr.querySelector(".delete-btn").addEventListener("click", () => {
                    if (confirm("Desea eliminar el registro")) {
                        eliminate(premio.idPremio).then(load());
                    }
                });

                tableBody.appendChild(tr);
            });
        }
        catch (err) {
            console.error("Error: ", err);
        }
    }

    async function loadPeliculas() {
        try {
            const peliculas = await getPeliculas();
            select.innerHTML = '';
            if (!peliculas || peliculas.length == 0) {
                select.innerHTML = '<option selected="">No existen peliculas</option>';
                return;
            }

            peliculas.forEach((pelicula) => {
                const option = document.createElement("option");
                option.value = pelicula.id;
                option.innerHTML = pelicula.nombre;

                tableBody.appendChild(option);
            });
        }
        catch (err) {
            console.error("Error: ", err);
        }
    }

    function init() {
        load();
        loadPeliculas();
    }

});