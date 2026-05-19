const prologPath = "../otros/Recomendaciones.pl";

const typeTitles = {
	cpu: "Procesadores",
	gpu: "Tarjetas Graficas",
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

const brandColors = {
	amd: 0xed1c24,
	apc: 0x3ec16f,
	arctic: 0x54b6ff,
	asus: 0xff3158,
	be_quiet: 0x9aa4b2,
	corsair: 0xffd24d,
	cougar: 0xf5a623,
	crucial: 0x3cb4ff,
	cyberpower: 0xe23b3b,
	deepcool: 0x13d6a4,
	eaton: 0x3f75ff,
	ek: 0xd9e6f2,
	evga: 0xb9c1cf,
	fractal: 0x79d7ff,
	g_skill: 0xff4fd8,
	gigabyte: 0xff8f1f,
	intel: 0x1cf0ff,
	kingston: 0xff3158,
	lian_li: 0xdfe8ff,
	msi: 0xff3158,
	noctua: 0xc18a5b,
	none: 0x8b95aa,
	nvidia: 0x8bff3d,
	nzxt: 0xb079ff,
	phanteks: 0x6fe6ff,
	samsung: 0x4e8dff,
	seagate: 0x7ddc63,
	seasonic: 0x74d8ff,
	thermaltake: 0xff4f6d,
	wd: 0x2c83ff
};

const brandPhotoDomains = {
	amd: "amd.com",
	apc: "apc.com",
	arctic: "arctic.de",
	asus: "asus.com",
	be_quiet: "bequiet.com",
	corsair: "corsair.com",
	cougar: "cougargaming.com",
	crucial: "crucial.com",
	cyberpower: "cyberpowersystems.com",
	deepcool: "deepcool.com",
	eaton: "eaton.com",
	ek: "ekwb.com",
	evga: "evga.com",
	fractal: "fractal-design.com",
	g_skill: "gskill.com",
	gigabyte: "gigabyte.com",
	intel: "intel.com",
	kingston: "kingston.com",
	lian_li: "lian-li.com",
	msi: "msi.com",
	noctua: "noctua.at",
	nvidia: "nvidia.com",
	nzxt: "nzxt.com",
	phanteks: "phanteks.com",
	samsung: "samsung.com",
	seagate: "seagate.com",
	seasonic: "seasonic.com",
	thermaltake: "thermaltake.com",
	wd: "westerndigital.com"
};

const productPhotoTerms = {
	cpu: "desktop processor",
	gpu: "graphics card",
	ram: "memory kit",
	storage: "ssd hdd drive",
	power_supply: "power supply",
	cooler: "cpu cooler",
	motherboard: "motherboard",
	case: "pc case chassis",
	ups: "ups battery backup"
};

let loadedSections = [];
let selectedItems = [];
let activeCategory = categoryOrder[0];
let selectedCardsContainer = null;
let categoryButtonsContainer = null;
let currentCategoryTitle = null;
let categoryModelContainer = null;
let currentCardsContainer = null;
let buildSummaryContainer = null;
let threeModulePromise = null;
let active3DPreviews = [];

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
		if (item) section.items.push(item);
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
			if (ch === quoteChar) inQuote = false;
		} else if (ch === "'" || ch === '"') {
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

	if (current.trim()) args.push(current.trim());

	return args.map(arg => {
		const trimmed = arg.trim();
		if (/^'.*'$/.test(trimmed) || /^".*"$/.test(trimmed)) {
			return trimmed.slice(1, -1);
		}
		return trimmed;
	});
}

