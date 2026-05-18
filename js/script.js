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
		if (rawLine !== rawLine.trimStart()) continue;

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
	const price = Number(args[3]);
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

function isValidProductRecord({ id, brand, name, price, usage }) {
	if (!id || !brand || !name || !usage) return false;
	if (!Number.isFinite(price) || price < 0) return false;
	if (brand === "_" || isPrologVariableToken(brand)) return false;
	if (isPlaceholderProductName(name)) return false;
	return true;
}

function isPrologVariableToken(value) {
	return /^[A-Z_][A-Za-z0-9_]*$/.test(value);
}

function isPlaceholderProductName(name) {
	const placeholders = new Set([
		"CPU",
		"GPU",
		"RAM",
		"Storage",
		"Cooler",
		"MB",
		"Case",
		"PSU",
		"UPS",
		"Nombre"
	]);
	return placeholders.has(name);
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
		<div id="buildSummaryContainer" class="build-summary" hidden></div>
	`;

	selectedCardsContainer = container.querySelector("#selectedCardsContainer");
	categoryButtonsContainer = container.querySelector("#categoryButtons");
	currentCategoryTitle = container.querySelector("#currentCategoryTitle");
	currentCardsContainer = container.querySelector("#currentCardsContainer");
	buildSummaryContainer = container.querySelector("#buildSummaryContainer");

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
	renderBuildSummary();
	navigateToNextCategory();
}

function navigateToNextCategory() {
	const remaining = categoryOrder.filter(type => !selectedItems.some(item => item.typeKey === type) && loadedSections.some(section => section.typeKey === type));
	if (remaining.length > 0) {
		activeCategory = remaining[0];
		renderCategoryButtons();
		renderCurrentCategory();
		return;
	}

	renderCategoryButtons();
	renderCompletionView();
}

function resetSelection() {
	selectedItems = [];
	activeCategory = categoryOrder.find(type => loadedSections.some(section => section.typeKey === type)) || activeCategory;
	renderCategoryButtons();
	renderSelectedCards();
	renderCurrentCategory();
	renderBuildSummary();
}

function renderCompletionView() {
	currentCategoryTitle.innerHTML = `<h2>Build completa</h2><p class="selection-note">Este es el resumen final de tu configuracion.</p>`;
	clearContainer(categoryModelContainer);
	clearContainer(currentCardsContainer);
	renderBuildSummary();
	buildSummaryContainer?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderBuildSummary() {
	if (!buildSummaryContainer) return;

	if (!isBuildComplete()) {
		buildSummaryContainer.hidden = true;
		buildSummaryContainer.innerHTML = "";
		return;
	}

	const orderedItems = getAvailableCategoryKeys()
		.map(typeKey => selectedItems.find(item => item.typeKey === typeKey))
		.filter(Boolean);
	const total = orderedItems.reduce((sum, item) => sum + item.price, 0);
	const focus = getBuildFocus(orderedItems);

	buildSummaryContainer.hidden = false;
	buildSummaryContainer.innerHTML = `
		<div class="summary-header">
			<div>
				<p class="summary-kicker">Resumen final</p>
				<h2>Tu PC completa</h2>
			</div>
			<div class="summary-total">
				<span>Total estimado</span>
				<strong>${formatPrice(total)}</strong>
			</div>
		</div>
		<div class="summary-focus">
			<span class="tag">Enfoque</span>
			<h3>${focus.title}</h3>
			<p>${focus.description}</p>
		</div>
		<div class="summary-list">
			${orderedItems.map(item => `
				<div class="summary-row">
					<span>${escapeHtml(typeTitles[item.typeKey] || item.categoryLabel)}</span>
					<strong>${escapeHtml(item.name)}</strong>
					<em>${formatPrice(item.price)}</em>
				</div>
			`).join("")}
		</div>
	`;
}

function isBuildComplete() {
	const availableCategories = getAvailableCategoryKeys();
	return availableCategories.length > 0 && availableCategories.every(typeKey => selectedItems.some(item => item.typeKey === typeKey));
}

function getAvailableCategoryKeys() {
	return categoryOrder.filter(type => loadedSections.some(section => section.typeKey === type));
}

function getBuildFocus(items) {
	const text = items.map(item => `${item.name} ${item.usage} ${item.level} ${item.memory || ""} ${item.type || ""}`).join(" ").toLowerCase();
	const gpu = items.find(item => item.typeKey === "gpu");
	const cpu = items.find(item => item.typeKey === "cpu");
	const ram = items.find(item => item.typeKey === "ram");
	const storage = items.find(item => item.typeKey === "storage");
	const scores = {
		gaming: countMatches(text, ["gaming", "jugar", "1080p", "1440p", "2k", "4k"]),
		streaming: countMatches(text, ["streaming", "stream"]),
		productivity: countMatches(text, ["productividad", "profesional", "trabajo", "workstation", "servidor", "nas"]),
		general: countMatches(text, ["oficina", "general", "basico", "básico"])
	};

	if (scores.gaming >= scores.productivity && scores.gaming > 0) {
		const resolution = getGamingResolution(gpu);
		const streaming = scores.streaming > 0 ? " Tambien tiene buen perfil para streaming." : "";
		return {
			title: `Gaming ${resolution}`,
			description: `Buena para jugar en ${resolution}, con ${gpu?.name || "la tarjeta grafica elegida"} y ${cpu?.name || "el procesador elegido"}.${streaming}`
		};
	}

	if (scores.productivity > scores.gaming) {
		return {
			title: "Productividad y trabajo",
			description: `Buena para tareas de trabajo, multitarea y cargas profesionales, apoyada por ${cpu?.name || "el procesador elegido"} y ${ram?.name || "la memoria elegida"}.`
		};
	}

	return {
		title: "Uso general equilibrado",
		description: `Buena para uso diario, almacenamiento y tareas generales. ${storage ? `El almacenamiento elegido es ${storage.name}.` : ""}`
	};
}

function countMatches(text, terms) {
	return terms.reduce((count, term) => count + (text.includes(term) ? 1 : 0), 0);
}

function getGamingResolution(gpu) {
	const text = `${gpu?.usage || ""} ${gpu?.level || ""}`.toLowerCase();
	if (text.includes("4k")) return "4K";
	if (text.includes("1440p") || text.includes("2k")) return "1440p / 2K";
	if (text.includes("1080p")) return "1080p";
	return "equilibrado";
}

function formatPrice(value) {
	return `$${new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(value)}`;
}

