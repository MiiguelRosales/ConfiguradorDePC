const prologPath = "../otros/Recomendaciones.pl";

const typeTitles = {
	cpu: "Procesadores",
	gpu: "Tarjetas Gráficas",
	ram: "Memoria RAM",
	storage: "Almacenamiento",
	power_supply: "Fuentes de Poder",
	cooler: "Disipadores de Calor",
	motherboard: "Tarjetas Madre",
	case: "Gabinetes",
	ups: "UPS / No-Break"
};

const typeTags = {
	cpu: "CPU",
	gpu: "GPU",
	ram: "RAM",
	storage: "Storage",
	power_supply: "PSU",
	cooler: "Cooler",
	motherboard: "Motherboard",
	case: "Case",
	ups: "UPS"
};

const categoryOrder = [
	"cpu",
	"gpu",
	"ram",
	"storage",
	"power_supply",
	"cooler",
	"motherboard",
	"case",
	"ups"
];

let loadedSections = [];
let selectedItems = [];
let activeCategory = categoryOrder[0];
let selectedCardsContainer = null;
let categoryButtonsContainer = null;
let currentCategoryTitle = null;
let currentCardsContainer = null;

async function loadPrologData() {
	const response = await fetch(prologPath);
	if (!response.ok) {
		throw new Error(`No se pudo cargar ${prologPath}: ${response.status}`);
	}
	const text = await response.text();
	return parsePrologFile(text);
}

function parsePrologFile(text) {
	const sections = [];
	const sectionIndex = {};

	const lines = text.split(/\r?\n/);
	for (const rawLine of lines) {
		const line = rawLine.trim();
		if (!line || line.startsWith("%")) continue;

		const match = line.match(/^(\w+)\((.*)\)\.$/);
		if (!match) continue;

		const predicate = match[1];
		const args = splitPrologArgs(match[2]);
		if (!typeTitles[predicate]) continue;

		let section = sectionIndex[predicate];
		if (!section) {
			section = {
				typeKey: predicate,
				title: typeTitles[predicate],
				type: typeTags[predicate] || predicate,
				items: []
			};
			sectionIndex[predicate] = section;
			sections.push(section);
		}

		const item = buildItem(predicate, args);
		if (item) {
			section.items.push(item);
		}
	}

	return sections;
}

function splitPrologArgs(argString) {
	const args = [];
	let current = "";
	let inQuote = false;
	let quoteChar = "";
	for (let i = 0; i < argString.length; i++) {
		const ch = argString[i];
		if (inQuote) {
			current += ch;
			if (ch === quoteChar) {
				inQuote = false;
			}
		} else {
			if (ch === "'" || ch === '"') {
				inQuote = true;
				quoteChar = ch;
				current += ch;
			} else if (ch === ",") {
				args.push(current.trim());
				current = "";
			} else {
				current += ch;
			}
		}
	}
	if (current.trim()) {
		args.push(current.trim());
	}
	return args.map(arg => {
		const trimmed = arg.trim();
		if (/^'.*'$/.test(trimmed) || /^".*"$/.test(trimmed)) {
			return trimmed.slice(1, -1);
		}
		return trimmed;
	});
}

function buildItem(predicate, args) {
	const name = args[2] || "";
	const price = Number(args[3]) || 0;
	const usage = args[4] || "";
	const level = args[5] || "";

	const item = { name, price, usage, level };

	switch (predicate) {
		case "cpu":
			item.socket = args[6] || "";
			break;
		case "gpu":
			item.memory = args[6] || "";
			break;
		case "ram":
			item.type = args[6] || "";
			break;
		case "storage":
			item.type = args[6] || "";
			break;
		case "power_supply":
			item.power = args[6] || "";
			item.detail = args[7] || "";
			break;
		case "cooler":
			item.type = args[6] || "";
			break;
		case "motherboard":
			item.socket = args[6] || "";
			break;
		case "case":
			item.form = args[6] || "";
			break;
		case "ups":
			item.power = args[6] || "";
			break;
	}

	return item;
}
document.addEventListener("DOMContentLoaded", () => {
	const btnComenzar = document.getElementById("btnComenzar");
	const btnGenerar = document.getElementById("btnGenerar");
	const btnReiniciar = document.getElementById("btnReiniciar");
	const recommendationContainer = document.getElementById("recommendationSections");

	if (btnComenzar) {
		btnComenzar.addEventListener("click", () => {
			window.location.href = "html/configuracion.html";
		});
	}

	if (btnGenerar) {
		btnGenerar.addEventListener("click", () => {
			resetSelection();
		});
	}

	if (btnReiniciar) {
		btnReiniciar.addEventListener("click", () => {
			window.location.href = "../index.html";
		});
	}

	if (recommendationContainer) {
		loadPrologData()
			.then(data => {
				loadedSections = data;
				activeCategory = categoryOrder.find(type => data.some(section => section.typeKey === type)) || data[0]?.typeKey;
				initializeSelectionPanel(recommendationContainer);
			})
			.catch(error => {
				console.error(error);
				recommendationContainer.innerHTML = '<p class="error-text">No se pudieron cargar las recomendaciones desde el archivo .pl.</p>';
			});
	}
});

