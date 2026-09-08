import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { u as fetchAbout, w as fetchServices, x as fetchHero } from "./router-D2ebo0ym.mjs";
import { A as Clock, I as ArrowRight, O as HeartPulse, S as Leaf, l as Salad, o as Sparkles } from "../_libs/lucide-react.mjs";
import { m as formatPrice, t as Button } from "./format-aQySvrb2.mjs";
import { t as SiteLayout } from "./SiteLayout-BwNyWXL7.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as Reveal } from "./Reveal-lH79kOIs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_1mzjbh.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
var values = [
	{
		icon: HeartPulse,
		title: "Salud real",
		text: "Hábitos sostenibles que cuidan tu bienestar a largo plazo."
	},
	{
		icon: Leaf,
		title: "Cercanía",
		text: "Un acompañamiento humano, sin dietas imposibles ni culpa."
	},
	{
		icon: Salad,
		title: "Personalizado",
		text: "Planes a medida según tus gustos, tu ritmo y tus objetivos."
	},
	{
		icon: Sparkles,
		title: "Evidencia",
		text: "Nutrición basada en ciencia, adaptada a la vida real."
	}
];
function Index() {
	const { data: services } = useSuspenseQuery({
		queryKey: ["services"],
		queryFn: fetchServices
	});
	const { data: hero } = useSuspenseQuery({
		queryKey: ["hero"],
		queryFn: fetchHero
	});
	const { data: about } = useSuspenseQuery({
		queryKey: ["about"],
		queryFn: fetchAbout
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative overflow-hidden bg-surface",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "absolute -right-40 -top-40 h-96 w-96 rounded-full bg-accent/60 blur-3xl",
				"aria-hidden": true
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 51,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
					initial: {
						opacity: 0,
						y: 30
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .7,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Leaf, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 64,
								columnNumber: 15
							}, this), " Nutrición & Salud"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 63,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl",
							children: hero?.title ?? "Nutrición que transforma tu bienestar"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 66,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "max-w-lg text-lg text-muted-foreground",
							children: hero?.subtitle ?? "Acompañamiento profesional y cercano para que alcances tus objetivos con hábitos que perduran."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 69,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								asChild: true,
								size: "lg",
								className: "rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/reservar",
									children: ["Reservar turno ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "ml-1 h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 75,
										columnNumber: 34
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 74,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 73,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								asChild: true,
								size: "lg",
								variant: "secondary",
								className: "rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/servicios",
									children: "Ver servicios"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 79,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 78,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 72,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
					initial: {
						opacity: 0,
						scale: .95
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: {
						duration: .8,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "overflow-hidden rounded-[2.5rem] shadow-glow",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: hero?.image_url || "/assets/hero-melina-DQm2DBgz.jpg",
							alt: "Melina Oviedo, nutricionista",
							width: 1408,
							height: 1600,
							className: "h-full w-full object-cover"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 95,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 94,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 84,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 50,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
				className: "mx-auto mb-12 max-w-2xl text-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-3xl tracking-tight sm:text-4xl",
					children: "Un enfoque cercano y profesional"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 104,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 text-muted-foreground",
					children: "Todo lo que necesitás para mejorar tu relación con la comida."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 107,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 103,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: values.map((v, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: i * .08,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-transform hover:-translate-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(v.icon, { className: "h-6 w-6" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 115,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 114,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "mb-2 text-lg font-semibold",
								children: v.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 117,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground",
								children: v.text
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 118,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 15
					}, this)
				}, v.title, false, {
					fileName: _jsxFileName,
					lineNumber: 112,
					columnNumber: 33
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 111,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 102,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "overflow-hidden rounded-[2.5rem] shadow-card",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: about?.image_url || "/assets/about-melina-CYJHl7R1.jpg",
						alt: "Melina Oviedo - Nutrición",
						width: 1200,
						height: 1200,
						loading: "lazy",
						className: "h-full w-full object-cover"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 128,
					columnNumber: 13
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 127,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: .1,
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-3xl tracking-tight sm:text-4xl",
							children: about?.title ?? "Hola, soy Meli Oviedo"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-muted-foreground line-clamp-4 whitespace-pre-line",
							children: about?.body
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 136,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "secondary",
							className: "rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/sobre-mi",
								children: "Conocer mi historia"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 137,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 132,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 126,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 125,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
				className: "mx-auto mb-12 max-w-2xl text-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-3xl tracking-tight sm:text-4xl",
					children: "Servicios"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 147,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 text-muted-foreground",
					children: "Elegí el acompañamiento que mejor se adapta a vos."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 148,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 146,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: services.slice(0, 3).map((s, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: i * .08,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-xl font-semibold",
								children: s.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 155,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 flex-1 text-sm text-muted-foreground",
								children: s.description
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 156,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-5 flex items-center gap-3 text-sm text-muted-foreground",
								children: s.duration && /* @__PURE__ */ (void 0)("span", {
									className: "inline-flex items-center gap-1",
									children: [
										/* @__PURE__ */ (void 0)(Clock, { className: "h-4 w-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 159,
											columnNumber: 23
										}, this),
										" ",
										s.duration
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 158,
									columnNumber: 34
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-display text-2xl font-semibold text-primary",
									children: formatPrice(s.price)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 163,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									asChild: true,
									size: "sm",
									className: "rounded-full",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/reservar",
										children: "Reservar"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 167,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 166,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 162,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 154,
						columnNumber: 15
					}, this)
				}, s.id, false, {
					fileName: _jsxFileName,
					lineNumber: 153,
					columnNumber: 47
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 152,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 145,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "gradient-brand overflow-hidden rounded-[2.5rem] px-8 py-14 text-center shadow-glow",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-3xl text-primary-foreground sm:text-4xl",
						children: "Empecemos tu cambio hoy"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 179,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mx-auto mt-3 max-w-xl text-primary-foreground/90",
						children: "Reservá tu primera consulta y comencemos a construir hábitos saludables juntas."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 182,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						size: "lg",
						variant: "secondary",
						className: "mt-6 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/reservar",
							children: "Reservar turno"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 186,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 185,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 178,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 177,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 176,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 48,
		columnNumber: 10
	}, this);
}
//#endregion
export { Index as component };
