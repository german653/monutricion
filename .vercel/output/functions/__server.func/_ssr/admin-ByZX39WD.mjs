import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { D as upsertProduct, E as updateAppointmentStatus, O as upsertRecipe, T as saveContent, _ as fetchBranding, a as deleteAppointment, c as deleteRecipe, d as fetchAllProducts, f as fetchAllRecipes, h as fetchAvailability, k as upsertService, l as deleteService, m as fetchAppointments, n as DEFAULT_FOOTER_WHATSAPP_MESSAGE, o as deleteAvailabilitySlot, p as fetchAllServices, r as addAvailabilitySlots, s as deleteProduct, u as fetchAbout, v as fetchCategories, x as fetchHero, y as fetchContact } from "./router-D2ebo0ym.mjs";
import { C as LayoutTemplate, E as ImagePlus, N as CalendarClock, P as CalendarCheck, b as Lock, f as Pencil, h as MessageCircle, i as Trash2, k as Cloud, l as Salad, n as UtensilsCrossed, o as Sparkles, p as Package, t as X, u as Plus, x as LoaderCircle, y as LogOut } from "../_libs/lucide-react.mjs";
import { a as DialogFooter, c as DialogTrigger, d as Logo, f as buildWhatsappUrl, g as useAdmin, h as logo_mo_png_asset_default, l as Input, m as formatPrice, n as Dialog, o as DialogHeader, p as cn, r as DialogContent, s as DialogTitle, t as Button, u as Label } from "./format-aQySvrb2.mjs";
import { t as Badge } from "./badge-BYuHvcVJ.mjs";
import { t as Textarea } from "./textarea-Bi-OcA7V.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-ByZX39WD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$8 = "/app/applet/src/components/ui/tabs.tsx";
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$8,
	lineNumber: 12,
	columnNumber: 3
}, void 0));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$8,
	lineNumber: 27,
	columnNumber: 3
}, void 0));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$8,
	lineNumber: 42,
	columnNumber: 3
}, void 0));
TabsContent.displayName = Content.displayName;
var _jsxFileName$7 = "/app/applet/src/components/ui/switch.tsx";
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") }, void 0, false, {
		fileName: _jsxFileName$7,
		lineNumber: 18,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 10,
	columnNumber: 3
}, void 0));
Switch.displayName = Switch$1.displayName;
async function uploadToCloudinary(file) {
	const cloudName = "zet49npi";
	const uploadPreset = "nutricionpreset";
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", uploadPreset);
	const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
		method: "POST",
		body: formData
	});
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData?.error?.message || "Error al subir la imagen a Cloudinary");
	}
	return (await response.json()).secure_url;
}
var _jsxFileName$6 = "/app/applet/src/components/admin/ImageUpload.tsx";
function ImageUpload({ value, onChange, label = "Imagen" }) {
	const inputRef = (0, import_react.useRef)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const isCloudinaryUrl = value?.includes("cloudinary.com");
	const pick = async (file) => {
		if (!file.type.startsWith("image/")) {
			toast.error("El archivo debe ser una imagen");
			return;
		}
		if (file.size > 10485760) {
			toast.error("La imagen no puede superar 10 MB");
			return;
		}
		setUploading(true);
		try {
			const url = await uploadToCloudinary(file);
			onChange(url);
			if (url.includes("cloudinary.com")) toast.success("Imagen subida a Cloudinary con éxito");
			else toast.success("Imagen cargada correctamente");
		} catch (err) {
			const message = err instanceof Error ? err.message : "No se pudo subir la imagen";
			toast.error(message);
		} finally {
			setUploading(false);
			if (inputRef.current) inputRef.current.value = "";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: label }, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 52,
					columnNumber: 9
				}, this), isCloudinaryUrl && /* @__PURE__ */ (void 0)("span", {
					className: "inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400",
					children: [/* @__PURE__ */ (void 0)(Cloud, { className: "h-3 w-3" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 55,
						columnNumber: 13
					}, this), " Cloudinary"]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 54,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 51,
				columnNumber: 7
			}, this),
			value ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative w-full overflow-hidden rounded-2xl border border-border",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: value,
					alt: "Vista previa",
					className: "h-40 w-full object-cover"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 62,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "button",
					variant: "secondary",
					size: "icon",
					className: "absolute right-2 top-2 rounded-full",
					onClick: () => onChange(null),
					"aria-label": "Quitar imagen",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 71,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 63,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 61,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => inputRef.current?.click(),
				disabled: uploading,
				className: "flex h-32 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-surface text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary",
				children: uploading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-5 w-5 animate-spin" }, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 82,
					columnNumber: 13
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ImagePlus, { className: "h-5 w-5" }, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 85,
					columnNumber: 15
				}, this), "Subir imagen (Cloudinary / Dispositivo)"] }, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 84,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 75,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
				ref: inputRef,
				type: "file",
				accept: "image/*",
				className: "hidden",
				onChange: (e) => {
					const file = e.target.files?.[0];
					if (file) pick(file);
				}
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 92,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
				value: value ?? "",
				onChange: (e) => onChange(e.target.value || null),
				placeholder: "…o pegá una URL de Cloudinary / externa"
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 103,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 50,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/admin/ServiceManager.tsx";
var empty$2 = {
	title: "",
	description: "",
	duration: "",
	price: 0,
	image_url: "",
	sort_order: 0,
	is_active: true
};
function ServiceManager() {
	const queryClient = useQueryClient();
	const { data: services = [] } = useQuery({
		queryKey: ["all-services"],
		queryFn: fetchAllServices
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(empty$2);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const refresh = () => Promise.all([queryClient.invalidateQueries({ queryKey: ["all-services"] }), queryClient.invalidateQueries({ queryKey: ["services"] })]);
	const openNew = () => {
		setDraft(empty$2);
		setOpen(true);
	};
	const openEdit = (s) => {
		setDraft(s);
		setOpen(true);
	};
	const save = async () => {
		if (!draft.title?.trim()) {
			toast.error("El título es obligatorio");
			return;
		}
		setSaving(true);
		try {
			await upsertService({
				...draft,
				price: Number(draft.price) || 0,
				sort_order: Number(draft.sort_order) || 0
			});
			await refresh();
			toast.success("Servicio guardado");
			setOpen(false);
		} catch {
			toast.error("No se pudo guardar");
		} finally {
			setSaving(false);
		}
	};
	const remove = async (id) => {
		if (!confirm("¿Eliminar este servicio?")) return;
		try {
			await deleteService(id);
			await refresh();
			toast.success("Servicio eliminado");
		} catch {
			toast.error("No se pudo eliminar");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-xl",
					children: "Servicios"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 94,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					className: "rounded-full",
					onClick: openNew,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "mr-1 h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 96,
						columnNumber: 11
					}, this), " Nuevo"]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 95,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 93,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-2",
				children: [services.length === 0 && /* @__PURE__ */ (void 0)("p", {
					className: "py-6 text-center text-sm text-muted-foreground",
					children: "Aún no hay servicios."
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 101,
					columnNumber: 11
				}, this), services.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between gap-3 rounded-2xl border border-border px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex min-w-0 items-center gap-3",
						children: [s.image_url && /* @__PURE__ */ (void 0)("img", {
							src: s.image_url,
							alt: "",
							className: "h-10 w-10 shrink-0 rounded-xl object-cover"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 110,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "truncate text-sm font-medium",
								children: [s.title, !s.is_active && /* @__PURE__ */ (void 0)("span", {
									className: "ml-2 text-xs text-muted-foreground",
									children: "(oculto)"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 120,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 117,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									formatPrice(s.price),
									" · ",
									s.duration || "—"
								]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 123,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 116,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 108,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex shrink-0 items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "icon",
							className: "rounded-full",
							onClick: () => openEdit(s),
							"aria-label": "Editar",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pencil, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 136,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 129,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "icon",
							className: "rounded-full text-muted-foreground hover:text-destructive",
							onClick: () => remove(s.id),
							"aria-label": "Eliminar",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 145,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 138,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 128,
						columnNumber: 13
					}, this)]
				}, s.id, true, {
					fileName: _jsxFileName$5,
					lineNumber: 104,
					columnNumber: 11
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 99,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 154,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 153,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "max-h-[90dvh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: draft.id ? "Editar servicio" : "Nuevo servicio" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 158,
							columnNumber: 13
						}, this) }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 157,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Título" }, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 162,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: draft.title ?? "",
										onChange: (e) => setDraft({
											...draft,
											title: e.target.value
										})
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 163,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 161,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Descripción" }, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 169,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
										rows: 3,
										value: draft.description ?? "",
										onChange: (e) => setDraft({
											...draft,
											description: e.target.value
										})
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 170,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 168,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Precio" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 178,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											type: "number",
											value: draft.price ?? 0,
											onChange: (e) => setDraft({
												...draft,
												price: Number(e.target.value)
											})
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 179,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 177,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Duración" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 186,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											value: draft.duration ?? "",
											onChange: (e) => setDraft({
												...draft,
												duration: e.target.value
											}),
											placeholder: "60 min"
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 187,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 185,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 176,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Orden" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 196,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											type: "number",
											value: draft.sort_order ?? 0,
											onChange: (e) => setDraft({
												...draft,
												sort_order: Number(e.target.value)
											})
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 197,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 195,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2 pt-8",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
											checked: draft.is_active ?? true,
											onCheckedChange: (v) => setDraft({
												...draft,
												is_active: v
											})
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 204,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Visible" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 208,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 203,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 194,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ImageUpload, {
									value: draft.image_url,
									onChange: (url) => setDraft({
										...draft,
										image_url: url
									}),
									folder: "servicios",
									label: "Imagen del servicio"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 211,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 160,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "secondary",
							className: "rounded-full",
							onClick: () => setOpen(false),
							children: "Cancelar"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 219,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							className: "rounded-full",
							onClick: save,
							disabled: saving,
							children: [saving && /* @__PURE__ */ (void 0)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 223,
								columnNumber: 26
							}, this), " Guardar"]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 222,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 218,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 156,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 152,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 92,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/admin/ProductManager.tsx";
