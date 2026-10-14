// Catálogo de Productos - NovaTech
const catalogo = document.getElementById("catalogo");
const buscador = document.getElementById("buscador");
const selectCategoria = document.getElementById("categoria");
const contadorProductos = document.getElementById("contador-productos");
const contadorAgregados = document.getElementById("contador-agregados");
const estadoVacio = document.getElementById("estado-vacio");

const iconos = {
  1: '<path d="M4 12v-1a8 8 0 0 1 16 0v1"/><path d="M4 12h2a2 2 0 0 1 2 2v4H6a2 2 0 0 1-2-2v-4Zm16 0h-2a2 2 0 0 0-2 2v4h2a2 2 0 0 0 2-2v-4Z"/>',
  2: '<rect x="6" y="3" width="12" height="18" rx="2"/><circle cx="12" cy="14" r="3"/><path d="M10 6h4"/>',
  3: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M15 10h.01M19 10h.01M7 14h.01M11 14h.01M15 14h.01M19 14h.01"/>',
  4: '<path d="M12 3a8 8 0 0 0-8 8v2a8 8 0 0 0 16 0v-2a8 8 0 0 0-8-8Z"/><path d="M12 7v4"/>',
  5: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',
  6: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',
  7: '<circle cx="12" cy="10" r="8"/><circle cx="12" cy="10" r="3"/><path d="M12 18v3m-4 0h8"/>',
  8: '<path d="m7 7 10 10M7 7l-3 1 2-4 1 3Zm10 10 3-1-2 4-1-3ZM5 15l4 4m-7-1 3-3m9-9 4 4m-1-7-3 3"/>',
  9: '<rect x="9" y="3" width="6" height="13" rx="3"/><path d="M5 11v2a7 7 0 0 0 14 0v-2m-7 9v2m-4 0h8"/>',
  10: '<path d="M5 18V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v11M3 20h18l-2-2H5l-2 2Z"/>'
};

let productosAgregados = 0;

function crearTarjeta(producto) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "product-card";

  const visual = document.createElement("div");
  visual.className = "product-visual";
  visual.style.backgroundColor = producto.color;

  const icono = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icono.setAttribute("viewBox", "0 0 24 24");
  icono.setAttribute("fill", "none");
  icono.setAttribute("stroke", "currentColor");
  icono.setAttribute("stroke-width", "1.5");
  icono.setAttribute("stroke-linecap", "round");
  icono.setAttribute("stroke-linejoin", "round");
  icono.setAttribute("aria-hidden", "true");
  icono.innerHTML = iconos[producto.id] || iconos[5];
  visual.append(icono);

  if (producto.destacado) {
    const badge = document.createElement("span");
    badge.className = "featured-badge";
    badge.textContent = "Destacado";
    visual.append(badge);
  }

  const details = document.createElement("div");
  details.className = "product-details";

  const name = document.createElement("h2");
  name.className = "product-name";
  name.textContent = producto.nombre;

  const category = document.createElement("span");
  category.className = "product-category";
  category.textContent = producto.categoria;

  const description = document.createElement("p");
  description.className = "product-description";
  description.textContent = producto.descripcion;

  const footer = document.createElement("div");
  footer.className = "product-footer";

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = `${datos.moneda}${producto.precio.toLocaleString("es-GT")}`;

  const addButton = document.createElement("button");
  addButton.className = "add-button";
  addButton.type = "button";
  addButton.dataset.productId = producto.id;
  addButton.setAttribute("aria-label", `Agregar ${producto.nombre}`);
  addButton.innerHTML = '<span aria-hidden="true">+</span> Agregar';

  footer.append(price, addButton);
  details.append(name, category, description, footer);
  tarjeta.append(visual, details);
  return tarjeta;
}

function mostrarProductos(lista) {
  const tarjetas = document.createDocumentFragment();
  lista.forEach((producto) => tarjetas.append(crearTarjeta(producto)));
  catalogo.replaceChildren(tarjetas);
  contadorProductos.textContent = `${lista.length} ${lista.length === 1 ? "producto" : "productos"}`;
  estadoVacio.hidden = lista.length > 0;
  catalogo.hidden = lista.length === 0;
}

function cargarCategorias() {
  datos.categorias.forEach((categoria) => {
    const opcion = document.createElement("option");
    opcion.value = categoria;
    opcion.textContent = categoria;
    selectCategoria.append(opcion);
  });
}

function filtrar() {
  const consulta = buscador.value.trim().toLocaleLowerCase("es");
  const categoriaSeleccionada = selectCategoria.value;
  const resultado = datos.productos.filter((producto) => {
    const coincideNombre = producto.nombre.toLocaleLowerCase("es").includes(consulta);
    const coincideCategoria = categoriaSeleccionada === "todas" || producto.categoria === categoriaSeleccionada;
    return coincideNombre && coincideCategoria;
  });

  mostrarProductos(resultado);
}

buscador.addEventListener("input", filtrar);
selectCategoria.addEventListener("change", filtrar);

catalogo.addEventListener("click", (evento) => {
  const boton = evento.target.closest(".add-button");
  if (!boton) return;

  productosAgregados += 1;
  contadorAgregados.textContent = `Agregados: ${productosAgregados}`;
});

cargarCategorias();
mostrarProductos(datos.productos);
