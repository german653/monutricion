import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { _ as Link, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as getApp, o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { a as query, c as collection, d as initializeFirestore, f as setLogLevel, i as orderBy, l as doc, n as getDoc, o as setDoc, r as getDocs, s as where, t as deleteDoc, u as getFirestore } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { t as getAuth } from "../_libs/firebase__auth.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { r as __exportAll } from "./server-B-cE_637.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D2ebo0ym.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var styles_default = "/assets/styles-DJEOL4kB.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var _jsxFileName$2 = "/app/applet/src/components/ui/sonner.tsx";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 7,
		columnNumber: 5
	}, void 0);
};
var _jsxFileName$1 = "/app/applet/src/features/cart/cart-store.tsx";
var CartContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "mo-cart-v1";
function CartProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setItems(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	}, [items, hydrated]);
	const add = (0, import_react.useCallback)((product, quantity = 1) => {
		setItems((prev) => {
			if (prev.find((i) => i.id === product.id)) return prev.map((i) => i.id === product.id ? {
				...i,
				quantity: i.quantity + quantity
			} : i);
			return [...prev, {
				id: product.id,
				name: product.name,
				price: product.price,
				image_url: product.image_url,
				quantity
			}];
		});
	}, []);
	const remove = (0, import_react.useCallback)((id) => {
		setItems((prev) => prev.filter((i) => i.id !== id));
	}, []);
	const setQuantity = (0, import_react.useCallback)((id, quantity) => {
		setItems((prev) => prev.map((i) => i.id === id ? {
			...i,
			quantity: Math.max(0, quantity)
		} : i).filter((i) => i.quantity > 0));
	}, []);
	const clear = (0, import_react.useCallback)(() => setItems([]), []);
	const value = (0, import_react.useMemo)(() => {
		const count = items.reduce((sum, i) => sum + i.quantity, 0);
		const subtotal = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
		return {
			items,
			count,
			subtotal,
			add,
			remove,
			setQuantity,
			clear
		};
	}, [
		items,
		add,
		remove,
		setQuantity,
		clear
	]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartContext.Provider, {
		value,
		children
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 92,
		columnNumber: 10
	}, this);
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}
try {
	setLogLevel("error");
} catch {}
var app = getApps().length > 0 ? getApp() : initializeApp({
	apiKey: "AIzaSyAWl1kIOpWFAh8qD6xNm0JMeL9XllBnpXA",
	authDomain: "decent-antonym-4tsmh.firebaseapp.com",
	projectId: "decent-antonym-4tsmh",
	storageBucket: "decent-antonym-4tsmh.firebasestorage.app",
	messagingSenderId: "723102852389",
	appId: "1:723102852389:web:70585b4544fe17c535a6cc"
});
var firestoreDbId = "ai-studio-monutricion-a342607c-9aa7-4e3e-8084-10aa98921944";
function createFirestore() {
	const targetDb = firestoreDbId;
	try {
		return initializeFirestore(app, { experimentalForceLongPolling: true }, targetDb);
	} catch {
		return getFirestore(app, targetDb);
	}
}
var db = createFirestore();
getAuth(app);
var DEFAULT_SERVICES = [
	{
		id: "s-1",
		title: "Consulta nutricional inicial",
		description: "Evaluación completa, análisis de hábitos y plan alimentario 100% personalizado.",
		duration: "60 min",
		price: 15e3,
		sort_order: 1,
		is_active: true,
		image_url: null,
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "s-2",
		title: "Seguimiento nutricional",
		description: "Ajustes del plan, evaluación de avances y acompañamiento cercano continuo.",
		duration: "30 min",
		price: 9e3,
		sort_order: 2,
		is_active: true,
		image_url: null,
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "s-3",
		title: "Nutrición deportiva",
		description: "Plan enfocado en rendimiento, energía, masa muscular y composición corporal.",
		duration: "60 min",
		price: 18e3,
		sort_order: 3,
		is_active: true,
		image_url: null,
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}
];
var DEFAULT_PRODUCTS = [
	{
		id: "p-1",
		name: "Proteína Vegetal Neutra 500g",
		description: "Suplemento proteico a base de arveja y arroz, sin aditivos ni azúcares.",
		price: 12500,
		stock: 15,
		category_id: "c-1",
		is_active: true,
		image_url: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&auto=format&fit=crop&q=80",
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "p-2",
		name: "Mix Frutos Secos & Semillas 250g",
		description: "Almendras, nueces, castañas de cajú y semillas tostadas sin sal agregada.",
		price: 4500,
		stock: 25,
		category_id: "c-2",
		is_active: true,
		image_url: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&auto=format&fit=crop&q=80",
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "p-3",
		name: "Infusión Digestiva Herbal 100g",
		description: "Mezcla de manzanilla, menta, cedrón y anís estrellado para después de las comidas.",
		price: 3200,
		stock: 20,
		category_id: "c-3",
		is_active: true,
		image_url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}
];
var DEFAULT_RECIPES = [
	{
		id: "r-1",
		title: "Pancake proteico de avena y banana",
		description: "Un desayuno rápido, saciante y lleno de nutrientes para empezar el día con energía.",
		image_url: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&auto=format&fit=crop&q=80",
		category: "Desayunos",
		prep_time: "15 min",
		servings: "2 porciones",
		ingredients: "• 1 taza de avena arrollada\n• 1 banana madura\n• 2 huevos\n• 1 cdita de canela\n• 1 cdita de polvo para hornear\n• Frutos rojos para decorar",
		steps: "1. Procesar todos los ingredientes en licuadora hasta obtener una mezcla homogénea.\n2. Calentar una sartén antiadherente con unas gotas de aceite de coco.\n3. Verter porciones y cocinar a fuego medio hasta que salgan burbujas, dar vuelta y dorar 1 min.\n4. Servir con frutas frescas.",
		sort_order: 1,
		is_published: true,
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "r-2",
		title: "Bowl fresco de quinoa, palta y vegetales asados",
		description: "Almuerzo completo con proteína vegetal, grasas saludables y fibra de calidad.",
		image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
		category: "Almuerzos",
		prep_time: "25 min",
		servings: "2 platos",
		ingredients: "• 1 taza de quinoa cocida\n• 1 palta en cubos\n• 1 taza de calabaza asada\n• 1 taza de hojas verdes variadas\n• Semillas de girasol tostadas\n• Limón, aceite de oliva virgen extra y sal marina",
		steps: "1. Cocinar la quinoa lavada en 2 partes de agua por 15 minutos.\n2. Disponer una base de hojas verdes en dos bowls.\n3. Agregar la quinoa tibia, la calabaza asada y la palta fresca.\n4. Condimentar con la vinagreta de limón y oliva y espolvorear las semillas.",
		sort_order: 2,
		is_published: true,
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "r-3",
		title: "Trufas energéticas de cacao y dátiles",
		description: "Snack dulce sin azúcares refinados, ideal para antes o después de entrenar.",
		image_url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80",
		category: "Snacks",
		prep_time: "10 min",
		servings: "10 unidades",
		ingredients: "• 10 dátiles descarozados hidratados\n• 1/2 taza de nueces o almendras\n• 2 cdas de cacao amargo en polvo\n• 1 cda de semillas de chía\n• Coco rallado para rebozar",
		steps: "1. Procesar los frutos secos y los dátiles hasta que se forme una pasta moldeable.\n2. Incorporar el cacao y las semillas.\n3. Formar bolitas con las manos y rebozarlas en coco rallado.\n4. Refrigerar 30 minutos antes de consumir.",
		sort_order: 3,
		is_published: true,
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}
];
var DEFAULT_CATEGORIES = [
	{
		id: "c-1",
		name: "Suplementos",
		slug: "suplementos",
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "c-2",
		name: "Snacks saludables",
		slug: "snacks",
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "c-3",
		name: "Infusiones",
		slug: "infusiones",
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	}
];
var DEFAULT_FAQ = [
	{
		id: "f-1",
		question: "¿Cómo son las consultas?",
		answer: "Las consultas pueden ser presenciales u online. En el primer encuentro evaluamos tu historia clínica, rutina, hábitos alimentarios y objetivos para diseñar una propuesta 100% personalizada y realista.",
		sort_order: 1,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "f-2",
		question: "¿Necesito una derivación médica o análisis previos?",
		answer: "No es obligatorio tener derivación previa, pero si tenés análisis de laboratorio o estudios médicos recientes, podés traerlos para ajustar el plan con mayor precisión.",
		sort_order: 2,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "f-3",
		question: "¿Los planes son restrictivos o dietas estrictas?",
		answer: "No trabajo con dietas de moda ni restricciones extremas. Mi enfoque es la educación alimentaria y el desarrollo de hábitos sostenibles que puedas mantener a largo plazo disfrutando del proceso.",
		sort_order: 3,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	}
];
var DEFAULT_ABOUT = {
	title: "Hola, soy Meli Oviedo",
	body: `Soy Licenciada en Nutrición, egresada de la Facultad de Nutrición de la Universidad Nacional de Córdoba, matrícula profesional 5433.

Me apasiona acompañar a las personas en el camino hacia su mejor versión, ayudándolas a alcanzar sus objetivos, construir hábitos saludables y, sobre todo, a confiar en que pueden lograr mucho más de lo que imaginan.

Creo que la nutrición es una herramienta fundamental para cuidar nuestra salud, sentirnos mejor y potenciar nuestro bienestar en todos los aspectos de nuestra vida.

Trabajo con diferentes patologías y objetivos nutricionales, y tengo una especial pasión por la nutrición deportiva. Además, soy runner y cuento con certificación ISAK nivel I y II, porque considero que conocer y entender nuestro cuerpo es parte fundamental del proceso.

Quiero acompañarte desde un lugar de educación, motivación y empatía, brindándote herramientas para que puedas aprender a alimentarte, disfrutar del proceso y alcanzar tus objetivos de una manera sostenible.

Porque no se trata de buscar la perfección, sino de aprender, avanzar y crecer en el camino. 

¿Empezamos juntos?`,
	experience: "Lic. en Nutrición (UNC) • M.P. 5433",
	specialties: "Nutrición deportiva • ISAK I y II • Hábitos sostenibles"
};
var DEFAULT_BRANDING = {
	logo_url: null,
	favicon_url: null,
	brand_name: "Melina Oviedo",
	tagline: "Nutrición y Salud"
};
var DEFAULT_HERO = {
	title: "Nutrición real para potenciar tu vida y rendimiento",
	subtitle: "Acompañamiento profesional, planes personalizados y herramientas prácticas para construir hábitos sostenibles."
};
var DEFAULT_FOOTER_WHATSAPP_MESSAGE = "¡Holaa Melina! Vi tu sitio web y te quiero hacerte una consulta. Espero tu mensaje";
var DEFAULT_CONTACT = {
	email: "nutricion.melinaoviedo@gmail.com",
	phone: "+54 9 3541 63-9512",
	whatsapp: "5493541639512",
	instagram: "https://www.instagram.com/nutri_melioviedo/?hl=es-la",
	address: "Córdoba, Argentina (Presencial & Online)",
	footer_whatsapp_message: DEFAULT_FOOTER_WHATSAPP_MESSAGE
};
function getStorage(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const raw = localStorage.getItem(`mo_data_${key}`);
		return raw ? JSON.parse(raw) : fallback;
	} catch {
		return fallback;
	}
}
function setStorage(key, value) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(`mo_data_${key}`, JSON.stringify(value));
	} catch {}
}
async function fetchServices() {
	try {
		const q = query(collection(db, "services"), where("is_active", "==", true));
		const snap = await getDocs(q);
		if (!snap.empty) {
			const list = snap.docs.map((d) => ({
				id: d.id,
				...d.data()
			}));
			list.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
			return list;
		}
	} catch {}
	return getStorage("services", DEFAULT_SERVICES).filter((s) => s.is_active);
}
async function fetchAllServices() {
	try {
		const snap = await getDocs(collection(db, "services"));
		if (!snap.empty) {
			const list = snap.docs.map((d) => ({
				id: d.id,
				...d.data()
			}));
			list.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
			return list;
		}
	} catch {}
	return getStorage("services", DEFAULT_SERVICES);
}
async function fetchProducts() {
	try {
		const q = query(collection(db, "products"), where("is_active", "==", true));
		const snap = await getDocs(q);
		if (!snap.empty) return snap.docs.map((d) => ({
			id: d.id,
			...d.data()
		}));
	} catch {}
	return getStorage("products", DEFAULT_PRODUCTS).filter((p) => p.is_active);
}
async function fetchAllProducts() {
	try {
		const snap = await getDocs(collection(db, "products"));
		if (!snap.empty) return snap.docs.map((d) => ({
			id: d.id,
			...d.data()
		}));
	} catch {}
	return getStorage("products", DEFAULT_PRODUCTS);
}
async function fetchCategories() {
	try {
		const snap = await getDocs(collection(db, "categories"));
		if (!snap.empty) return snap.docs.map((d) => ({
			id: d.id,
			...d.data()
		}));
	} catch {}
	return getStorage("categories", DEFAULT_CATEGORIES);
}
async function fetchFaq() {
	try {
		const snap = await getDocs(collection(db, "faq"));
		if (!snap.empty) {
			const list = snap.docs.map((d) => ({
				id: d.id,
				...d.data()
			}));
			list.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
			return list;
		}
	} catch {}
	return getStorage("faq", DEFAULT_FAQ);
}
async function fetchContent(key, fallback) {
	try {
		const docRef = doc(db, "site_content", key);
		const snap = await getDoc(docRef);
		if (snap.exists()) {
			const data = snap.data();
			if (data?.value !== void 0 && data.value !== null) return data.value;
		}
	} catch {}
	return getStorage(`content_${key}`, fallback ?? null);
}
var fetchHero = () => fetchContent("hero", DEFAULT_HERO);
var fetchAbout = () => fetchContent("about", DEFAULT_ABOUT);
var fetchContact = () => fetchContent("contact", DEFAULT_CONTACT);
var fetchBranding = () => fetchContent("branding", DEFAULT_BRANDING);
async function createAppointment(input) {
	const newId = crypto.randomUUID();
	const newApp = {
		...input,
		id: newId,
		status: "pendiente",
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	try {
		await setDoc(doc(db, "appointments", newId), newApp);
	} catch {}
	setStorage("appointments", [newApp, ...getStorage("appointments", [])]);
}
async function fetchAppointments() {
	try {
		const snap = await getDocs(collection(db, "appointments"));
		if (!snap.empty) {
			const list = snap.docs.map((d) => ({
				id: d.id,
				...d.data()
			}));
			list.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
			return list;
		}
	} catch {}
	return getStorage("appointments", []);
}
async function updateAppointmentStatus(id, status) {
	try {
		await setDoc(doc(db, "appointments", id), {
			status,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}, { merge: true });
	} catch {}
	setStorage("appointments", getStorage("appointments", []).map((a) => a.id === id ? {
		...a,
		status,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	} : a));
}
async function deleteAppointment(id) {
	try {
		await deleteDoc(doc(db, "appointments", id));
	} catch {}
	setStorage("appointments", getStorage("appointments", []).filter((a) => a.id !== id));
}
async function upsertService(input) {
	const id = input.id || crypto.randomUUID();
	const list = getStorage("services", DEFAULT_SERVICES);
	const existingItem = list.find((s) => s.id === id);
	const payload = {
		id,
		title: input.title || existingItem?.title || "",
		description: input.description || existingItem?.description || "",
		duration: input.duration !== void 0 ? input.duration : existingItem?.duration || null,
		price: input.price !== void 0 ? input.price : existingItem?.price || 0,
		sort_order: input.sort_order !== void 0 ? input.sort_order : existingItem?.sort_order || list.length + 1,
		is_active: input.is_active !== void 0 ? input.is_active : existingItem?.is_active ?? true,
		image_url: input.image_url !== void 0 ? input.image_url : existingItem?.image_url || null,
		created_at: existingItem?.created_at || (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	try {
		await setDoc(doc(db, "services", id), payload, { merge: true });
	} catch {}
	if (input.id && existingItem) setStorage("services", list.map((s) => s.id === id ? payload : s));
	else setStorage("services", [...list, payload]);
}
async function deleteService(id) {
	try {
		await deleteDoc(doc(db, "services", id));
	} catch {}
	setStorage("services", getStorage("services", DEFAULT_SERVICES).filter((s) => s.id !== id));
}
async function upsertProduct(input) {
	const id = input.id || crypto.randomUUID();
	const list = getStorage("products", DEFAULT_PRODUCTS);
	const existingItem = list.find((p) => p.id === id);
	const payload = {
		id,
		name: input.name || existingItem?.name || "",
		description: input.description || existingItem?.description || "",
		price: input.price !== void 0 ? input.price : existingItem?.price || 0,
		stock: input.stock !== void 0 ? input.stock : existingItem?.stock || 0,
		category_id: input.category_id !== void 0 ? input.category_id : existingItem?.category_id || null,
		is_active: input.is_active !== void 0 ? input.is_active : existingItem?.is_active ?? true,
		image_url: input.image_url !== void 0 ? input.image_url : existingItem?.image_url || null,
		created_at: existingItem?.created_at || (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	try {
		await setDoc(doc(db, "products", id), payload, { merge: true });
	} catch {}
	if (input.id && existingItem) setStorage("products", list.map((p) => p.id === id ? payload : p));
	else setStorage("products", [payload, ...list]);
}
async function deleteProduct(id) {
	try {
		await deleteDoc(doc(db, "products", id));
	} catch {}
	setStorage("products", getStorage("products", DEFAULT_PRODUCTS).filter((p) => p.id !== id));
}
async function saveContent(key, value) {
	try {
		await setDoc(doc(db, "site_content", key), {
			key,
			value,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		});
	} catch {}
	setStorage(`content_${key}`, value);
}
async function fetchRecipes() {
	try {
		const q = query(collection(db, "recipes"), where("is_published", "==", true));
		const snap = await getDocs(q);
		if (!snap.empty) {
			const list = snap.docs.map((d) => ({
				id: d.id,
				...d.data()
			}));
			list.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
			return list;
		}
	} catch {}
	return getStorage("recipes", DEFAULT_RECIPES).filter((r) => r.is_published);
}
async function fetchAllRecipes() {
	try {
		const snap = await getDocs(collection(db, "recipes"));
		if (!snap.empty) {
			const list = snap.docs.map((d) => ({
				id: d.id,
				...d.data()
			}));
			list.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
			return list;
		}
	} catch {}
	return getStorage("recipes", DEFAULT_RECIPES);
}
async function upsertRecipe(input) {
	const id = input.id || crypto.randomUUID();
	const list = getStorage("recipes", DEFAULT_RECIPES);
	const existingItem = list.find((r) => r.id === id);
	const payload = {
		id,
		title: input.title || existingItem?.title || "",
		description: input.description || existingItem?.description || "",
		image_url: input.image_url !== void 0 ? input.image_url : existingItem?.image_url || null,
		category: input.category !== void 0 ? input.category : existingItem?.category || null,
		prep_time: input.prep_time !== void 0 ? input.prep_time : existingItem?.prep_time || null,
		servings: input.servings !== void 0 ? input.servings : existingItem?.servings || null,
		ingredients: input.ingredients || existingItem?.ingredients || "",
		steps: input.steps || existingItem?.steps || "",
		sort_order: input.sort_order !== void 0 ? input.sort_order : existingItem?.sort_order || list.length + 1,
		is_published: input.is_published !== void 0 ? input.is_published : existingItem?.is_published ?? true,
		created_at: existingItem?.created_at || (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	try {
		await setDoc(doc(db, "recipes", id), payload, { merge: true });
	} catch {}
	if (input.id && existingItem) setStorage("recipes", list.map((r) => r.id === id ? payload : r));
	else setStorage("recipes", [payload, ...list]);
}
async function deleteRecipe(id) {
	try {
		await deleteDoc(doc(db, "recipes", id));
	} catch {}
	setStorage("recipes", getStorage("recipes", DEFAULT_RECIPES).filter((r) => r.id !== id));
}
async function fetchAvailability() {
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	try {
		const q = query(collection(db, "availability"), where("date", ">=", today), orderBy("date", "asc"));
		const snap = await getDocs(q);
		if (!snap.empty) return snap.docs.map((d) => ({
			id: d.id,
			...d.data()
		}));
	} catch {}
	return getStorage("availability", []);
}
async function addAvailabilitySlots(date, times) {
	const current = getStorage("availability", []);
	const newSlots = [];
	for (const time of times) {
		const slotId = `${date}_${time.replace(":", "-")}`;
		const slotData = {
			id: slotId,
			date,
			time,
			created_at: (/* @__PURE__ */ new Date()).toISOString()
		};
		newSlots.push(slotData);
		try {
			await setDoc(doc(db, "availability", slotId), slotData, { merge: true });
		} catch {}
	}
	setStorage("availability", [...current, ...newSlots]);
}
async function deleteAvailabilitySlot(id) {
	try {
		await deleteDoc(doc(db, "availability", id));
	} catch {}
	setStorage("availability", getStorage("availability", []).filter((s) => s.id !== id));
}
/** Free slots for the public booking page. */
async function fetchAvailableSlots() {
	try {
		const storedSlots = await fetchAvailability();
		if (storedSlots.length > 0) return storedSlots.map((s) => ({
			date: s.date,
			time: s.time
		}));
	} catch {}
	const slots = [];
	const base = /* @__PURE__ */ new Date();
	for (let i = 1; i <= 7; i++) {
		const d = new Date(base);
		d.setDate(base.getDate() + i);
		if (d.getDay() !== 0 && d.getDay() !== 6) {
			const dateStr = d.toISOString().slice(0, 10);
			slots.push({
				date: dateStr,
				time: "09:00"
			}, {
				date: dateStr,
				time: "11:00"
			}, {
				date: dateStr,
				time: "15:00"
			}, {
				date: dateStr,
				time: "17:00"
			});
		}
	}
	return slots;
}
var _jsxFileName = "/app/applet/src/routes/__root.tsx";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 22,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 23,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 24,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 28,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 27,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 21,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 20,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 57,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 66,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 49,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 48,
		columnNumber: 5
	}, this);
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Melina Oviedo — Nutrición y Salud" },
			{
				name: "description",
				content: "Nutricionista Melina Oviedo. Planes de alimentación personalizados, consultas y acompañamiento cercano para tu bienestar. Reservá tu turno."
			},
			{
				name: "author",
				content: "Melina Oviedo"
			},
			{
				property: "og:title",
				content: "Melina Oviedo — Nutrición y Salud"
			},
			{
				property: "og:description",
				content: "Planes de alimentación personalizados y acompañamiento cercano para transformar tu bienestar."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: "MO Nutrición y Salud"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Poppins:wght@300;400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 123,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 122,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 127,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 125,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 121,
		columnNumber: 5
	}, this);
}
function DynamicFaviconUpdater() {
	const { data: branding } = useQuery({
		queryKey: ["branding"],
		queryFn: fetchBranding,
		staleTime: 3e5
	});
	(0, import_react.useEffect)(() => {
		if (typeof document === "undefined") return;
		const customFavicon = branding?.favicon_url;
		if (customFavicon) {
			const existingIcons = document.querySelectorAll("link[rel*='icon']");
			if (existingIcons.length > 0) existingIcons.forEach((el) => {
				el.href = customFavicon;
			});
			else {
				const newLink = document.createElement("link");
				newLink.rel = "icon";
				newLink.href = customFavicon;
				document.head.appendChild(newLink);
			}
		}
	}, [branding?.favicon_url]);
	return null;
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DynamicFaviconUpdater, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 167,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 169,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster$1, {
				richColors: true,
				position: "top-center"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 170,
				columnNumber: 9
			}, this)
		] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 166,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 165,
		columnNumber: 5
	}, this);
}
var $$splitErrorComponentImporter$6 = () => import("./routes-BjNChoVl.mjs");
var $$splitComponentImporter$8 = () => import("./routes-B_1mzjbh.mjs");
var Route$9 = createFileRoute("/")({
	loader: async ({ context }) => {
		await Promise.all([
			context.queryClient.ensureQueryData({
				queryKey: ["services"],
				queryFn: fetchServices
			}),
			context.queryClient.ensureQueryData({
				queryKey: ["hero"],
				queryFn: fetchHero
			}),
			context.queryClient.ensureQueryData({
				queryKey: ["about"],
				queryFn: fetchAbout
			})
		]);
	},
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$6, "errorComponent")
});
var $$splitComponentImporter$7 = () => import("./admin-ByZX39WD.mjs");
var Route$8 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Panel Admin — Melina Oviedo" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitErrorComponentImporter$5 = () => import("./contacto-CIESRxhF.mjs");
var $$splitComponentImporter$6 = () => import("./contacto-36W6R03t.mjs");
var Route$7 = createFileRoute("/contacto")({
	head: () => ({
		meta: [
			{ title: "Contacto — Melina Oviedo Nutrición" },
			{
				name: "description",
				content: "Contactá a Melina Oviedo por WhatsApp, correo o Instagram."
			},
			{
				property: "og:url",
				content: "/contacto"
			}
		],
		links: [{
			rel: "canonical",
			href: "/contacto"
		}]
	}),
	loader: ({ context }) => context.queryClient.ensureQueryData({
		queryKey: ["contact"],
		queryFn: fetchContact
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$5, "errorComponent")
});
objectType({
	name: stringType().trim().min(1, "Ingresá tu nombre").max(80),
	email: stringType().trim().email("Correo inválido").max(255),
	message: stringType().trim().min(1, "Escribí tu mensaje").max(1e3)
});
var $$splitNotFoundComponentImporter = () => import("./recetas-HwqZS15n.mjs");
var $$splitErrorComponentImporter$4 = () => import("./recetas-DUdGLSSA.mjs");
var $$splitComponentImporter$5 = () => import("./recetas-CzTlin-6.mjs");
var Route$6 = createFileRoute("/recetas")({
	head: () => ({
		meta: [
			{ title: "Recetas saludables — Melina Oviedo Nutrición" },
			{
				name: "description",
				content: "Recetas ricas, simples y equilibradas seleccionadas por la Lic. Melina Oviedo, con ingredientes y paso a paso."
			},
			{
				property: "og:title",
				content: "Recetas saludables — Melina Oviedo"
			},
			{
				property: "og:description",
				content: "Ideas de comidas y colaciones nutritivas para tu día a día."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "/recetas"
		}]
	}),
	loader: ({ context }) => context.queryClient.ensureQueryData({
		queryKey: ["recipes"],
		queryFn: fetchRecipes
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$4, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var $$splitErrorComponentImporter$3 = () => import("./reservar-CsENAATn.mjs");
var $$splitComponentImporter$4 = () => import("./reservar-C8devaP0.mjs");
var Route$5 = createFileRoute("/reservar")({
	head: () => ({
		meta: [
			{ title: "Reservar turno — Melina Oviedo Nutrición" },
			{
				name: "description",
				content: "Reservá tu consulta nutricional con Melina Oviedo de forma simple y rápida."
			},
			{
				property: "og:url",
				content: "/reservar"
			}
		],
		links: [{
			rel: "canonical",
			href: "/reservar"
		}]
	}),
	loader: ({ context }) => Promise.all([context.queryClient.ensureQueryData({
		queryKey: ["services"],
		queryFn: fetchServices
	}), context.queryClient.ensureQueryData({
		queryKey: ["available-slots"],
		queryFn: fetchAvailableSlots
	})]),
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$3, "errorComponent")
});
objectType({
	first_name: stringType().trim().min(1, "Ingresá tu nombre").max(80),
	last_name: stringType().trim().min(1, "Ingresá tu apellido").max(80),
	email: stringType().trim().email("Correo inválido").max(255),
	phone: stringType().trim().min(6, "Teléfono inválido").max(30),
	service_id: stringType().min(1, "Elegí un servicio"),
	date: stringType().min(1, "Elegí una fecha"),
	time: stringType().min(1, "Elegí un horario"),
	notes: stringType().max(1e3).optional()
});
var $$splitErrorComponentImporter$2 = () => import("./servicios-Bl27Bd8e.mjs");
var $$splitComponentImporter$3 = () => import("./servicios-BjNQrOsJ.mjs");
var Route$4 = createFileRoute("/servicios")({
	head: () => ({
		meta: [
			{ title: "Servicios — Melina Oviedo Nutrición" },
			{
				name: "description",
				content: "Consultas nutricionales, seguimiento y nutrición deportiva. Elegí tu plan personalizado."
			},
			{
				property: "og:title",
				content: "Servicios — Melina Oviedo"
			},
			{
				property: "og:url",
				content: "/servicios"
			}
		],
		links: [{
			rel: "canonical",
			href: "/servicios"
		}]
	}),
	loader: ({ context }) => context.queryClient.ensureQueryData({
		queryKey: ["services"],
		queryFn: fetchServices
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$2, "errorComponent")
});
var $$splitErrorComponentImporter$1 = () => import("./sobre-mi-CqIaUsED.mjs");
var $$splitComponentImporter$2 = () => import("./sobre-mi-CKAFESxM.mjs");
var Route$3 = createFileRoute("/sobre-mi")({
	head: () => ({
		meta: [
			{ title: "Sobre mí — Melina Oviedo Nutrición" },
			{
				name: "description",
				content: "Conocé la historia, experiencia y valores de la nutricionista Melina Oviedo."
			},
			{
				property: "og:title",
				content: "Sobre mí — Melina Oviedo"
			},
			{
				property: "og:url",
				content: "/sobre-mi"
			}
		],
		links: [{
			rel: "canonical",
			href: "/sobre-mi"
		}]
	}),
	loader: async ({ context }) => {
		await Promise.all([context.queryClient.ensureQueryData({
			queryKey: ["about"],
			queryFn: fetchAbout
		}), context.queryClient.ensureQueryData({
			queryKey: ["faq"],
			queryFn: fetchFaq
		})]);
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent")
});
var $$splitErrorComponentImporter = () => import("./tienda-BEryw6U7.mjs");
var $$splitComponentImporter$1 = () => import("./tienda-BdGSvacS.mjs");
var Route$2 = createFileRoute("/tienda")({
	head: () => ({
		meta: [
			{ title: "Tienda — Melina Oviedo Nutrición" },
			{
				name: "description",
				content: "Suplementos, snacks saludables e infusiones seleccionados por Melina Oviedo."
			},
			{
				property: "og:title",
				content: "Tienda — Melina Oviedo"
			},
			{
				property: "og:url",
				content: "/tienda"
			}
		],
		links: [{
			rel: "canonical",
			href: "/tienda"
		}]
	}),
	loader: async ({ context }) => {
		await Promise.all([context.queryClient.ensureQueryData({
			queryKey: ["products"],
			queryFn: fetchProducts
		}), context.queryClient.ensureQueryData({
			queryKey: ["categories"],
			queryFn: fetchCategories
		})]);
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
var $$splitComponentImporter = () => import("./reservar.confirmacion-DDU1RssO.mjs");
var Route$1 = createFileRoute("/reservar/confirmacion")({
	head: () => ({ meta: [{ title: "Turno confirmado — Melina Oviedo" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/api/public/media/$")({ server: { handlers: { GET: async () => {
	return new Response("Not found", { status: 404 });
} } } });
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var AdminRoute = Route$8.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$10
});
var ContactoRoute = Route$7.update({
	id: "/contacto",
	path: "/contacto",
	getParentRoute: () => Route$10
});
var RecetasRoute = Route$6.update({
	id: "/recetas",
	path: "/recetas",
	getParentRoute: () => Route$10
});
var ReservarRoute = Route$5.update({
	id: "/reservar",
	path: "/reservar",
	getParentRoute: () => Route$10
});
var ServiciosRoute = Route$4.update({
	id: "/servicios",
	path: "/servicios",
	getParentRoute: () => Route$10
});
var SobreMiRoute = Route$3.update({
	id: "/sobre-mi",
	path: "/sobre-mi",
	getParentRoute: () => Route$10
});
var TiendaRoute = Route$2.update({
	id: "/tienda",
	path: "/tienda",
	getParentRoute: () => Route$10
});
var ReservarConfirmacionRoute = Route$1.update({
	id: "/confirmacion",
	path: "/confirmacion",
	getParentRoute: () => ReservarRoute
});
var ApiPublicMediaSplatRoute = Route.update({
	id: "/api/public/media/$",
	path: "/api/public/media/$",
	getParentRoute: () => Route$10
});
var ReservarRouteChildren = { ReservarConfirmacionRoute };
var rootRouteChildren = {
	IndexRoute,
	AdminRoute,
	ContactoRoute,
	RecetasRoute,
	ReservarRoute: ReservarRoute._addFileChildren(ReservarRouteChildren),
	ServiciosRoute,
	SobreMiRoute,
	TiendaRoute,
	ApiPublicMediaSplatRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { useCart as A, fetchRecipes as C, upsertProduct as D, updateAppointmentStatus as E, upsertRecipe as O, fetchProducts as S, saveContent as T, fetchBranding as _, deleteAppointment as a, fetchFaq as b, deleteRecipe as c, fetchAllProducts as d, fetchAllRecipes as f, fetchAvailableSlots as g, fetchAvailability as h, createAppointment as i, upsertService as k, deleteService as l, fetchAppointments as m, DEFAULT_FOOTER_WHATSAPP_MESSAGE as n, deleteAvailabilitySlot as o, fetchAllServices as p, addAvailabilitySlots as r, deleteProduct as s, router_exports as t, fetchAbout as u, fetchCategories as v, fetchServices as w, fetchHero as x, fetchContact as y };