function buildItem(predicate, args) {
	const id = args[0] || "";
	const brand = args[1] || "";
	const name = args[2] || "";
	const price = Number(args[3]);
	const usage = args[4] || "";
	const level = args[5] || "";

	if (!isValidProductRecord({ id, brand, name, price, usage })) {
		return null;
	}

	const item = { id, brand, name, price, usage, level };

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
		<div id="categoryModelContainer" class="category-model-panel"></div>
		<div id="currentCardsContainer" class="recommendation-grid"></div>
		<div id="buildSummaryContainer" class="build-summary" hidden></div>
	`;

	selectedCardsContainer = container.querySelector("#selectedCardsContainer");
	categoryButtonsContainer = container.querySelector("#categoryButtons");
	currentCategoryTitle = container.querySelector("#currentCategoryTitle");
	categoryModelContainer = container.querySelector("#categoryModelContainer");
	currentCardsContainer = container.querySelector("#currentCardsContainer");
	buildSummaryContainer = container.querySelector("#buildSummaryContainer");

	renderCategoryButtons();
	renderSelectedCards();
	renderCurrentCategory();
	renderBuildSummary();
}

function renderCategoryButtons() {
	categoryButtonsContainer.innerHTML = "";
	const availableCategories = getAvailableCategoryKeys();

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
	clearContainer(selectedCardsContainer);

	const header = document.createElement("div");
	header.innerHTML = "<h2>Componentes seleccionados</h2>";
	selectedCardsContainer.appendChild(header);

	if (selectedItems.length === 0) {
		const emptyMessage = document.createElement("p");
		emptyMessage.className = "empty-selection";
		emptyMessage.textContent = "Aun no has seleccionado ningun componente.";
		selectedCardsContainer.appendChild(emptyMessage);
		return;
	}

	const grid = document.createElement("div");
	grid.className = "recommendation-grid";
	selectedItems.forEach(item => {
		const card = document.createElement("article");
		card.className = "recommendation-card selected-card";
		card.innerHTML = `
			${createProductPhotoMarkup(item, { typeKey: item.typeKey, title: item.categoryLabel })}
			<h3>${escapeHtml(item.name)}</h3>
			<p><span class="tag">${escapeHtml(item.categoryLabel)}</span></p>
			<p><strong>Uso:</strong> ${escapeHtml(item.usage)}</p>
			<p><strong>Precio:</strong> ${formatPrice(item.price)}</p>
		`;
		wireProductImageFallback(card, item, item.typeKey);
		grid.appendChild(card);
	});
	selectedCardsContainer.appendChild(grid);
}

function renderCurrentCategory() {
	const section = loadedSections.find(section => section.typeKey === activeCategory);
	if (!section) {
		currentCategoryTitle.textContent = "Categoria no disponible";
		clearContainer(categoryModelContainer);
		clearContainer(currentCardsContainer);
		return;
	}

	const selectedItemForCategory = selectedItems.some(item => item.typeKey === activeCategory);
	currentCategoryTitle.innerHTML = `<h2>Elige ${section.title}</h2><p class="selection-note">${selectedItemForCategory ? "Ya seleccionaste un componente para esta categoria." : "Haz clic en una tarjeta para agregarla a tu build."}</p>`;

	renderCategoryModel(section);
	clearContainer(currentCardsContainer);
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
		${createProductPhotoMarkup(item, section)}
		<h3>${escapeHtml(item.name)}</h3>
		<p><span class="tag">${section.type}</span></p>
		<p><strong>Uso:</strong> ${escapeHtml(item.usage)}</p>
		<p><strong>Precio:</strong> ${formatPrice(item.price)}</p>
		${item.socket ? `<p><strong>Socket:</strong> ${escapeHtml(item.socket)}</p>` : ""}
		${item.memory ? `<p><strong>Memoria:</strong> ${escapeHtml(item.memory)}</p>` : ""}
		${item.type ? `<p><strong>Tipo:</strong> ${escapeHtml(item.type)}</p>` : ""}
		${item.detail ? `<p><strong>Certificacion:</strong> ${escapeHtml(item.detail)}</p>` : ""}
		${item.power ? `<p><strong>Potencia:</strong> ${escapeHtml(item.power)}</p>` : ""}
		${item.form ? `<p><strong>Formato:</strong> ${escapeHtml(item.form)}</p>` : ""}
		${item.level ? `<p><strong>Descripcion:</strong> ${escapeHtml(item.level)}</p>` : ""}
	`;
	wireProductImageFallback(card, item, section.typeKey);

	if (!isSelected) {
		card.addEventListener("click", () => {
			selectItem(section, item);
		});
	}

	return card;
}

function selectItem(section, item) {
	if (selectedItems.some(selected => selected.typeKey === section.typeKey)) return;

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
	const remaining = getAvailableCategoryKeys().filter(type => !selectedItems.some(item => item.typeKey === type));
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
	activeCategory = getAvailableCategoryKeys()[0] || activeCategory;
	renderCategoryButtons();
	renderSelectedCards();
	renderCurrentCategory();
	renderBuildSummary();
}

