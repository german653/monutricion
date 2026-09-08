import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { A as useCart, y as fetchContact } from "./router-D2ebo0ym.mjs";
import { T as Instagram, c as ShieldCheck, g as Menu, h as MessageCircle, i as Trash2, m as Minus, s as ShoppingBag, t as X, u as Plus, w as KeyRound } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { d as Logo, f as buildWhatsappUrl, g as useAdmin, i as DialogDescription$1, l as Input, m as formatPrice, n as Dialog$1, o as DialogHeader, p as cn, r as DialogContent$1, s as DialogTitle$1, t as Button, u as Label } from "./format-aQySvrb2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteLayout-BwNyWXL7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$5 = "/app/applet/src/components/ui/sheet.tsx";
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 22,
	columnNumber: 3
}, void 0));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetOverlay, {}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 62,
	columnNumber: 5
}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 65,
			columnNumber: 9
		}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "sr-only",
			children: "Close"
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 66,
			columnNumber: 9
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 64,
		columnNumber: 7
	}, void 0), children]
}, void 0, true, {
	fileName: _jsxFileName$5,
	lineNumber: 63,
	columnNumber: 5
}, void 0)] }, void 0, true, {
	fileName: _jsxFileName$5,
	lineNumber: 61,
	columnNumber: 3
}, void 0));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 75,
	columnNumber: 3
}, void 0);
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 80,
	columnNumber: 3
}, void 0);
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 91,
	columnNumber: 3
}, void 0));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 103,
	columnNumber: 3
}, void 0));
SheetDescription.displayName = DialogDescription.displayName;
var _jsxFileName$4 = "/app/applet/src/components/CartSheet.tsx";
function CartSheet({ open, onOpenChange }) {
	const { items, subtotal, count, setQuantity, remove, clear } = useCart();
	const checkout = () => {
		if (items.length === 0) return;
		const message = `¡Hola Melina! 👋\n\nQuiero comprar los siguientes productos:\n\n${items.map((i) => `• ${i.name} x${i.quantity}`).join("\n")}\n\nTotal aproximado: ${formatPrice(subtotal)}\n\nMi nombre es: \n\n¡Muchas gracias!`;
		window.open(buildWhatsappUrl(message), "_blank", "noopener");
		toast.success("Abriendo WhatsApp para finalizar tu compra");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetContent, {
			side: "right",
			className: "flex w-full flex-col sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetTitle, {
				className: "flex items-center gap-2 font-display text-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "h-5 w-5" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 33,
						columnNumber: 13
					}, this),
					" Tu carrito",
					count > 0 && /* @__PURE__ */ (void 0)("span", {
						className: "text-muted-foreground",
						children: [
							"(",
							count,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 34,
						columnNumber: 27
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 32,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 31,
				columnNumber: 9
			}, this), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-1 flex-col items-center justify-center gap-4 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex h-20 w-20 items-center justify-center rounded-full bg-accent",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "h-8 w-8 text-accent-foreground" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 41,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 40,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground",
						children: "Tu carrito está vacío."
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 43,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "secondary",
						className: "rounded-full",
						onClick: () => onOpenChange(false),
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/tienda",
							children: "Ver la tienda"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 50,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 44,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 39,
				columnNumber: 11
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "-mx-6 flex-1 space-y-4 overflow-y-auto px-6 py-2",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex gap-3 rounded-2xl border border-border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted",
						children: item.image_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: item.image_url,
							alt: item.name,
							className: "h-full w-full object-cover"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 60,
							columnNumber: 23
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex h-full w-full items-center justify-center text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 67,
								columnNumber: 25
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 66,
							columnNumber: 23
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 58,
						columnNumber: 19
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-1 flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm font-medium leading-tight",
								children: item.name
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 73,
								columnNumber: 23
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => remove(item.id),
								className: "text-muted-foreground transition-colors hover:text-destructive",
								"aria-label": `Eliminar ${item.name}`,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 79,
									columnNumber: 25
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 74,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 72,
							columnNumber: 21
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1 rounded-full border border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										className: "flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-accent",
										onClick: () => setQuantity(item.id, item.quantity - 1),
										"aria-label": "Restar",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Minus, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 89,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 84,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "w-6 text-center text-sm font-medium",
										children: item.quantity
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 91,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										className: "flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-accent",
										onClick: () => setQuantity(item.id, item.quantity + 1),
										"aria-label": "Sumar",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 97,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 92,
										columnNumber: 25
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 83,
								columnNumber: 23
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-sm font-semibold",
								children: formatPrice(item.price * item.quantity)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 100,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 82,
							columnNumber: 21
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 71,
						columnNumber: 19
					}, this)]
				}, item.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 57,
					columnNumber: 17
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 55,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetFooter, {
				className: "flex-col gap-3 sm:flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between text-base",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-muted-foreground",
							children: "Subtotal"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 111,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-display text-xl font-semibold",
							children: formatPrice(subtotal)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 112,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 110,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						className: "w-full rounded-full",
						size: "lg",
						onClick: checkout,
						children: "Finalizar compra por WhatsApp"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 114,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: clear,
						className: "inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 121,
							columnNumber: 17
						}, this), " Vaciar carrito"]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 117,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 109,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 54,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 30,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 29,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/Navbar.tsx";