function initializeSelectionPanel(container) {
	container.innerHTML = `
		<div id="selectedCardsContainer" class="selected-cards"></div>
		<div id="categoryButtons" class="category-buttons"></div>
		<div id="currentCategoryTitle" class="current-category-title"></div>
		<div id="currentCardsContainer" class="recommendation-grid"></div>
	`;

	selectedCardsContainer = container.querySelector("#selectedCardsContainer");
	categoryButtonsContainer = container.querySelector("#categoryButtons");
	currentCategoryTitle = container.querySelector("#currentCategoryTitle");
	currentCardsContainer = container.querySelector("#currentCardsContainer");

	renderCategoryButtons();
	renderSelectedCards();
	renderCurrentCategory();
}

function renderCategoryButtons() {
	categoryButtonsContainer.innerHTML = "";
	const availableCategories = categoryOrder.filter(type => loadedSections.some(section => section.typeKey === type));

	availableCategories.forEach(typeKey => {
		const button = document.createElement("button");
		button.type = "button";
		button.className = `category-button ${activeCategory === typeKey ? "active" : ""}`;
		button.textContent = typeTitles[typeKey] || typeKey;
		button.addEventListener("click", () => {
			activeCategory = typeKey;
			renderCategoryButtons();
			renderCurrentCategory();
		});
		categoryButtonsContainer.appendChild(button);
	});
}

function renderSelectedCards() {
	selectedCardsContainer.innerHTML = "";

	const header = document.createElement("div");
	header.innerHTML = `<h2>Componentes seleccionados</h2>`;
	selectedCardsContainer.appendChild(header);

	if (selectedItems.length === 0) {
		const emptyMessage = document.createElement("p");
		emptyMessage.className = "empty-selection";
		emptyMessage.textContent = "Aún no has seleccionado ningún componente.";
		selectedCardsContainer.appendChild(emptyMessage);
		return;
	}

	const grid = document.createElement("div");
	grid.className = "recommendation-grid";
	selectedItems.forEach(item => {
		const card = document.createElement("article");
		card.className = "recommendation-card selected-card";
		card.innerHTML = `
			<h3>${item.name}</h3>
			<p><span class="tag">${item.categoryLabel}</span></p>
			<p><strong>Uso:</strong> ${item.usage}</p>
			<p><strong>Precio:</strong> $${item.price}</p>
		`;
		grid.appendChild(card);
	});
	selectedCardsContainer.appendChild(grid);
}

function renderCurrentCategory() {
	const section = loadedSections.find(section => section.typeKey === activeCategory);
	if (!section) {
		currentCategoryTitle.textContent = "Categoría no disponible";
		currentCardsContainer.innerHTML = "";
		return;
	}

	const selectedItemForCategory = selectedItems.some(item => item.typeKey === activeCategory);
	currentCategoryTitle.innerHTML = `<h2>Elige ${section.title}</h2><p class="selection-note">${selectedItemForCategory ? "Ya seleccionaste un componente para esta categoría." : "Haz clic en una tarjeta para agregarla a tu build."}</p>`;

	currentCardsContainer.innerHTML = "";
	section.items.forEach(item => {
		const card = createItemCard(item, section);
		currentCardsContainer.appendChild(card);
	});
}

function createItemCard(item, section) {
	const isSelected = selectedItems.some(selected => selected.typeKey === section.typeKey && selected.name === item.name);
	const card = document.createElement("article");
	card.className = `recommendation-card ${isSelected ? "selected" : ""}`;
	card.innerHTML = `
		<h3>${item.name}</h3>
		<p><span class="tag">${section.type}</span></p>
		<p><strong>Uso:</strong> ${item.usage}</p>
		<p><strong>Precio:</strong> $${item.price}</p>
		${item.socket ? `<p><strong>Socket:</strong> ${item.socket}</p>` : ""}
		${item.memory ? `<p><strong>Memoria:</strong> ${item.memory}</p>` : ""}
		${item.type ? `<p><strong>Tipo:</strong> ${item.type}</p>` : ""}
		${item.detail ? `<p><strong>Certificación:</strong> ${item.detail}</p>` : ""}
		${item.power ? `<p><strong>Potencia:</strong> ${item.power}</p>` : ""}
		${item.form ? `<p><strong>Formato:</strong> ${item.form}</p>` : ""}
		${item.level ? `<p><strong>Descripción:</strong> ${item.level}</p>` : ""}
	`;

	if (!isSelected) {
		card.addEventListener("click", () => {
			selectItem(section, item);
		});
	}

	return card;
}

function selectItem(section, item) {
	if (selectedItems.some(selected => selected.typeKey === section.typeKey)) {
		return;
	}

	selectedItems.push({
		...item,
		typeKey: section.typeKey,
		categoryLabel: section.type
	});

	renderSelectedCards();
	renderCurrentCategory();
	navigateToNextCategory();
}

function navigateToNextCategory() {
	const remaining = categoryOrder.filter(type => !selectedItems.some(item => item.typeKey === type) && loadedSections.some(section => section.typeKey === type));
	if (remaining.length > 0) {
		activeCategory = remaining[0];
		renderCategoryButtons();
		renderCurrentCategory();
	}
}

function resetSelection() {
	selectedItems = [];
	activeCategory = categoryOrder.find(type => loadedSections.some(section => section.typeKey === type)) || activeCategory;
	renderCategoryButtons();
	renderSelectedCards();
	renderCurrentCategory();
}