function renderCompletionView() {
	currentCategoryTitle.innerHTML = '<h2>Build completa</h2><p class="selection-note">Este es el resumen final de tu configuracion.</p>';
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
		general: countMatches(text, ["oficina", "general", "basico", "economico"])
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

function renderCategoryModel(section) {
	clearContainer(categoryModelContainer);
	categoryModelContainer.innerHTML = `
		<div class="category-model-info">
			<span class="tag">${section.type}</span>
			<h3>${section.title}</h3>
		</div>
		<div class="model-stage section-model-stage" aria-label="Modelo 3D de ${escapeHtml(section.title)}">
			<div class="model-loader">Generando 3D</div>
		</div>
	`;
	mount3DPreview(categoryModelContainer.querySelector(".model-stage"), section.typeKey, createSectionModelItem(section));
}

function createSectionModelItem(section) {
	const selected = selectedItems.find(item => item.typeKey === section.typeKey);
	const base = selected || section.items[0] || {};
	return {
		...base,
		name: section.title,
		typeKey: section.typeKey
	};
}

function createProductPhotoMarkup(item, section) {
	return `
		<div class="product-photo" aria-label="Foto de ${escapeHtml(item.name)}">
			<img
				src="${getProductPhotoUrl(item, section.typeKey)}"
				alt="Foto de ${escapeHtml(item.name)}"
				loading="lazy"
				referrerpolicy="no-referrer"
			>
			<div class="product-photo-fallback">${escapeHtml(typeTags[section.typeKey] || "Hardware")}</div>
		</div>
	`;
}

function getProductPhotoUrl(item, typeKey) {
	const query = buildProductPhotoQuery(item, typeKey);
	return `https://tse.mm.bing.net/th?q=${encodeURIComponent(query)}&w=640&h=420&c=7&rs=1&p=0&o=5&pid=1.7`;
}

function buildProductPhotoQuery(item, typeKey) {
	if (typeKey === "cpu") {
		return `${item.name} processor box product photo`;
	}

	const category = productPhotoTerms[typeKey] || "computer hardware";
	const domain = brandPhotoDomains[item.brand] || "";
	return `${item.name} ${category} official product image ${domain ? `site:${domain}` : ""}`.trim();
}

function wireProductImageFallback(card, item, typeKey) {
	const image = card.querySelector(".product-photo img");
	const photo = card.querySelector(".product-photo");
	if (!image || !photo) return;

	image.addEventListener("load", () => {
		photo.classList.add("image-loaded");
	});

	image.addEventListener("error", () => {
		photo.classList.add("image-error");
		image.remove();
	});

	if (image.complete && image.naturalWidth > 0) {
		photo.classList.add("image-loaded");
	} else if (image.complete && image.naturalWidth === 0) {
		photo.classList.add("image-error");
		image.remove();
	}

	photo.style.setProperty("--brand-color", `#${(brandColors[item.brand] || brandColors[item.id?.split("_")[0]] || 0x1cf0ff).toString(16).padStart(6, "0")}`);
	photo.dataset.tag = typeTags[typeKey] || "HW";
}

function clearContainer(container) {
	if (!container) return;
	disposePreviewsInside(container);
	container.innerHTML = "";
}

function disposePreviewsInside(root) {
	active3DPreviews = active3DPreviews.filter(preview => {
		if (root.contains(preview.mount)) {
			preview.dispose();
			return false;
		}
		return true;
	});
}

function loadThree() {
	if (!threeModulePromise) {
		threeModulePromise = import("https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js");
	}
	return threeModulePromise;
}

async function mount3DPreview(mount, typeKey, item) {
	if (!mount) return;

	try {
		const THREE = await loadThree();
		if (!mount.isConnected) return;

		mount.innerHTML = "";
		const preview = create3DPreview(THREE, mount, typeKey, item);
		active3DPreviews.push(preview);
	} catch (error) {
		console.error("No se pudo cargar Three.js", error);
		mount.classList.add("model-stage-fallback");
		mount.innerHTML = `<div class="model-fallback">${typeTags[typeKey] || "3D"}</div>`;
	}
}

function create3DPreview(THREE, mount, typeKey, item) {
	const scene = new THREE.Scene();
	const width = Math.max(mount.clientWidth, 220);
	const height = Math.max(mount.clientHeight, 150);
	const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	const clock = new THREE.Clock();
	const interaction = {
		active: false,
		lastX: 0,
		lastY: 0,
		rotationX: 0,
		rotationY: 0,
		zoom: 1
	};
	let disposed = false;
	let frameId = 0;

	renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
	renderer.setSize(width, height, false);
	mount.appendChild(renderer.domElement);

	camera.position.set(3.8, 2.4, 5.5);
	camera.lookAt(0, 0, 0);

	const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
	keyLight.position.set(3, 5, 6);
	scene.add(keyLight);
	scene.add(new THREE.AmbientLight(0x9fb7ff, 1.6));

	const rimLight = new THREE.PointLight(0x1cf0ff, 1.6, 10);
	rimLight.position.set(-3, 1.8, 2);
	scene.add(rimLight);

	const group = new THREE.Group();
	const accent = brandColors[item.brand] || brandColors[item.id?.split("_")[0]] || 0x1cf0ff;
	buildComponentModel(THREE, group, typeKey, item, accent);
	scene.add(group);

	const base = new THREE.Mesh(
		new THREE.CylinderGeometry(1.95, 2.2, 0.06, 72),
		new THREE.MeshStandardMaterial({
			color: 0x0b152b,
			metalness: 0.25,
			roughness: 0.45,
			emissive: 0x0b3d52,
			emissiveIntensity: 0.35
		})
	);
	base.position.y = -1.25;
	scene.add(base);

	const resizeObserver = new ResizeObserver(() => {
		if (disposed) return;
		const nextWidth = Math.max(mount.clientWidth, 220);
		const nextHeight = Math.max(mount.clientHeight, 150);
		camera.aspect = nextWidth / nextHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(nextWidth, nextHeight, false);
	});
	resizeObserver.observe(mount);

	const handlePointerDown = event => {
		interaction.active = true;
		interaction.lastX = event.clientX;
		interaction.lastY = event.clientY;
		mount.setPointerCapture?.(event.pointerId);
	};

	const handlePointerMove = event => {
		if (!interaction.active) return;
		const deltaX = event.clientX - interaction.lastX;
		const deltaY = event.clientY - interaction.lastY;
		interaction.rotationY += deltaX * 0.012;
		interaction.rotationX += deltaY * 0.01;
		interaction.rotationX = Math.max(-0.85, Math.min(0.85, interaction.rotationX));
		interaction.lastX = event.clientX;
		interaction.lastY = event.clientY;
	};

	const handlePointerUp = event => {
		interaction.active = false;
		mount.releasePointerCapture?.(event.pointerId);
	};

	const handleWheel = event => {
		event.preventDefault();
		interaction.zoom = Math.max(0.78, Math.min(1.25, interaction.zoom + Math.sign(event.deltaY) * 0.05));
	};

	mount.addEventListener("pointerdown", handlePointerDown);
	mount.addEventListener("pointermove", handlePointerMove);
	mount.addEventListener("pointerup", handlePointerUp);
	mount.addEventListener("pointercancel", handlePointerUp);
	mount.addEventListener("wheel", handleWheel, { passive: false });

	const animate = () => {
		if (disposed || !mount.isConnected) {
			dispose();
			return;
		}
		const elapsed = clock.getElapsedTime();
		group.rotation.y = elapsed * 0.48 + interaction.rotationY;
		group.rotation.x = Math.sin(elapsed * 0.9) * 0.1 + interaction.rotationX;
		group.position.y = Math.sin(elapsed * 1.4) * 0.08;
		camera.position.set(3.8 * interaction.zoom, 2.4 * interaction.zoom, 5.5 * interaction.zoom);
		camera.lookAt(0, 0, 0);
		base.rotation.y = -elapsed * 0.28;
		animateModelParts(group, elapsed);
		renderer.render(scene, camera);
		frameId = requestAnimationFrame(animate);
	};
	animate();

	function dispose() {
		if (disposed) return;
		disposed = true;
		cancelAnimationFrame(frameId);
		resizeObserver.disconnect();
		mount.removeEventListener("pointerdown", handlePointerDown);
		mount.removeEventListener("pointermove", handlePointerMove);
		mount.removeEventListener("pointerup", handlePointerUp);
		mount.removeEventListener("pointercancel", handlePointerUp);
		mount.removeEventListener("wheel", handleWheel);
		scene.traverse(object => {
			if (object.geometry) object.geometry.dispose();
			if (object.material) {
				if (Array.isArray(object.material)) {
					object.material.forEach(material => material.dispose());
				} else {
					object.material.dispose();
				}
			}
		});
		renderer.dispose();
		if (renderer.domElement.parentNode) {
			renderer.domElement.parentNode.removeChild(renderer.domElement);
		}
	}

	return { mount, dispose };
}

function buildComponentModel(THREE, group, typeKey, item, accent) {
	const materials = createMaterials(THREE, accent);
	switch (typeKey) {
		case "cpu":
			buildCpuModel(THREE, group, materials);
			break;
		case "gpu":
			buildGpuModel(THREE, group, materials);
			break;
		case "ram":
			buildRamModel(THREE, group, materials);
			break;
		case "storage":
			buildStorageModel(THREE, group, materials, item);
			break;
		case "power_supply":
			buildPowerSupplyModel(THREE, group, materials);
			break;
		case "cooler":
			buildCoolerModel(THREE, group, materials, item);
			break;
		case "motherboard":
			buildMotherboardModel(THREE, group, materials);
			break;
		case "case":
			buildCaseModel(THREE, group, materials);
			break;
		case "ups":
			buildUpsModel(THREE, group, materials);
			break;
		default:
			buildGenericModel(THREE, group, materials);
	}
}

function createMaterials(THREE, accent) {
	return {
		accent: new THREE.MeshStandardMaterial({ color: accent, metalness: 0.45, roughness: 0.28, emissive: accent, emissiveIntensity: 0.12 }),
		board: new THREE.MeshStandardMaterial({ color: 0x153c36, metalness: 0.22, roughness: 0.46 }),
		darkBoard: new THREE.MeshStandardMaterial({ color: 0x101827, metalness: 0.26, roughness: 0.45 }),
		glass: new THREE.MeshStandardMaterial({ color: 0x75e6ff, metalness: 0.05, roughness: 0.05, transparent: true, opacity: 0.22 }),
		gold: new THREE.MeshStandardMaterial({ color: 0xf5c84b, metalness: 0.75, roughness: 0.24 }),
		metal: new THREE.MeshStandardMaterial({ color: 0xc3ccd8, metalness: 0.72, roughness: 0.25 }),
		rubber: new THREE.MeshStandardMaterial({ color: 0x060a12, metalness: 0.2, roughness: 0.58 })
	};
}

function addBox(THREE, group, size, position, material) {
	const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), material);
	mesh.position.set(position[0], position[1], position[2]);
	group.add(mesh);
	return mesh;
}

