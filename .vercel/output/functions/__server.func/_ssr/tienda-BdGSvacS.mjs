import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { t as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { A as useCart, S as fetchProducts, v as fetchCategories } from "./router-D2ebo0ym.mjs";
import { s as ShoppingBag, u as Plus } from "../_libs/lucide-react.mjs";
import { m as formatPrice, t as Button } from "./format-aQySvrb2.mjs";
import { t as Badge } from "./badge-BYuHvcVJ.mjs";
import { t as SiteLayout } from "./SiteLayout-BwNyWXL7.mjs";
import { t as Reveal } from "./Reveal-lH79kOIs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tienda-BdGSvacS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/tienda.tsx?tsr-split=component";
function ShopPage() {
	const { data: products } = useSuspenseQuery({
		queryKey: ["products"],
		queryFn: fetchProducts
	});
	const { data: categories } = useSuspenseQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories
	});
	const { add } = useCart();
	const [active, setActive] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => active ? products.filter((p) => p.category_id === active) : products, [products, active]);
	const handleAdd = (p) => {
		add(p);
		toast.success(`${p.name} agregado al carrito`);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
				className: "mx-auto mb-10 max-w-2xl text-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-4xl tracking-tight sm:text-5xl",
					children: "Tienda"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 text-muted-foreground",
					children: "Productos saludables seleccionados con cuidado."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 36,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-10 flex flex-wrap justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setActive(null),
					className: `rounded-full px-4 py-2 text-sm font-medium transition-colors ${active === null ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`,
					children: "Todos"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 44,
					columnNumber: 11
				}, this), categories.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setActive(c.id),
					className: `rounded-full px-4 py-2 text-sm font-medium transition-colors ${active === c.id ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`,
					children: c.name
				}, c.id, false, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 32
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 43,
				columnNumber: 9
			}, this),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "py-16 text-center text-muted-foreground",
				children: "Pronto vas a encontrar productos disponibles aquí."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 34
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((p, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: i * .05,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-transform hover:-translate-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "aspect-[4/3] overflow-hidden bg-muted",
							children: p.image_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: p.image_url,
								alt: p.name,
								loading: "lazy",
								className: "h-full w-full object-cover"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 58,
								columnNumber: 36
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex h-full w-full items-center justify-center text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "h-8 w-8" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 59,
									columnNumber: 25
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 58,
								columnNumber: 131
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 57,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-1 flex-col p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
										className: "font-semibold",
										children: p.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 64,
										columnNumber: 23
									}, this), p.stock <= 0 && /* @__PURE__ */ (void 0)(Badge, {
										variant: "secondary",
										children: "Sin stock"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 65,
										columnNumber: 40
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 63,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 flex-1 text-sm text-muted-foreground",
									children: p.description
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 67,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-4 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-display text-xl font-semibold text-primary",
										children: formatPrice(p.price)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 69,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										className: "rounded-full",
										disabled: p.stock <= 0,
										onClick: () => handleAdd(p),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "mr-1 h-4 w-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 73,
											columnNumber: 25
										}, this), " Agregar"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 72,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 68,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 62,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 56,
						columnNumber: 17
					}, this)
				}, p.id, false, {
					fileName: _jsxFileName,
					lineNumber: 55,
					columnNumber: 37
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 18
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 35,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 34,
		columnNumber: 10
	}, this);
}
//#endregion
export { ShopPage as component };
