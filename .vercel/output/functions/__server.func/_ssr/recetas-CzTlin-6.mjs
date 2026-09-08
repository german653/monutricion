import { t as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { C as fetchRecipes } from "./router-D2ebo0ym.mjs";
import { A as Clock, r as Users } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./SiteLayout-BwNyWXL7.mjs";
import { t as Reveal } from "./Reveal-lH79kOIs.mjs";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-DeFJErkA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recetas-CzTlin-6.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/recetas.tsx?tsr-split=component";
function lines(value) {
	return value.split("\n").map((l) => l.trim()).filter(Boolean);
}
function RecipesPage() {
	const { data: recipes } = useSuspenseQuery({
		queryKey: ["recipes"],
		queryFn: fetchRecipes
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
				className: "mx-auto mb-12 max-w-2xl text-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-4xl tracking-tight sm:text-5xl",
					children: "Recetas y material"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 21,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 text-muted-foreground",
					children: "Ideas simples, ricas y equilibradas para comer mejor todos los días."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 22,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 20,
				columnNumber: 11
			}, this), recipes.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "py-16 text-center text-muted-foreground",
				children: "Muy pronto vas a encontrar acá recetas y material descargable."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 27,
				columnNumber: 35
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: recipes.map((r, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: i * .06,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
						className: "flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft",
						children: [r.image_url && /* @__PURE__ */ (void 0)("img", {
							src: r.image_url,
							alt: r.title,
							loading: "lazy",
							className: "h-52 w-full object-cover"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 32,
							columnNumber: 37
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-1 flex-col p-6",
							children: [
								r.category && /* @__PURE__ */ (void 0)("span", {
									className: "mb-2 self-start rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground",
									children: r.category
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 34,
									columnNumber: 38
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "font-display text-xl",
									children: r.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 37,
									columnNumber: 23
								}, this),
								r.description && /* @__PURE__ */ (void 0)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: r.description
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 38,
									columnNumber: 41
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground",
									children: [r.prep_time && /* @__PURE__ */ (void 0)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (void 0)(Clock, { className: "h-3.5 w-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 42,
												columnNumber: 29
											}, this),
											" ",
											r.prep_time
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 41,
										columnNumber: 41
									}, this), r.servings && /* @__PURE__ */ (void 0)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (void 0)(Users, { className: "h-3.5 w-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 45,
												columnNumber: 29
											}, this),
											" ",
											r.servings
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 44,
										columnNumber: 40
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 40,
									columnNumber: 23
								}, this),
								(r.ingredients || r.steps) && /* @__PURE__ */ (void 0)(Accordion, {
									type: "single",
									collapsible: true,
									className: "mt-4",
									children: [r.ingredients && /* @__PURE__ */ (void 0)(AccordionItem, {
										value: "ing",
										children: [/* @__PURE__ */ (void 0)(AccordionTrigger, {
											className: "text-sm",
											children: "Ingredientes"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 51,
											columnNumber: 31
										}, this), /* @__PURE__ */ (void 0)(AccordionContent, { children: /* @__PURE__ */ (void 0)("ul", {
											className: "list-disc space-y-1 pl-5 text-sm text-muted-foreground",
											children: lines(r.ingredients).map((l, idx) => /* @__PURE__ */ (void 0)("li", { children: l }, idx, false, {
												fileName: _jsxFileName,
												lineNumber: 54,
												columnNumber: 73
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 53,
											columnNumber: 33
										}, this) }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 52,
											columnNumber: 31
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 50,
										columnNumber: 45
									}, this), r.steps && /* @__PURE__ */ (void 0)(AccordionItem, {
										value: "steps",
										children: [/* @__PURE__ */ (void 0)(AccordionTrigger, {
											className: "text-sm",
											children: "Preparación"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 59,
											columnNumber: 31
										}, this), /* @__PURE__ */ (void 0)(AccordionContent, { children: /* @__PURE__ */ (void 0)("ol", {
											className: "list-decimal space-y-1 pl-5 text-sm text-muted-foreground",
											children: lines(r.steps).map((l, idx) => /* @__PURE__ */ (void 0)("li", { children: l }, idx, false, {
												fileName: _jsxFileName,
												lineNumber: 62,
												columnNumber: 67
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 61,
											columnNumber: 33
										}, this) }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 60,
											columnNumber: 31
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 58,
										columnNumber: 39
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 49,
									columnNumber: 54
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 33,
							columnNumber: 21
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 31,
						columnNumber: 19
					}, this)
				}, r.id, false, {
					fileName: _jsxFileName,
					lineNumber: 30,
					columnNumber: 38
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 29,
				columnNumber: 20
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 19,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 18,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 17,
		columnNumber: 10
	}, this);
}
//#endregion
export { RecipesPage as component };