function buildCpuModel(THREE, group, materials) {
	addBox(THREE, group, [2.1, 0.18, 2.1], [0, 0, 0], materials.gold);
	addBox(THREE, group, [1.65, 0.22, 1.65], [0, 0.2, 0], materials.metal);
	addBox(THREE, group, [1.1, 0.05, 1.1], [0, 0.34, 0], materials.accent);
	for (let i = -6; i <= 6; i++) {
		addBox(THREE, group, [0.04, 0.08, 0.18], [i * 0.15, -0.08, -1.12], materials.gold);
		addBox(THREE, group, [0.04, 0.08, 0.18], [i * 0.15, -0.08, 1.12], materials.gold);
		addBox(THREE, group, [0.18, 0.08, 0.04], [-1.12, -0.08, i * 0.15], materials.gold);
		addBox(THREE, group, [0.18, 0.08, 0.04], [1.12, -0.08, i * 0.15], materials.gold);
	}
}

function buildGpuModel(THREE, group, materials) {
	addBox(THREE, group, [3.1, 1.15, 0.24], [0, 0, 0], materials.darkBoard);
	addBox(THREE, group, [3.25, 0.18, 0.38], [0, -0.75, 0.02], materials.gold);
	addBox(THREE, group, [0.15, 1.45, 0.48], [-1.7, 0, 0.04], materials.metal);
	for (const x of [-0.8, 0.65]) {
		const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.11, 48), materials.rubber);
		fan.position.set(x, 0.02, 0.2);
		fan.rotation.x = Math.PI / 2;
		fan.userData.spin = true;
		group.add(fan);
		for (let i = 0; i < 6; i++) {
			const blade = addBox(THREE, fan, [0.08, 0.32, 0.02], [0, 0.18, 0], materials.metal);
			blade.rotation.z = i * Math.PI / 3;
		}
	}
	addBox(THREE, group, [2.65, 0.13, 0.16], [0.1, 0.66, 0.18], materials.accent);
}

