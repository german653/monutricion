import { t as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { b as fetchFaq, u as fetchAbout } from "./router-D2ebo0ym.mjs";
import { D as Heart, F as Award, S as Leaf, a as Target } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./SiteLayout-BwNyWXL7.mjs";
import { t as Reveal } from "./Reveal-lH79kOIs.mjs";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-DeFJErkA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sobre-mi-CKAFESxM.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/sobre-mi.tsx?tsr-split=component";
var highlights = [{
	icon: Award,
	title: "Experiencia",
	key: "experience"
}, {
	icon: Target,
	title: "Especialidades",
	key: "specialties"
}];
function AboutPage() {
	const { data: about } = useSuspenseQuery({
		queryKey: ["about"],
		queryFn: fetchAbout
	});
	const { data: faq } = useSuspenseQuery({
		queryKey: ["faq"],
		queryFn: fetchFaq
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "overflow-hidden rounded-[2.5rem] shadow-card",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
				src: about?.image_url || "/assets/about-melina-CYJHl7R1.jpg",
				alt: "Melina Oviedo",
				width: 1200,
				height: 1200,
				className: "h-full w-full object-cover"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 34,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 33,
			columnNumber: 11
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 32,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
			delay: .1,
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Leaf, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 39,
						columnNumber: 13
					}, this), " Sobre mí"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-4xl tracking-tight sm:text-5xl",
					children: about?.title ?? "Hola, soy Meli Oviedo"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 41,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-4 text-base leading-relaxed text-muted-foreground whitespace-pre-line",
					children: about?.body
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 44,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 pt-2 sm:grid-cols-2",
					children: highlights.map((h) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-3xl border border-border bg-card p-5 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(h.icon, { className: "mb-2 h-6 w-6 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 49,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-semibold",
								children: h.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 50,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground",
								children: about?.[h.key] ?? "—"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 51,
								columnNumber: 17
							}, this)
						]
					}, h.key, true, {
						fileName: _jsxFileName,
						lineNumber: 48,
						columnNumber: 34
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 37,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 31,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
				className: "mb-8 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: "mx-auto mb-3 h-8 w-8 text-primary" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 60,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-3xl tracking-tight sm:text-4xl",
					children: "Preguntas frecuentes"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 61,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 59,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Accordion, {
				type: "single",
				collapsible: true,
				className: "w-full",
				children: faq.map((f) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionItem, {
					value: f.id,
					className: "border-border",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionTrigger, {
						className: "text-left text-base",
						children: f.question
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 68,
						columnNumber: 19
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionContent, {
						className: "text-muted-foreground",
						children: f.answer
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 69,
						columnNumber: 19
					}, this)]
				}, f.id, true, {
					fileName: _jsxFileName,
					lineNumber: 67,
					columnNumber: 29
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 13
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 65,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 58,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 57,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 30,
		columnNumber: 10
	}, this);
}
//#endregion
export { AboutPage as component };