var links = [
	{
		to: "/",
		label: "Inicio"
	},
	{
		to: "/sobre-mi",
		label: "Sobre mí"
	},
	{
		to: "/servicios",
		label: "Servicios"
	},
	{
		to: "/recetas",
		label: "Recetas"
	},
	{
		to: "/tienda",
		label: "Tienda"
	},
	{
		to: "/reservar",
		label: "Reservar turno"
	},
	{
		to: "/contacto",
		label: "Contacto"
	}
];
function Navbar() {
	const { count } = useCart();
	const { isAdmin } = useAdmin();
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [cartOpen, setCartOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
			className: "mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 30,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "hidden items-center gap-1 lg:flex",
					children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: l.to,
						className: "rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&.active]:bg-accent [&.active]:text-accent-foreground",
						activeOptions: { exact: l.to === "/" },
						children: l.label
					}, l.to, false, {
						fileName: _jsxFileName$3,
						lineNumber: 34,
						columnNumber: 13
					}, this)), isAdmin && /* @__PURE__ */ (void 0)(Link, {
						to: "/admin",
						className: "ml-1 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90",
						children: [/* @__PURE__ */ (void 0)(ShieldCheck, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 48,
							columnNumber: 15
						}, this), " Panel Admin"]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 44,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 32,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "icon",
							className: "relative rounded-full",
							"aria-label": "Abrir carrito",
							onClick: () => setCartOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 61,
								columnNumber: 13
							}, this), count > 0 && /* @__PURE__ */ (void 0)("span", {
								className: "absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[0.65rem] font-semibold text-primary-foreground",
								children: count
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 63,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 54,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							className: "hidden rounded-full md:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/reservar",
								children: "Reservar turno"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 70,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 69,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sheet, {
							open: mobileOpen,
							onOpenChange: setMobileOpen,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "icon",
									className: "rounded-full lg:hidden",
									"aria-label": "Abrir menú",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 81,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 75,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 74,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetContent, {
								side: "right",
								className: "w-80",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetTitle, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, { showText: true }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 87,
									columnNumber: 19
								}, this) }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 86,
									columnNumber: 17
								}, this) }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 85,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-8 flex flex-col gap-1",
									children: [
										links.map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: l.to,
											onClick: () => setMobileOpen(false),
											className: "rounded-2xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent [&.active]:bg-accent [&.active]:text-accent-foreground",
											activeOptions: { exact: l.to === "/" },
											children: l.label
										}, l.to, false, {
											fileName: _jsxFileName$3,
											lineNumber: 92,
											columnNumber: 19
										}, this)),
										isAdmin && /* @__PURE__ */ (void 0)(Link, {
											to: "/admin",
											onClick: () => setMobileOpen(false),
											className: "mt-1 inline-flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-base font-medium text-secondary-foreground",
											children: [/* @__PURE__ */ (void 0)(ShieldCheck, { className: "h-4 w-4" }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 108,
												columnNumber: 21
											}, this), " Panel Admin"]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 103,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											asChild: true,
											className: "mt-4 rounded-2xl",
											onClick: () => setMobileOpen(false),
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
												to: "/reservar",
												children: "Reservar turno"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 112,
												columnNumber: 19
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 111,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 90,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 84,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 73,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 53,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 29,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartSheet, {
			open: cartOpen,
			onOpenChange: setCartOpen
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 120,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 28,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/AdminLoginModal.tsx";
function AdminLoginModal({ open, onOpenChange }) {
	const [password, setPassword] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const handlePasswordLogin = (e) => {
		e.preventDefault();
		if (password.trim() === "meli42981809") {
			localStorage.setItem("admin_authenticated", "true");
			window.dispatchEvent(new Event("admin-auth-change"));
			toast.success("¡Bienvenida, Melina!");
			onOpenChange(false);
			setPassword("");
			navigate({ to: "/admin" });
			return;
		}
		toast.error("Contraseña incorrecta");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent$1, {
			className: "sm:max-w-md rounded-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(KeyRound, { className: "h-6 w-6" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 47,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 46,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle$1, {
					className: "text-center font-display text-2xl",
					children: "Acceso Administrador"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 49,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription$1, {
					className: "text-center",
					children: "Ingresá la contraseña para gestionar el sitio."
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 52,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 45,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: handlePasswordLogin,
				className: "space-y-4 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						htmlFor: "admin-password",
						children: "Contraseña"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 59,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "admin-password",
						type: "password",
						autoFocus: true,
						placeholder: "••••",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						required: true,
						className: "rounded-xl text-center text-lg tracking-widest"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 60,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 58,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "submit",
					className: "w-full rounded-xl",
					children: "Ingresar al Panel"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 71,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 57,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 44,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 43,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/Footer.tsx";
var nav = [
	{
		to: "/",
		label: "Inicio"
	},
	{
		to: "/sobre-mi",
		label: "Sobre mí"
	},
	{
		to: "/servicios",
		label: "Servicios"
	},
	{
		to: "/recetas",
		label: "Recetas"
	},
	{
		to: "/tienda",
		label: "Tienda"
	},
	{
		to: "/reservar",
		label: "Reservar turno"
	},
	{
		to: "/contacto",
		label: "Contacto"
	}
];
function Footer() {
	const [loginOpen, setLoginOpen] = (0, import_react.useState)(false);
	const { data: contact } = useQuery({
		queryKey: ["contact"],
		queryFn: fetchContact
	});
	const footerWhatsappMessage = contact?.footer_whatsapp_message?.trim() || "¡Holaa Melina! Vi tu sitio web y te quiero hacerte una consulta. Espero tu mensaje";
	const whatsappNumber = contact?.whatsapp?.trim() || "5493541639512";
	const instagramUrl = contact?.instagram?.trim() || "https://www.instagram.com/nutri_melioviedo/?hl=es-la";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
		className: "border-t border-border bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 37,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "max-w-xs text-sm text-muted-foreground",
							children: "Acompañamiento nutricional profesional y cercano para transformar tu bienestar con hábitos que perduran."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 38,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 36,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "mb-4 text-sm font-semibold uppercase tracking-wide text-foreground",
						children: "Navegación"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 45,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "space-y-2",
						children: nav.map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: l.to,
							className: "text-sm text-muted-foreground transition-colors hover:text-primary",
							children: l.label
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 51,
							columnNumber: 17
						}, this) }, l.to, false, {
							fileName: _jsxFileName$1,
							lineNumber: 50,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 48,
						columnNumber: 11
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 44,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "mb-4 text-sm font-semibold uppercase tracking-wide text-foreground",
						children: "Seguime"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 63,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: instagramUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": "Instagram de Melina Oviedo",
							className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Instagram, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 74,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 67,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: buildWhatsappUrl(footerWhatsappMessage, whatsappNumber),
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": "WhatsApp de Melina Oviedo",
							className: "flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 83,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 76,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 66,
						columnNumber: 11
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 62,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 35,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Melina Oviedo · Nutrición y Salud"
					] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 91,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setLoginOpen(true),
						className: "transition-colors hover:text-foreground",
						children: "Acceso"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 92,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 90,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 89,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminLoginModal, {
				open: loginOpen,
				onOpenChange: setLoginOpen
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 101,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 34,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/components/SiteLayout.tsx";
function SiteLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Navbar, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 8,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "flex-1",
				children
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 9,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 10,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 7,
		columnNumber: 5
	}, this);
}
//#endregion
export { SiteLayout as t };