function buildRamModel(THREE, group, materials) {
	for (const z of [-0.18, 0.18]) {
		const stick = new THREE.Group();
		addBox(THREE, stick, [2.8, 0.55, 0.08], [0, 0, z], materials.board);
		addBox(THREE, stick, [2.55, 0.12, 0.1], [0, 0.34, z], materials.accent);
		for (let i = -4; i <= 4; i += 2) {
			addBox(THREE, stick, [0.36, 0.28, 0.1], [i * 0.26, -0.02, z + 0.02], materials.rubber);
		}
		for (let i = -8; i <= 8; i++) {
			addBox(THREE, stick, [0.06, 0.08, 0.05], [i * 0.14, -0.34, z], materials.gold);
		}
		stick.rotation.x = -0.12;
		group.add(stick);
	}
}

function buildStorageModel(THREE, group, materials, item) {
	const name = item.name.toLowerCase();
	if (name.includes("hdd") || name.includes("barracuda") || name.includes("ironwolf") || name.includes("purple")) {
		addBox(THREE, group, [2.25, 0.36, 1.55], [0, 0, 0], materials.rubber);
		const disk = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.08, 64), materials.metal);
		disk.position.set(-0.28, 0.24, 0);
		disk.rotation.x = Math.PI / 2;
		disk.userData.spin = true;
		group.add(disk);
		addBox(THREE, group, [0.75, 0.1, 0.28], [0.55, 0.28, -0.2], materials.accent);
		return;
	}
	if (item.type?.includes("2.5") || name.includes("sata")) {
		addBox(THREE, group, [2.4, 0.25, 1.45], [0, 0, 0], materials.metal);
		addBox(THREE, group, [1.8, 0.05, 0.88], [0, 0.16, 0], materials.accent);
		addBox(THREE, group, [0.58, 0.1, 0.2], [0.95, -0.03, -0.62], materials.gold);
		return;
	}
	addBox(THREE, group, [2.7, 0.12, 0.52], [0, 0, 0], materials.board);
	addBox(THREE, group, [0.7, 0.18, 0.44], [-0.55, 0.12, 0], materials.rubber);
	addBox(THREE, group, [0.7, 0.18, 0.44], [0.35, 0.12, 0], materials.rubber);
	addBox(THREE, group, [0.38, 0.05, 0.5], [1.35, -0.05, 0], materials.gold);
	addBox(THREE, group, [1.4, 0.07, 0.08], [-0.18, 0.24, 0], materials.accent);
}

