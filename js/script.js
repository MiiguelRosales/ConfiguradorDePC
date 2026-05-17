const componentes = {
	procesador: ["Intel Core i7-14700KF", "AMD Ryzen 7 7800X3D", "Intel Core i5-14600K"],
	tarjeta: ["NVIDIA RTX 4070 SUPER", "AMD Radeon RX 7800 XT", "NVIDIA RTX 4060 Ti"],
	memoria: ["32GB DDR5 6000MHz", "16GB DDR5 5600MHz", "32GB DDR4 3600MHz"],
	almacenamiento: ["SSD NVMe 1TB Gen4", "SSD NVMe 2TB Gen4", "SSD NVMe 1TB Gen3"],
	fuente: ["750W 80+ Gold", "850W 80+ Gold", "650W 80+ Bronze"]
};

document.addEventListener("DOMContentLoaded", () => {
	const btnComenzar = document.getElementById("btnComenzar");
	const btnGenerar = document.getElementById("btnGenerar");
	const btnReiniciar = document.getElementById("btnReiniciar");

	if (btnComenzar) {
		btnComenzar.addEventListener("click", () => {
			window.location.href = "html/pagina.html";
		});
	}

	if (btnGenerar) {
		btnGenerar.addEventListener("click", generarConfiguracion);
		generarConfiguracion();
	}

	if (btnReiniciar) {
		btnReiniciar.addEventListener("click", () => {
			window.location.href = "../index.html";
		});
	}
});

function generarConfiguracion() {
	asignarValor("cpuValue", elegir(componentes.procesador));
	asignarValor("gpuValue", elegir(componentes.tarjeta));
	asignarValor("ramValue", elegir(componentes.memoria));
	asignarValor("ssdValue", elegir(componentes.almacenamiento));
	asignarValor("psuValue", elegir(componentes.fuente));
}

function elegir(lista) {
	return lista[Math.floor(Math.random() * lista.length)];
}

function asignarValor(id, valor) {
	const elemento = document.getElementById(id);
	if (elemento) {
		elemento.textContent = valor;
	}
}