var empty$1 = {
	name: "",
	description: "",
	price: 0,
	stock: 0,
	image_url: "",
	category_id: null,
	is_active: true
};
function ProductManager() {
	const queryClient = useQueryClient();
	const { data: products = [] } = useQuery({
		queryKey: ["all-products"],
		queryFn: fetchAllProducts
	});
	const { data: categories = [] } = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(empty$1);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const refresh = () => Promise.all([queryClient.invalidateQueries({ queryKey: ["all-products"] }), queryClient.invalidateQueries({ queryKey: ["products"] })]);
	const openNew = () => {
		setDraft(empty$1);
		setOpen(true);
	};
	const openEdit = (p) => {
		setDraft(p);
		setOpen(true);
	};
	const save = async () => {
		if (!draft.name?.trim()) {
			toast.error("El nombre es obligatorio");
			return;
		}
		setSaving(true);
		try {
			await upsertProduct({
				...draft,
				price: Number(draft.price) || 0,
				stock: Number(draft.stock) || 0,
				category_id: draft.category_id || null
			});
			await refresh();
			toast.success("Producto guardado");
			setOpen(false);
		} catch {
			toast.error("No se pudo guardar");
		} finally {
			setSaving(false);
		}
	};
	const remove = async (id) => {
		if (!confirm("¿Eliminar este producto?")) return;
		try {
			await deleteProduct(id);
			await refresh();
			toast.success("Producto eliminado");
		} catch {
			toast.error("No se pudo eliminar");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-xl",
					children: "Productos"
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 98,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					className: "rounded-full",
					onClick: openNew,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "mr-1 h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 100,
						columnNumber: 11
					}, this), " Nuevo"]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 99,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 97,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-2",
				children: [products.length === 0 && /* @__PURE__ */ (void 0)("p", {
					className: "py-6 text-center text-sm text-muted-foreground",
					children: "Aún no hay productos."
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 105,
					columnNumber: 11
				}, this), products.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between gap-3 rounded-2xl border border-border px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex min-w-0 items-center gap-3",
						children: [p.image_url && /* @__PURE__ */ (void 0)("img", {
							src: p.image_url,
							alt: "",
							className: "h-10 w-10 shrink-0 rounded-xl object-cover"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 114,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "truncate text-sm font-medium",
								children: [p.name, !p.is_active && /* @__PURE__ */ (void 0)("span", {
									className: "ml-2 text-xs text-muted-foreground",
									children: "(oculto)"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 124,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 121,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									formatPrice(p.price),
									" · Stock: ",
									p.stock
								]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 127,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 120,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 112,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex shrink-0 items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "icon",
							className: "rounded-full",
							onClick: () => openEdit(p),
							"aria-label": "Editar",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pencil, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 140,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 133,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "icon",
							className: "rounded-full text-muted-foreground hover:text-destructive",
							onClick: () => remove(p.id),
							"aria-label": "Eliminar",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 149,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 142,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 132,
						columnNumber: 13
					}, this)]
				}, p.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 108,
					columnNumber: 11
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 103,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "max-h-[90dvh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: draft.id ? "Editar producto" : "Nuevo producto" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 159,
							columnNumber: 13
						}, this) }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 158,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Nombre" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 163,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: draft.name ?? "",
										onChange: (e) => setDraft({
											...draft,
											name: e.target.value
										})
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 164,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 162,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Descripción" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 170,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
										rows: 3,
										value: draft.description ?? "",
										onChange: (e) => setDraft({
											...draft,
											description: e.target.value
										})
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 171,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 169,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Precio" }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 179,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											type: "number",
											value: draft.price ?? 0,
											onChange: (e) => setDraft({
												...draft,
												price: Number(e.target.value)
											})
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 180,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 178,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Stock" }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 187,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											type: "number",
											value: draft.stock ?? 0,
											onChange: (e) => setDraft({
												...draft,
												stock: Number(e.target.value)
											})
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 188,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 186,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 177,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Categoría" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 196,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
										className: "flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm",
										value: draft.category_id ?? "",
										onChange: (e) => setDraft({
											...draft,
											category_id: e.target.value || null
										}),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "",
											children: "Sin categoría"
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 202,
											columnNumber: 17
										}, this), categories.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: c.id,
											children: c.name
										}, c.id, false, {
											fileName: _jsxFileName$4,
											lineNumber: 204,
											columnNumber: 19
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 197,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 195,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ImageUpload, {
									value: draft.image_url,
									onChange: (url) => setDraft({
										...draft,
										image_url: url
									}),
									folder: "productos",
									label: "Imagen del producto"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 210,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
										checked: draft.is_active ?? true,
										onCheckedChange: (v) => setDraft({
											...draft,
											is_active: v
										})
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 217,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Visible en la tienda" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 221,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 216,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 161,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "secondary",
							className: "rounded-full",
							onClick: () => setOpen(false),
							children: "Cancelar"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 225,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							className: "rounded-full",
							onClick: save,
							disabled: saving,
							children: [saving && /* @__PURE__ */ (void 0)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 229,
								columnNumber: 26
							}, this), " Guardar"]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 228,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 224,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 157,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 156,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 96,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/admin/RecipeManager.tsx";