function buildPowerSupplyModel(THREE, group, materials) {
	addBox(THREE, group, [1.9, 1.25, 1.7], [0, 0, 0], materials.rubber);
	addBox(THREE, group, [1.6, 0.08, 1.35], [0, 0.66, 0], materials.metal);
	const fan = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.045, 12, 56), materials.accent);
	fan.position.set(0, 0.72, 0);
	fan.rotation.x = Math.PI / 2;
	fan.userData.spin = true;
	group.add(fan);
	for (let i = 0; i < 8; i++) {
		const grill = addBox(THREE, group, [0.9, 0.03, 0.025], [0, 0.75, 0], materials.rubber);
		grill.rotation.y = i * Math.PI / 8;
	}
	addBox(THREE, group, [1.35, 0.16, 0.3], [0, -0.1, 0.88], materials.accent);
}

function buildCoolerModel(THREE, group, materials, item) {
	const liquid = item.type?.toLowerCase().includes("liquid") || item.name.toLowerCase().includes("kraken") || item.name.toLowerCase().includes("h150");
	if (liquid) {
		addBox(THREE, group, [2.35, 0.22, 0.82], [0, 0.45, -0.55], materials.metal);
		for (const x of [-0.65, 0.65]) {
			const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.08, 40), materials.rubber);
			fan.position.set(x, 0.6, -0.55);
			fan.rotation.x = Math.PI / 2;
			fan.userData.spin = true;
			group.add(fan);
		}
		const pump = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.22, 48), materials.accent);
		pump.position.set(0, -0.55, 0.55);
		group.add(pump);
		addBox(THREE, group, [1.6, 0.08, 0.08], [-0.35, -0.02, 0.0], materials.rubber).rotation.z = -0.45;
		addBox(THREE, group, [1.6, 0.08, 0.08], [0.35, -0.02, 0.0], materials.rubber).rotation.z = 0.45;
		return;
	}
	for (let i = -5; i <= 5; i++) {
		addBox(THREE, group, [1.25, 0.04, 1.0], [0, i * 0.1, 0], materials.metal);
	}
	const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.54, 0.54, 0.11, 48), materials.rubber);
	fan.position.set(0, 0, 0.58);
	fan.rotation.x = Math.PI / 2;
	fan.userData.spin = true;
	group.add(fan);
	addBox(THREE, group, [0.34, 1.45, 0.12], [0, -0.1, -0.35], materials.accent);
}

