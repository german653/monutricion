import { o as __toESM } from "../_runtime.mjs";
import { n as useForm, r as require_react, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { g as fetchAvailableSlots, i as createAppointment, w as fetchServices } from "./router-D2ebo0ym.mjs";
import { x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { l as Input, t as Button, u as Label } from "./format-aQySvrb2.mjs";
import { t as Textarea } from "./textarea-Bi-OcA7V.mjs";
import { t as SiteLayout } from "./SiteLayout-BwNyWXL7.mjs";
import { t as Reveal } from "./Reveal-lH79kOIs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reservar-C8devaP0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/reservar.tsx?tsr-split=component";
var schema = objectType({
	first_name: stringType().trim().min(1, "Ingresá tu nombre").max(80),
	last_name: stringType().trim().min(1, "Ingresá tu apellido").max(80),
	email: stringType().trim().email("Correo inválido").max(255),
	phone: stringType().trim().min(6, "Teléfono inválido").max(30),
	service_id: stringType().min(1, "Elegí un servicio"),
	date: stringType().min(1, "Elegí una fecha"),
	time: stringType().min(1, "Elegí un horario"),
	notes: stringType().max(1e3).optional()
});
function formatDate(iso) {
	return (/* @__PURE__ */ new Date(`${iso}T00:00:00`)).toLocaleDateString("es-AR", {
		weekday: "long",
		day: "numeric",
		month: "long"
	});
}
function BookingPage() {
	const { data: services } = useSuspenseQuery({
		queryKey: ["services"],
		queryFn: fetchServices
	});
	const { data: slots } = useSuspenseQuery({
		queryKey: ["available-slots"],
		queryFn: fetchAvailableSlots
	});
	const navigate = useNavigate();
	const slotsByDate = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const s of slots) {
			if (!map.has(s.date)) map.set(s.date, []);
			map.get(s.date).push(s.time);
		}
		return map;
	}, [slots]);
	const dates = (0, import_react.useMemo)(() => Array.from(slotsByDate.keys()).sort(), [slotsByDate]);
	const [selectedDate, setSelectedDate] = (0, import_react.useState)("");
	const times = selectedDate ? slotsByDate.get(selectedDate) ?? [] : [];
	const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({ resolver: u(schema) });
	const onSubmit = async (values) => {
		try {
			const service = services.find((s) => s.id === values.service_id);
			await createAppointment({
				first_name: values.first_name,
				last_name: values.last_name,
				email: values.email,
				phone: values.phone,
				service_id: values.service_id,
				service_name: service?.title ?? null,
				date: values.date,
				time: values.time,
				notes: values.notes ?? null
			});
			toast.success("¡Tu turno fue reservado con éxito!");
			navigate({ to: "/reservar/confirmacion" });
		} catch {
			toast.error("No pudimos registrar tu turno. Intentá nuevamente.");
		}
	};
	const field = "rounded-xl";
	const selectClass = "flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm disabled:opacity-50";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-2xl px-4 py-16 sm:px-6 md:py-24 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
			className: "mb-10 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "font-display text-4xl tracking-tight sm:text-5xl",
				children: "Reservar turno"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 98,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-3 text-muted-foreground",
				children: "Completá el formulario y me pondré en contacto con vos."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 99,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 97,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: dates.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-3xl border border-border bg-card p-10 text-center shadow-soft",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-muted-foreground",
				children: "Por el momento no hay horarios disponibles. Volvé a intentarlo pronto o escribinos por WhatsApp."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 105,
				columnNumber: 15
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 104,
			columnNumber: 33
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			onSubmit: handleSubmit(onSubmit),
			className: "space-y-5 rounded-3xl border border-border bg-card p-7 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "first_name",
								children: "Nombre"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 112,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "first_name",
								className: field,
								...register("first_name")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 113,
								columnNumber: 19
							}, this),
							errors.first_name && /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-destructive",
								children: errors.first_name.message
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 114,
								columnNumber: 41
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 111,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "last_name",
								children: "Apellido"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 117,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "last_name",
								className: field,
								...register("last_name")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 118,
								columnNumber: 19
							}, this),
							errors.last_name && /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-destructive",
								children: errors.last_name.message
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 119,
								columnNumber: 40
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 116,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 110,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "email",
								children: "Correo"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 124,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "email",
								type: "email",
								className: field,
								...register("email")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 125,
								columnNumber: 19
							}, this),
							errors.email && /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-destructive",
								children: errors.email.message
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 36
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 123,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "phone",
								children: "Teléfono"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 129,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "phone",
								className: field,
								...register("phone")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 130,
								columnNumber: 19
							}, this),
							errors.phone && /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-destructive",
								children: errors.phone.message
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 131,
								columnNumber: 36
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 128,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 122,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							htmlFor: "service_id",
							children: "Servicio"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 135,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							id: "service_id",
							className: selectClass,
							defaultValue: "",
							...register("service_id"),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "",
								disabled: true,
								children: "Elegí un servicio"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 137,
								columnNumber: 19
							}, this), services.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: s.id,
								children: s.title
							}, s.id, false, {
								fileName: _jsxFileName,
								lineNumber: 140,
								columnNumber: 38
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 136,
							columnNumber: 17
						}, this),
						errors.service_id && /* @__PURE__ */ (void 0)("p", {
							className: "text-sm text-destructive",
							children: errors.service_id.message
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 144,
							columnNumber: 39
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 134,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "date",
								children: "Día disponible"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
								id: "date",
								className: selectClass,
								defaultValue: "",
								...register("date", { onChange: (e) => {
									setSelectedDate(e.target.value);
									setValue("time", "");
								} }),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "",
									disabled: true,
									children: "Elegí un día"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 155,
									columnNumber: 21
								}, this), dates.map((d) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: d,
									className: "capitalize",
									children: formatDate(d)
								}, d, false, {
									fileName: _jsxFileName,
									lineNumber: 158,
									columnNumber: 37
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 19
							}, this),
							errors.date && /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-destructive",
								children: errors.date.message
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 162,
								columnNumber: 35
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "time",
								children: "Horario"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 165,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
								id: "time",
								className: selectClass,
								defaultValue: "",
								disabled: !selectedDate,
								...register("time"),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "",
									disabled: true,
									children: selectedDate ? "Elegí un horario" : "Elegí un día primero"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 167,
									columnNumber: 21
								}, this), times.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: t,
									children: t
								}, t, false, {
									fileName: _jsxFileName,
									lineNumber: 170,
									columnNumber: 37
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 166,
								columnNumber: 19
							}, this),
							errors.time && /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-destructive",
								children: errors.time.message
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 174,
								columnNumber: 35
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 164,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 146,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						htmlFor: "notes",
						children: "Observaciones"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 178,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
						id: "notes",
						className: "rounded-xl",
						rows: 3,
						...register("notes")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 179,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 177,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "submit",
					size: "lg",
					className: "w-full rounded-full",
					disabled: isSubmitting,
					children: [isSubmitting && /* @__PURE__ */ (void 0)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 182,
						columnNumber: 34
					}, this), "Confirmar turno"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 181,
					columnNumber: 15
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 109,
			columnNumber: 22
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 103,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 96,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 95,
		columnNumber: 10
	}, this);
}
//#endregion
export { BookingPage as component };
