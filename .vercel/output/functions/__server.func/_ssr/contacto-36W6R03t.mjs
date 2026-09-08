import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { t as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { y as fetchContact } from "./router-D2ebo0ym.mjs";
import { T as Instagram, _ as MapPin, d as Phone, h as MessageCircle, v as Mail } from "../_libs/lucide-react.mjs";
import { f as buildWhatsappUrl, l as Input, t as Button, u as Label } from "./format-aQySvrb2.mjs";
import { t as Textarea } from "./textarea-Bi-OcA7V.mjs";
import { t as SiteLayout } from "./SiteLayout-BwNyWXL7.mjs";
import { t as Reveal } from "./Reveal-lH79kOIs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contacto-36W6R03t.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/contacto.tsx?tsr-split=component";
var schema = objectType({
	name: stringType().trim().min(1, "Ingresá tu nombre").max(80),
	email: stringType().trim().email("Correo inválido").max(255),
	message: stringType().trim().min(1, "Escribí tu mensaje").max(1e3)
});
function ContactPage() {
	const { data: contact } = useSuspenseQuery({
		queryKey: ["contact"],
		queryFn: fetchContact
	});
	const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: u(schema) });
	const onSubmit = (values) => {
		const message = `¡Hola Melina! Soy ${values.name} (${values.email}).\n\n${values.message}`;
		window.open(buildWhatsappUrl(message, contact?.whatsapp), "_blank", "noopener");
		toast.success("Abriendo WhatsApp con tu mensaje");
		reset();
	};
	const items = [
		{
			icon: MessageCircle,
			label: "WhatsApp",
			value: contact?.phone ?? "",
			href: buildWhatsappUrl("¡Holaa Melina! Vi tu sitio web y te quiero hacerte una consulta. Espero tu mensaje", contact?.whatsapp)
		},
		{
			icon: Mail,
			label: "Correo",
			value: contact?.email ?? "",
			href: `mailto:${contact?.email}`
		},
		{
			icon: Instagram,
			label: "Instagram",
			value: "@nutri_melioviedo",
			href: contact?.instagram ?? "#"
		},
		{
			icon: MapPin,
			label: "Ubicación",
			value: contact?.address ?? "",
			href: void 0
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
			className: "mx-auto mb-12 max-w-2xl text-center",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "font-display text-4xl tracking-tight sm:text-5xl",
				children: "Contacto"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 68,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-3 text-muted-foreground",
				children: "Escribime y coordinemos tu próximo paso."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 69,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 67,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-10 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
				className: "space-y-4",
				children: items.map((it) => {
					const content = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft transition-transform hover:-translate-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(it.icon, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 76,
								columnNumber: 21
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 75,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm font-medium",
							children: it.label
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 79,
							columnNumber: 21
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-muted-foreground",
							children: it.value
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 80,
							columnNumber: 21
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 78,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 29
					}, this);
					return it.href ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: it.href,
						target: "_blank",
						rel: "noopener noreferrer",
						children: content
					}, it.label, false, {
						fileName: _jsxFileName,
						lineNumber: 83,
						columnNumber: 30
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: content }, it.label, false, {
						fileName: _jsxFileName,
						lineNumber: 85,
						columnNumber: 24
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 72,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
				delay: .1,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: handleSubmit(onSubmit),
					className: "space-y-5 rounded-3xl border border-border bg-card p-7 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "name",
									children: "Nombre"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 92,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "name",
									className: "rounded-xl",
									...register("name")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 93,
									columnNumber: 17
								}, this),
								errors.name && /* @__PURE__ */ (void 0)("p", {
									className: "text-sm text-destructive",
									children: errors.name.message
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 94,
									columnNumber: 33
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 91,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "email",
									children: "Correo"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 97,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "email",
									type: "email",
									className: "rounded-xl",
									...register("email")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 98,
									columnNumber: 17
								}, this),
								errors.email && /* @__PURE__ */ (void 0)("p", {
									className: "text-sm text-destructive",
									children: errors.email.message
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 99,
									columnNumber: 34
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 96,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "message",
									children: "Mensaje"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 102,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									id: "message",
									rows: 5,
									className: "rounded-xl",
									...register("message")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 103,
									columnNumber: 17
								}, this),
								errors.message && /* @__PURE__ */ (void 0)("p", {
									className: "text-sm text-destructive",
									children: errors.message.message
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 104,
									columnNumber: 36
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 101,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "submit",
							size: "lg",
							className: "w-full rounded-full",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "mr-2 h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 17
							}, this), " Enviar por WhatsApp"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 106,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 90,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 89,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 71,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 66,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 65,
		columnNumber: 10
	}, this);
}
//#endregion
export { ContactPage as component };