var empty = {
	title: "",
	description: "",
	image_url: "",
	category: "",
	prep_time: "",
	servings: "",
	ingredients: "",
	steps: "",
	sort_order: 0,
	is_published: true
};
function RecipeManager() {
	const queryClient = useQueryClient();
	const { data: recipes = [] } = useQuery({
		queryKey: ["all-recipes"],
		queryFn: fetchAllRecipes
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(empty);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const refresh = () => Promise.all([queryClient.invalidateQueries({ queryKey: ["all-recipes"] }), queryClient.invalidateQueries({ queryKey: ["recipes"] })]);
	const save = async () => {
		if (!draft.title?.trim()) {
			toast.error("El título es obligatorio");
			return;
		}
		setSaving(true);
		try {
			await upsertRecipe({
				...draft,
				sort_order: Number(draft.sort_order) || 0
			});
			await refresh();
			toast.success("Receta guardada");
			setOpen(false);
		} catch {
			toast.error("No se pudo guardar");
		} finally {
			setSaving(false);
		}
	};
	const remove = async (id) => {
		if (!confirm("¿Eliminar esta receta?")) return;
		try {
			await deleteRecipe(id);
			await refresh();
			toast.success("Receta eliminada");
		} catch {
			toast.error("No se pudo eliminar");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-xl",
					children: "Recetas y material"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 79,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					className: "rounded-full",
					onClick: () => {
						setDraft(empty);
						setOpen(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "mr-1 h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 88,
						columnNumber: 11
					}, this), " Nueva"]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 80,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 78,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-2",
				children: [recipes.length === 0 && /* @__PURE__ */ (void 0)("p", {
					className: "py-6 text-center text-sm text-muted-foreground",
					children: "Aún no hay recetas. Subí la primera con su imagen."
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 94,
					columnNumber: 11
				}, this), recipes.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between gap-3 rounded-2xl border border-border px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex min-w-0 items-center gap-3",
						children: [r.image_url && /* @__PURE__ */ (void 0)("img", {
							src: r.image_url,
							alt: "",
							className: "h-10 w-10 shrink-0 rounded-xl object-cover"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 105,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "truncate text-sm font-medium",
								children: [r.title, !r.is_published && /* @__PURE__ */ (void 0)("span", {
									className: "ml-2 text-xs text-muted-foreground",
									children: "(oculta)"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 115,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 112,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									r.category,
									r.prep_time,
									r.servings
								].filter(Boolean).join(" · ") || "Sin datos"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 118,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 111,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 103,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex shrink-0 items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "icon",
							className: "rounded-full",
							onClick: () => {
								setDraft(r);
								setOpen(true);
							},
							"aria-label": "Editar",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pencil, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 134,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 124,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "icon",
							className: "rounded-full text-muted-foreground hover:text-destructive",
							onClick: () => remove(r.id),
							"aria-label": "Eliminar",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 143,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 136,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 123,
						columnNumber: 13
					}, this)]
				}, r.id, true, {
					fileName: _jsxFileName$3,
					lineNumber: 99,
					columnNumber: 11
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 92,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "max-h-[90dvh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: draft.id ? "Editar receta" : "Nueva receta" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 153,
							columnNumber: 13
						}, this) }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 152,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Título" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 157,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: draft.title ?? "",
										onChange: (e) => setDraft({
											...draft,
											title: e.target.value
										})
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 158,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 156,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Descripción corta" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 164,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
										rows: 2,
										value: draft.description ?? "",
										onChange: (e) => setDraft({
											...draft,
											description: e.target.value
										})
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 165,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 163,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ImageUpload, {
									value: draft.image_url,
									onChange: (url) => setDraft({
										...draft,
										image_url: url
									}),
									folder: "recetas",
									label: "Imagen de la receta o infografía"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 171,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid grid-cols-3 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Categoría" }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 179,
												columnNumber: 17
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
												value: draft.category ?? "",
												onChange: (e) => setDraft({
													...draft,
													category: e.target.value
												}),
												placeholder: "Desayuno"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 180,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 178,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Tiempo" }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 187,
												columnNumber: 17
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
												value: draft.prep_time ?? "",
												onChange: (e) => setDraft({
													...draft,
													prep_time: e.target.value
												}),
												placeholder: "20 min"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 188,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 186,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Porciones" }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 195,
												columnNumber: 17
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
												value: draft.servings ?? "",
												onChange: (e) => setDraft({
													...draft,
													servings: e.target.value
												}),
												placeholder: "2"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 196,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 194,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 177,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Ingredientes (uno por línea)" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 204,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
										rows: 5,
										value: draft.ingredients ?? "",
										onChange: (e) => setDraft({
											...draft,
											ingredients: e.target.value
										})
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 205,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 203,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Preparación (un paso por línea)" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 212,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
										rows: 5,
										value: draft.steps ?? "",
										onChange: (e) => setDraft({
											...draft,
											steps: e.target.value
										})
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 213,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 211,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid grid-cols-2 items-end gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Orden" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 221,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											type: "number",
											value: draft.sort_order ?? 0,
											onChange: (e) => setDraft({
												...draft,
												sort_order: Number(e.target.value)
											})
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 222,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 220,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2 pb-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
											checked: draft.is_published ?? true,
											onCheckedChange: (v) => setDraft({
												...draft,
												is_published: v
											})
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 229,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Visible en la web" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 233,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 228,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 219,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 155,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "secondary",
							className: "rounded-full",
							onClick: () => setOpen(false),
							children: "Cancelar"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 238,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							className: "rounded-full",
							onClick: save,
							disabled: saving,
							children: [saving && /* @__PURE__ */ (void 0)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 242,
								columnNumber: 26
							}, this), " Guardar"]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 241,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 237,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 151,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 150,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 77,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/admin/ContentManager.tsx";
var DEFAULT_ABOUT_BODY = `Soy Licenciada en Nutrición, egresada de la Facultad de Nutrición de la Universidad Nacional de Córdoba, matrícula profesional 5433.

Me apasiona acompañar a las personas en el camino hacia su mejor versión, ayudándolas a alcanzar sus objetivos, construir hábitos saludables y, sobre todo, a confiar en que pueden lograr mucho más de lo que imaginan.

Creo que la nutrición es una herramienta fundamental para cuidar nuestra salud, sentirnos mejor y potenciar nuestro bienestar en todos los aspectos de nuestra vida.

Trabajo con diferentes patologías y objetivos nutricionales, y tengo una especial pasión por la nutrición deportiva. Además, soy runner y cuento con certificación ISAK nivel I y II, porque considero que conocer y entender nuestro cuerpo es parte fundamental del proceso.

Quiero acompañarte desde un lugar de educación, motivación y empatía, brindándote herramientas para que puedas aprender a alimentarte, disfrutar del proceso y alcanzar tus objetivos de una manera sostenible.

Porque no se trata de buscar la perfección, sino de aprender, avanzar y crecer en el camino. 

¿Empezamos juntos?`;
function ContentManager() {
	const queryClient = useQueryClient();
	const { data: brandingData, isLoading: loadingBranding } = useQuery({
		queryKey: ["branding"],
		queryFn: fetchBranding
	});
	const { data: heroData, isLoading: loadingHero } = useQuery({
		queryKey: ["hero"],
		queryFn: fetchHero
	});
	const { data: aboutData, isLoading: loadingAbout } = useQuery({
		queryKey: ["about"],
		queryFn: fetchAbout
	});
	const { data: contactData, isLoading: loadingContact } = useQuery({
		queryKey: ["contact"],
		queryFn: fetchContact
	});
	const [brandingDraft, setBrandingDraft] = (0, import_react.useState)({
		logo_url: "",
		favicon_url: "",
		brand_name: "Melina Oviedo",
		tagline: "Nutrición y Salud"
	});
	const [heroDraft, setHeroDraft] = (0, import_react.useState)({
		title: "",
		subtitle: "",
		image_url: ""
	});
	const [aboutDraft, setAboutDraft] = (0, import_react.useState)({
		title: "Hola, soy Meli Oviedo",
		body: DEFAULT_ABOUT_BODY,
		experience: "Lic. en Nutrición (UNC) • M.P. 5433",
		specialties: "Nutrición deportiva • ISAK I y II • Hábitos sostenibles",
		image_url: ""
	});
	const [contactDraft, setContactDraft] = (0, import_react.useState)({
		email: "nutricion.melinaoviedo@gmail.com",
		phone: "+54 9 3541 63-9512",
		whatsapp: "5493541639512",
		instagram: "https://www.instagram.com/nutri_melioviedo/?hl=es-la",
		address: "Córdoba, Argentina (Presencial & Online)",
		footer_whatsapp_message: DEFAULT_FOOTER_WHATSAPP_MESSAGE
	});
	const [savingBranding, setSavingBranding] = (0, import_react.useState)(false);
	const [savingHero, setSavingHero] = (0, import_react.useState)(false);
	const [savingAbout, setSavingAbout] = (0, import_react.useState)(false);
	const [savingContact, setSavingContact] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (brandingData) setBrandingDraft({
			logo_url: brandingData.logo_url ?? "",
			favicon_url: brandingData.favicon_url ?? "",
			brand_name: brandingData.brand_name ?? "Melina Oviedo",
			tagline: brandingData.tagline ?? "Nutrición y Salud"
		});
	}, [brandingData]);
	(0, import_react.useEffect)(() => {
		if (heroData) setHeroDraft({
			title: heroData.title ?? "",
			subtitle: heroData.subtitle ?? "",
			image_url: heroData.image_url ?? ""
		});
	}, [heroData]);
	(0, import_react.useEffect)(() => {
		if (aboutData) setAboutDraft({
			title: aboutData.title ?? "Hola, soy Meli Oviedo",
			body: aboutData.body ?? DEFAULT_ABOUT_BODY,
			experience: aboutData.experience ?? "Lic. en Nutrición (UNC) • M.P. 5433",
			specialties: aboutData.specialties ?? "Nutrición deportiva • ISAK I y II • Hábitos sostenibles",
			image_url: aboutData.image_url ?? ""
		});
	}, [aboutData]);
	(0, import_react.useEffect)(() => {
		if (contactData) setContactDraft({
			email: contactData.email ?? "nutricion.melinaoviedo@gmail.com",
			phone: contactData.phone ?? "+54 9 3541 63-9512",
			whatsapp: contactData.whatsapp ?? "5493541639512",
			instagram: contactData.instagram ?? "https://www.instagram.com/nutri_melioviedo/?hl=es-la",
			address: contactData.address ?? "Córdoba, Argentina (Presencial & Online)",
			footer_whatsapp_message: contactData.footer_whatsapp_message ?? "¡Holaa Melina! Vi tu sitio web y te quiero hacerte una consulta. Espero tu mensaje"
		});
	}, [contactData]);
	const saveBranding = async () => {
		setSavingBranding(true);
		try {
			await saveContent("branding", brandingDraft);
			await queryClient.invalidateQueries({ queryKey: ["branding"] });
			toast.success("Logo e identidad de la web actualizados");
		} catch {
			toast.error("No se pudo guardar la identidad de marca");
		} finally {
			setSavingBranding(false);
		}
	};
	const saveHero = async () => {
		setSavingHero(true);
		try {
			await saveContent("hero", heroDraft);
			await queryClient.invalidateQueries({ queryKey: ["hero"] });
			toast.success("Contenido del Inicio actualizado");
		} catch {
			toast.error("No se pudo guardar el inicio");
		} finally {
			setSavingHero(false);
		}
	};
	const saveAbout = async () => {
		setSavingAbout(true);
		try {
			await saveContent("about", aboutDraft);
			await queryClient.invalidateQueries({ queryKey: ["about"] });
			toast.success("Contenido de Sobre Mí actualizado");
		} catch {
			toast.error("No se pudo guardar Sobre Mí");
		} finally {
			setSavingAbout(false);
		}
	};
	const saveFooterWhatsapp = async () => {
		setSavingContact(true);
		try {
			await saveContent("contact", contactDraft);
			await queryClient.invalidateQueries({ queryKey: ["contact"] });
			toast.success("Mensaje de WhatsApp del footer actualizado");
		} catch {
			toast.error("No se pudo guardar el mensaje de WhatsApp");
		} finally {
			setSavingContact(false);
		}
	};
	if (loadingBranding || loadingHero || loadingAbout || loadingContact) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex justify-center p-12",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 194,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 193,
		columnNumber: 7
	}, this);
	const currentPreviewLogo = brandingDraft.logo_url || logo_mo_png_asset_default.url;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-3xl border border-border bg-card p-6 shadow-soft space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-xl font-semibold",
							children: "Identidad y Logo de la Web"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 207,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-muted-foreground",
							children: "Subí el logo oficial de la web que se mostrará en la barra de navegación y pie de página."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 208,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 206,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							className: "rounded-full",
							onClick: saveBranding,
							disabled: savingBranding,
							children: [savingBranding && /* @__PURE__ */ (void 0)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 214,
								columnNumber: 32
							}, this), " Guardar Logo e Identidad"]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 213,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 205,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "lg:col-span-1",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ImageUpload, {
									value: brandingDraft.logo_url,
									onChange: (url) => setBrandingDraft({
										...brandingDraft,
										logo_url: url || ""
									}),
									folder: "branding",
									label: "Archivo del Logo (PNG, JPG, SVG o WebP)"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 221,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 220,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-4 lg:col-span-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Nombre de la marca" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 231,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: brandingDraft.brand_name ?? "",
										onChange: (e) => setBrandingDraft({
											...brandingDraft,
											brand_name: e.target.value
										}),
										placeholder: "Melina Oviedo"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 232,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 230,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Subtítulo o lema" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 239,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: brandingDraft.tagline ?? "",
										onChange: (e) => setBrandingDraft({
											...brandingDraft,
											tagline: e.target.value
										}),
										placeholder: "Nutrición y Salud"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 240,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 238,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 229,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-border bg-surface p-4 space-y-3 lg:col-span-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold",
										children: "Vista previa en tiempo real"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 249,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-3 p-3 rounded-xl bg-background border border-border/70 shadow-xs",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
											src: currentPreviewLogo,
											alt: "Vista previa del logo",
											className: "h-12 w-12 rounded-full object-cover shadow-soft"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 253,
											columnNumber: 15
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-display text-base font-semibold leading-tight",
												children: brandingDraft.brand_name || "Melina Oviedo"
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 259,
												columnNumber: 17
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground",
												children: brandingDraft.tagline || "Nutrición y Salud"
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 262,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 258,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 252,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground",
										children: "Este logo se refleja automáticamente en la cabecera (Navbar), el menú móvil y el pie de página."
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 267,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 248,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 219,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border-t border-border/60 pt-5 mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-display text-base font-semibold",
								children: "Favicon (Icono de la pestaña del navegador)"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 277,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground",
								children: "Personalizá el icono miniatura que verán tus pacientes y visitantes en la pestaña de su navegador o marcadores."
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 280,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 276,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "lg:col-span-1",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ImageUpload, {
									value: brandingDraft.favicon_url ?? "",
									onChange: (url) => setBrandingDraft({
										...brandingDraft,
										favicon_url: url || ""
									}),
									folder: "branding",
									label: "Archivo del Favicon (PNG, SVG, ICO o JPG)"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 288,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 287,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-border bg-surface p-4 space-y-3 lg:col-span-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold",
										children: "Simulación de la pestaña en el navegador"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 297,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "rounded-xl border border-border/80 bg-muted/40 p-3",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-background border border-border shadow-xs max-w-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
													src: brandingDraft.favicon_url || "/favicon.svg",
													alt: "Favicon preview",
													className: "h-4 w-4 rounded-sm object-contain"
												}, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 302,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-xs font-medium truncate text-foreground",
													children: [
														brandingDraft.brand_name || "Melina Oviedo",
														" —",
														" ",
														brandingDraft.tagline || "Nutrición y Salud"
													]
												}, void 0, true, {
													fileName: _jsxFileName$2,
													lineNumber: 307,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-muted-foreground text-xs ml-auto",
													children: "✕"
												}, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 311,
													columnNumber: 19
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 301,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 300,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground",
										children: "Si no subís uno personalizado, la web utiliza automáticamente el icono botánico verde oliva oficial de MO Nutrición."
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 314,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 296,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 286,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 275,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 204,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-3xl border border-border bg-card p-6 shadow-soft space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 328,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 327,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-xl font-semibold",
							children: "Mensaje de WhatsApp del Footer"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 331,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-muted-foreground",
							children: "Configurá el texto predeterminado que se enviará al pulsar el botón de WhatsApp ubicado únicamente en el pie de página."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 332,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 330,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 326,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						className: "rounded-full bg-emerald-600 text-white hover:bg-emerald-700",
						onClick: saveFooterWhatsapp,
						disabled: savingContact,
						children: [savingContact && /* @__PURE__ */ (void 0)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 343,
							columnNumber: 31
						}, this), " Guardar Mensaje del Footer"]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 338,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 325,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-6 lg:grid-cols-2 items-start",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "footer-wa-msg",
										className: "font-medium",
										children: "Mensaje predeterminado de WhatsApp"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 352,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setContactDraft((prev) => ({
											...prev,
											footer_whatsapp_message: DEFAULT_FOOTER_WHATSAPP_MESSAGE
										})),
										className: "text-xs text-primary hover:underline flex items-center gap-1 font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-3 w-3" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 365,
											columnNumber: 19
										}, this), " Restaurar original"]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 355,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 351,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									id: "footer-wa-msg",
									rows: 4,
									value: contactDraft.footer_whatsapp_message ?? "",
									onChange: (e) => setContactDraft((prev) => ({
										...prev,
										footer_whatsapp_message: e.target.value
									})),
									placeholder: "¡Holaa Melina! Vi tu sitio web y te quiero hacerte una consulta. Espero tu mensaje",
									className: "text-sm leading-relaxed"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 368,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground",
									children: "Tu cliente verá este texto ya escrito al presionar el botón de WhatsApp del footer. Podés usar emojis y saltos de línea."
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 381,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 350,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "wa-phone",
									children: "Número de WhatsApp (con código de país sin +)"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 388,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "wa-phone",
									value: contactDraft.whatsapp ?? "",
									onChange: (e) => setContactDraft((prev) => ({
										...prev,
										whatsapp: e.target.value
									})),
									placeholder: "5493541639512"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 389,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground",
									children: "Ejemplo: 5493541639512 (54 = Argentina, 9 = Móvil, 3541... = Número)."
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 400,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 387,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 349,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border bg-surface p-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold",
									children: "Vista previa del mensaje"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 409,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[0.7rem] rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-medium text-emerald-600 dark:text-emerald-400",
									children: "Botón del Footer"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 412,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 408,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl bg-emerald-500/5 p-4 border border-emerald-500/20 space-y-3",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "h-4 w-4" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 420,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 419,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex-1 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-xs font-semibold text-emerald-800 dark:text-emerald-300",
												children: "Mensaje recibido en tu WhatsApp"
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 424,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[0.65rem] text-muted-foreground",
												children: "Ahora"
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 427,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 423,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "rounded-xl rounded-tl-none bg-background p-3 text-sm text-foreground shadow-xs border border-border/60 whitespace-pre-wrap break-words",
											children: contactDraft.footer_whatsapp_message?.trim() || /* @__PURE__ */ (void 0)("span", {
												className: "italic text-muted-foreground",
												children: "(Sin texto predeterminado)"
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 431,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 429,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 422,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 418,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 417,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-center justify-between gap-2 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground",
									children: "Aplica únicamente al botón de WhatsApp del pie de página."
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 441,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: buildWhatsappUrl(contactDraft.footer_whatsapp_message?.trim() || "¡Holaa Melina! Vi tu sitio web y te quiero hacerte una consulta. Espero tu mensaje", contactDraft.whatsapp?.trim() || "5493541639512"),
									target: "_blank",
									rel: "noopener noreferrer",
									className: "text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 shrink-0",
									children: "Probar enlace en WhatsApp ↗"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 444,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 440,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 407,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 348,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 324,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-display text-xl",
								children: "Página de Inicio (Hero)"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 464,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								className: "rounded-full",
								onClick: saveHero,
								disabled: savingHero,
								children: [savingHero && /* @__PURE__ */ (void 0)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 466,
									columnNumber: 30
								}, this), " Guardar Inicio"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 465,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 463,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Título principal" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 470,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: heroDraft.title,
								onChange: (e) => setHeroDraft({
									...heroDraft,
									title: e.target.value
								}),
								placeholder: "Nutrición que transforma tu bienestar"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 471,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 469,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Subtítulo o descripción" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 478,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								rows: 3,
								value: heroDraft.subtitle,
								onChange: (e) => setHeroDraft({
									...heroDraft,
									subtitle: e.target.value
								}),
								placeholder: "Acompañamiento profesional y cercano..."
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 479,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 477,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ImageUpload, {
							value: heroDraft.image_url,
							onChange: (url) => setHeroDraft({
								...heroDraft,
								image_url: url || ""
							}),
							folder: "hero",
							label: "Foto principal de inicio"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 486,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 462,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-display text-xl",
								children: "Sección Sobre Mí"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 497,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								className: "rounded-full",
								onClick: saveAbout,
								disabled: savingAbout,
								children: [savingAbout && /* @__PURE__ */ (void 0)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 499,
									columnNumber: 31
								}, this), " Guardar Sobre Mí"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 498,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 496,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Título" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 504,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setAboutDraft({
										...aboutDraft,
										title: "Hola, soy Meli Oviedo",
										body: DEFAULT_ABOUT_BODY
									}),
									className: "text-xs text-primary hover:underline flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-3 w-3" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 516,
										columnNumber: 17
									}, this), " Restaurar texto oficial"]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 505,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 503,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: aboutDraft.title,
								onChange: (e) => setAboutDraft({
									...aboutDraft,
									title: e.target.value
								}),
								placeholder: "Hola, soy Meli Oviedo"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 519,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 502,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Descripción / Historia" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 526,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								rows: 8,
								value: aboutDraft.body,
								onChange: (e) => setAboutDraft({
									...aboutDraft,
									body: e.target.value
								}),
								placeholder: "Contá sobre vos, tu formación y enfoque...",
								className: "text-sm leading-relaxed"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 527,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 525,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Experiencia" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 537,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: aboutDraft.experience ?? "",
									onChange: (e) => setAboutDraft({
										...aboutDraft,
										experience: e.target.value
									}),
									placeholder: "Lic. en Nutrición (UNC) • M.P. 5433"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 538,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 536,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Especialidades" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 545,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: aboutDraft.specialties ?? "",
									onChange: (e) => setAboutDraft({
										...aboutDraft,
										specialties: e.target.value
									}),
									placeholder: "Nutrición deportiva • ISAK I y II"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 546,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 544,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 535,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ImageUpload, {
							value: aboutDraft.image_url,
							onChange: (url) => setAboutDraft({
								...aboutDraft,
								image_url: url || ""
							}),
							folder: "about",
							label: "Foto de Sobre Mí"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 553,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 495,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 460,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 202,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/admin/AvailabilityManager.tsx";
function formatDate(iso) {
	return (/* @__PURE__ */ new Date(`${iso}T00:00:00`)).toLocaleDateString("es-AR", {
		weekday: "long",
		day: "numeric",
		month: "long"
	});
}
function generateRange(from, to, stepMin) {
	if (!from || !to) return [];
	const [fh, fm] = from.split(":").map(Number);
	const [th, tm] = to.split(":").map(Number);
	let cur = fh * 60 + fm;
	const end = th * 60 + tm;
	const out = [];
	while (cur <= end && out.length < 100) {
		out.push(`${String(Math.floor(cur / 60)).padStart(2, "0")}:${String(cur % 60).padStart(2, "0")}`);
		cur += stepMin;
	}
	return out;
}
function AvailabilityManager() {
	const queryClient = useQueryClient();
	const { data: slots = [] } = useQuery({
		queryKey: ["availability"],
		queryFn: fetchAvailability
	});
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const [date, setDate] = (0, import_react.useState)("");
	const [single, setSingle] = (0, import_react.useState)("");
	const [from, setFrom] = (0, import_react.useState)("09:00");
	const [to, setTo] = (0, import_react.useState)("13:00");
	const [step, setStep] = (0, import_react.useState)(30);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const grouped = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const s of slots) {
			if (!map.has(s.date)) map.set(s.date, []);
			map.get(s.date).push({
				id: s.id,
				time: s.time
			});
		}
		return Array.from(map.entries());
	}, [slots]);
	const refresh = () => Promise.all([queryClient.invalidateQueries({ queryKey: ["availability"] }), queryClient.invalidateQueries({ queryKey: ["available-slots"] })]);
	const add = async (times) => {
		if (!date) {
			toast.error("Elegí un día");
			return;
		}
		const clean = times.filter(Boolean);
		if (clean.length === 0) {
			toast.error("Agregá al menos un horario");
			return;
		}
		setBusy(true);
		try {
			await addAvailabilitySlots(date, clean);
			await refresh();
			toast.success("Horarios agregados");
			setSingle("");
		} catch {
			toast.error("No se pudieron agregar");
		} finally {
			setBusy(false);
		}
	};
	const remove = async (id) => {
		try {
			await deleteAvailabilitySlot(id);
			await refresh();
		} catch {
			toast.error("No se pudo eliminar");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-4 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CalendarClock, { className: "h-5 w-5 text-primary" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 93,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-xl",
					children: "Horarios disponibles"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 94,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 92,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mb-5 text-sm text-muted-foreground",
				children: "Definí los días y las horas en que la gente puede reservar. Solo estos horarios aparecerán en la página de reservas."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 96,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-6 space-y-4 rounded-2xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Día" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 103,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							type: "date",
							min: today,
							value: date,
							onChange: (e) => setDate(e.target.value),
							className: "rounded-xl"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 104,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 102,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-3 sm:grid-cols-[1fr_auto]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Agregar un horario" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 115,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								type: "time",
								value: single,
								onChange: (e) => setSingle(e.target.value),
								className: "rounded-xl"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 116,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 114,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								className: "w-full rounded-full sm:w-auto",
								onClick: () => add([single]),
								disabled: busy,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "mr-1 h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 129,
									columnNumber: 15
								}, this), " Agregar"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 124,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 123,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 113,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "mb-2 block",
							children: "Generar varios (por rango)"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 135,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-muted-foreground",
										children: "Desde"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 138,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										type: "time",
										value: from,
										onChange: (e) => setFrom(e.target.value),
										className: "rounded-xl"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 139,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 137,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-muted-foreground",
										children: "Hasta"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 147,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										type: "time",
										value: to,
										onChange: (e) => setTo(e.target.value),
										className: "rounded-xl"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 148,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 146,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-muted-foreground",
										children: "Cada (min)"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 156,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										type: "number",
										min: 5,
										step: 5,
										value: step,
										onChange: (e) => setStep(Number(e.target.value)),
										className: "rounded-xl"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 157,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 155,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-end",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "secondary",
										className: "w-full rounded-full",
										onClick: () => add(generateRange(from, to, step)),
										disabled: busy,
										children: busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-4 w-4 animate-spin" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 173,
											columnNumber: 25
										}, this) : "Generar"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 167,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 166,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 136,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 134,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 101,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: [grouped.length === 0 && /* @__PURE__ */ (void 0)("p", {
					className: "py-6 text-center text-sm text-muted-foreground",
					children: "Todavía no cargaste horarios."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 182,
					columnNumber: 11
				}, this), grouped.map(([d, items]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border border-border p-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mb-3 text-sm font-medium capitalize",
						children: formatDate(d)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 188,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-2",
						children: items.map((it) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground",
							children: [it.time, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => remove(it.id),
								"aria-label": `Eliminar ${it.time}`,
								className: "text-muted-foreground hover:text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 201,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 196,
								columnNumber: 19
							}, this)]
						}, it.id, true, {
							fileName: _jsxFileName$1,
							lineNumber: 191,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 189,
						columnNumber: 13
					}, this)]
				}, d, true, {
					fileName: _jsxFileName$1,
					lineNumber: 187,
					columnNumber: 11
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 180,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 91,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/admin.tsx?tsr-split=component";
var statusStyles = {
	pendiente: "bg-accent text-accent-foreground",
	confirmado: "bg-success/15 text-success",
	cancelado: "bg-destructive/10 text-destructive"
};
function AdminPage() {
	const { loading, isAdmin } = useAdmin();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [passInput, setPassInput] = (0, import_react.useState)("");
	const [passError, setPassError] = (0, import_react.useState)(false);
	const enabled = isAdmin;
	const { data: appointments = [] } = useQuery({
		queryKey: ["appointments"],
		queryFn: fetchAppointments,
		enabled
	});
	const { data: products = [] } = useQuery({
		queryKey: ["all-products"],
		queryFn: fetchAllProducts,
		enabled
	});
	const { data: services = [] } = useQuery({
		queryKey: ["all-services"],
		queryFn: fetchAllServices,
		enabled
	});
	const { data: recipes = [] } = useQuery({
		queryKey: ["all-recipes"],
		queryFn: fetchAllRecipes,
		enabled
	});
	const [busy, setBusy] = (0, import_react.useState)(null);
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-dvh items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 64,
		columnNumber: 12
	}, this);
	if (!isAdmin) {
		const handleLogin = (e) => {
			e.preventDefault();
			if (passInput.trim() === "meli42981809") {
				localStorage.setItem("admin_authenticated", "true");
				window.dispatchEvent(new Event("admin-auth-change"));
				toast.success("¡Bienvenida Melina!");
				setPassInput("");
				setPassError(false);
			} else {
				setPassError(true);
				toast.error("Contraseña incorrecta");
			}
		};
		return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex min-h-dvh flex-col items-center justify-center bg-surface p-4",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-card text-center space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-7 w-7" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 86,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 85,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "font-display text-2xl",
							children: "Panel de Administración"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 89,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-muted-foreground",
							children: "Ingresá tu contraseña para continuar"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 90,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: handleLogin,
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "admin-pass-field",
								children: "Contraseña"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 94,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "admin-pass-field",
								type: "password",
								autoFocus: true,
								placeholder: "••••",
								value: passInput,
								onChange: (e) => {
									setPassInput(e.target.value);
									setPassError(false);
								},
								className: `rounded-xl text-center text-xl tracking-widest ${passError ? "border-destructive ring-1 ring-destructive" : ""}`
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 95,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 93,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "submit",
							className: "w-full rounded-xl",
							children: "Ingresar al Panel"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 100,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 92,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "ghost",
						size: "sm",
						className: "rounded-full text-xs text-muted-foreground",
						onClick: () => navigate({ to: "/" }),
						children: "Volver al inicio"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 13
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 104,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 84,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 83,
			columnNumber: 12
		}, this);
	}
	const changeStatus = async (id, status) => {
		setBusy(id);
		try {
			await updateAppointmentStatus(id, status);
			await queryClient.invalidateQueries({ queryKey: ["appointments"] });
			toast.success("Estado actualizado");
		} catch {
			toast.error("No se pudo actualizar");
		} finally {
			setBusy(null);
		}
	};
	const removeAppointment = async (id) => {
		setBusy(id);
		try {
			await deleteAppointment(id);
			await queryClient.invalidateQueries({ queryKey: ["appointments"] });
			toast.success("Reserva eliminada");
		} catch {
			toast.error("No se pudo eliminar");
		} finally {
			setBusy(null);
		}
	};
	const logout = async () => {
		localStorage.removeItem("admin_authenticated");
		window.dispatchEvent(new Event("admin-auth-change"));
		toast.success("Sesión cerrada");
		navigate({ to: "/" });
	};
	const stats = [
		{
			icon: CalendarCheck,
			label: "Reservas",
			value: appointments.length
		},
		{
			icon: Package,
			label: "Productos",
			value: products.length
		},
		{
			icon: Salad,
			label: "Servicios",
			value: services.length
		},
		{
			icon: UtensilsCrossed,
			label: "Recetas",
			value: recipes.length
		}
	];
	const nextStatus = {
		pendiente: "confirmado",
		confirmado: "cancelado",
		cancelado: "pendiente"
	};
	const waLink = (phone) => `https://wa.me/${phone.replace(/[^\d]/g, "")}`;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-dvh bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
			className: "border-b border-border bg-background",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 176,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "secondary",
					className: "rounded-full",
					onClick: logout,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "mr-2 h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 178,
						columnNumber: 13
					}, this), " Salir"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 177,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 175,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 174,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mb-8 font-display text-3xl tracking-tight",
					children: "Panel de administración"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 184,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(s.icon, { className: "mb-3 h-6 w-6 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 188,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-display text-3xl font-semibold",
								children: s.value
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 189,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground",
								children: s.label
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 190,
								columnNumber: 15
							}, this)
						]
					}, s.label, true, {
						fileName: _jsxFileName,
						lineNumber: 187,
						columnNumber: 27
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 186,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
					defaultValue: "reservas",
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, {
							className: "mb-6 flex h-auto flex-wrap justify-start gap-1 rounded-2xl bg-card p-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
									value: "reservas",
									className: "rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CalendarCheck, { className: "mr-1.5 h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 197,
										columnNumber: 15
									}, this), " Reservas"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 196,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
									value: "horarios",
									className: "rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CalendarClock, { className: "mr-1.5 h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 200,
										columnNumber: 15
									}, this), " Horarios"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 199,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
									value: "servicios",
									className: "rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Salad, { className: "mr-1.5 h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 203,
										columnNumber: 15
									}, this), " Servicios"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 202,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
									value: "productos",
									className: "rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { className: "mr-1.5 h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 206,
										columnNumber: 15
									}, this), " Productos"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 205,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
									value: "recetas",
									className: "rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UtensilsCrossed, { className: "mr-1.5 h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 209,
										columnNumber: 15
									}, this), " Recetas"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 208,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
									value: "contenido",
									className: "rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LayoutTemplate, { className: "mr-1.5 h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 212,
										columnNumber: 15
									}, this), " Contenido"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 211,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 195,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "reservas",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
								className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "mb-4 font-display text-xl",
									children: "Reservas"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 218,
									columnNumber: 15
								}, this), appointments.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "py-10 text-center text-muted-foreground",
									children: "Todavía no hay reservas."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 219,
									columnNumber: 44
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-3",
									children: appointments.map((a) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex flex-col gap-3 rounded-2xl border border-border p-4 md:flex-row md:items-center md:justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "font-medium",
												children: [
													a.first_name,
													" ",
													a.last_name
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 222,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-sm text-muted-foreground",
												children: [
													a.service_name ?? "Servicio",
													" · ",
													a.date,
													" ",
													a.time
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 225,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-sm text-muted-foreground",
												children: [
													a.email,
													" · ",
													a.phone
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 228,
												columnNumber: 25
											}, this),
											a.notes && /* @__PURE__ */ (void 0)("p", {
												className: "mt-1 text-sm italic text-muted-foreground",
												children: [
													"“",
													a.notes,
													"”"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 231,
												columnNumber: 37
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 221,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
													href: waLink(a.phone),
													target: "_blank",
													rel: "noopener noreferrer",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
														variant: "ghost",
														size: "icon",
														className: "rounded-full text-muted-foreground hover:text-success",
														"aria-label": "Contactar por WhatsApp",
														children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "h-4 w-4" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 236,
															columnNumber: 29
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 235,
														columnNumber: 27
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 234,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													onClick: () => changeStatus(a.id, nextStatus[a.status]),
													disabled: busy === a.id,
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
														className: `cursor-pointer capitalize ${statusStyles[a.status]}`,
														children: a.status
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 240,
														columnNumber: 27
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 239,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
													variant: "ghost",
													size: "icon",
													className: "rounded-full text-muted-foreground hover:text-destructive",
													onClick: () => removeAppointment(a.id),
													disabled: busy === a.id,
													"aria-label": "Eliminar reserva",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-4 w-4" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 245,
														columnNumber: 27
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 244,
													columnNumber: 25
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 233,
											columnNumber: 23
										}, this)]
									}, a.id, true, {
										fileName: _jsxFileName,
										lineNumber: 220,
										columnNumber: 42
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 219,
									columnNumber: 130
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 217,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 216,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "horarios",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AvailabilityManager, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 254,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 253,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "servicios",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ServiceManager, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 258,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 257,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "productos",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductManager, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 262,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 261,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "recetas",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RecipeManager, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 266,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 265,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "contenido",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ContentManager, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 270,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 269,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 194,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 183,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 173,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminPage as component };