function buildMotherboardModel(THREE, group, materials) {
	addBox(THREE, group, [2.45, 0.12, 2.45], [0, 0, 0], materials.board);
	addBox(THREE, group, [0.62, 0.14, 0.62], [-0.35, 0.13, -0.2], materials.metal);
	for (let i = 0; i < 4; i++) {
		addBox(THREE, group, [0.12, 0.18, 1.45], [0.75 + i * 0.16, 0.16, -0.2], i % 2 ? materials.accent : materials.rubber);
	}
	addBox(THREE, group, [1.45, 0.12, 0.18], [0.35, 0.16, 0.85], materials.gold);
	addBox(THREE, group, [0.42, 0.18, 0.42], [-0.92, 0.16, 0.78], materials.rubber);
	addBox(THREE, group, [0.72, 0.2, 0.32], [-0.88, 0.16, -0.94], materials.accent);
}

function buildCaseModel(THREE, group, materials) {
	addBox(THREE, group, [1.55, 2.15, 1.15], [0, 0, 0], materials.rubber);
	addBox(THREE, group, [1.32, 1.82, 0.04], [0.08, 0.02, 0.6], materials.glass);
	addBox(THREE, group, [1.32, 0.08, 1.05], [0, 1.12, 0], materials.accent);
	for (const y of [-0.48, 0.1, 0.68]) {
		const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.06, 36), materials.metal);
		fan.position.set(-0.82, y, 0);
		fan.rotation.z = Math.PI / 2;
		fan.userData.spin = true;
		group.add(fan);
	}
}

function buildUpsModel(THREE, group, materials) {
	addBox(THREE, group, [1.45, 1.8, 1.15], [0, 0, 0], materials.rubber);
	addBox(THREE, group, [1.15, 1.45, 0.05], [0, 0.05, 0.6], materials.darkBoard);
	addBox(THREE, group, [0.72, 0.24, 0.06], [0, 0.42, 0.64], materials.accent);
	const button = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.08, 32), materials.metal);
	button.position.set(0, -0.18, 0.64);
	button.rotation.x = Math.PI / 2;
	group.add(button);
}

function buildGenericModel(THREE, group, materials) {
	addBox(THREE, group, [1.7, 1.1, 1.7], [0, 0, 0], materials.rubber);
	addBox(THREE, group, [1.2, 0.12, 1.2], [0, 0.65, 0], materials.accent);
}

function animateModelParts(group, elapsed) {
	group.traverse(object => {
		if (object.userData.spin) {
			object.rotation.z += 0.08;
			object.rotation.y += Math.sin(elapsed * 1.8) * 0.002;
		}
	});
}

function escapeHtml(value) {
	return String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function formatPrice(value) {
	return `$${new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(value)}`;
}
