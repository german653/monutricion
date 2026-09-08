import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { w as fetchServices } from "./router-D2ebo0ym.mjs";
import { A as Clock } from "../_libs/lucide-react.mjs";
import { m as formatPrice, t as Button } from "./format-aQySvrb2.mjs";
import { t as SiteLayout } from "./SiteLayout-BwNyWXL7.mjs";
import { t as Reveal } from "./Reveal-lH79kOIs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/servicios-BjNQrOsJ.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/servicios.tsx?tsr-split=component";
function ServicesPage() {
	const { data: services } = useSuspenseQuery({
		queryKey: ["services"],
		queryFn: fetchServices
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
			className: "mx-auto mb-12 max-w-2xl text-center",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "font-display text-4xl tracking-tight sm:text-5xl",
				children: "Servicios"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 19,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-3 text-muted-foreground",
				children: "Acompañamiento personalizado para cada etapa de tu camino."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 20,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 18,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
			children: services.map((s, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
				delay: i * .06,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-transform hover:-translate-y-1",
					children: [s.image_url && /* @__PURE__ */ (void 0)("img", {
						src: s.image_url,
						alt: s.title,
						loading: "lazy",
						className: "h-44 w-full object-cover"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 27,
						columnNumber: 33
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-1 flex-col p-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-xl font-semibold",
								children: s.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 29,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 flex-1 text-sm text-muted-foreground",
								children: s.description
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 30,
								columnNumber: 19
							}, this),
							s.duration && /* @__PURE__ */ (void 0)("span", {
								className: "mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (void 0)(Clock, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 32,
										columnNumber: 23
									}, this),
									" ",
									s.duration
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 31,
								columnNumber: 34
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-display text-2xl font-semibold text-primary",
									children: formatPrice(s.price)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 35,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									asChild: true,
									size: "sm",
									className: "rounded-full",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/reservar",
										children: "Reservar"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 39,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 38,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 34,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 28,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 26,
					columnNumber: 15
				}, this)
			}, s.id, false, {
				fileName: _jsxFileName,
				lineNumber: 25,
				columnNumber: 35
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 24,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 17,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 16,
		columnNumber: 10
	}, this);
}
//#endregion
export { ServicesPage as component };
