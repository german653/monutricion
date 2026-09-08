import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Slot } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { _ as fetchBranding } from "./router-D2ebo0ym.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { a as DialogOverlay$1, c as DialogTrigger$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-aQySvrb2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function useAdmin() {
	const [state, setState] = (0, import_react.useState)(() => {
		return {
			loading: false,
			isAdmin: typeof window !== "undefined" && localStorage.getItem("admin_authenticated") === "true"
		};
	});
	(0, import_react.useEffect)(() => {
		const check = () => {
			const isLocal = typeof window !== "undefined" && localStorage.getItem("admin_authenticated") === "true";
			setState({
				loading: false,
				isAdmin: isLocal
			});
		};
		check();
		const onAuthChange = () => check();
		window.addEventListener("admin-auth-change", onAuthChange);
		window.addEventListener("storage", onAuthChange);
		return () => {
			window.removeEventListener("admin-auth-change", onAuthChange);
			window.removeEventListener("storage", onAuthChange);
		};
	}, []);
	return state;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var _jsxFileName$4 = "/app/applet/src/components/ui/button.tsx";
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 43,
		columnNumber: 7
	}, void 0);
});
Button.displayName = "Button";
var _jsxFileName$3 = "/app/applet/src/components/ui/input.tsx";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 8,
		columnNumber: 7
	}, void 0);
});
Input.displayName = "Input";
var _jsxFileName$2 = "/app/applet/src/components/ui/label.tsx";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$2,
	lineNumber: 17,
	columnNumber: 3
}, void 0));
Label.displayName = Root.displayName;
var logo_mo_png_asset_default = {
	version: 1,
	asset_id: "e2aa5c89-6c38-4b9d-9696-c694bca76ccd",
	project_id: "1b33a83d-fefd-4613-aaf3-e6beae13249f",
	url: "/__l5e/assets-v1/e2aa5c89-6c38-4b9d-9696-c694bca76ccd/logo-mo.png",
	r2_key: "a/v1/1b33a83d-fefd-4613-aaf3-e6beae13249f/e2aa5c89-6c38-4b9d-9696-c694bca76ccd/logo-mo.png",
	original_filename: "logo-mo.png",
	size: 32740,
	content_type: "image/png",
	created_at: "2026-07-14T00:06:27Z"
};
var _jsxFileName$1 = "/app/applet/src/components/Logo.tsx";
function Logo({ className, showText = true }) {
	const { data: branding } = useQuery({
		queryKey: ["branding"],
		queryFn: fetchBranding
	});
	const logoSrc = branding?.logo_url || logo_mo_png_asset_default.url;
	const brandName = branding?.brand_name || "Melina Oviedo";
	const tagline = branding?.tagline || "Nutrición y Salud";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to: "/",
		className: cn("flex items-center gap-3 group", className),
		"aria-label": `${brandName} — ${tagline}`,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
			src: logoSrc,
			alt: `Logo ${brandName}`,
			width: 44,
			height: 44,
			className: "h-11 w-11 rounded-full object-cover shadow-soft transition-transform duration-200 group-hover:scale-105"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 23,
			columnNumber: 7
		}, this), showText && /* @__PURE__ */ (void 0)("span", {
			className: "flex flex-col leading-none",
			children: [/* @__PURE__ */ (void 0)("span", {
				className: "font-display text-lg font-semibold tracking-tight text-foreground",
				children: brandName
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 32,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("span", {
				className: "text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground",
				children: tagline
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 35,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 31,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 18,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/components/ui/dialog.tsx";
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 21,
	columnNumber: 3
}, void 0));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogOverlay, {}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 37,
	columnNumber: 5
}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 48,
			columnNumber: 9
		}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "sr-only",
			children: "Close"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 49,
			columnNumber: 9
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 47,
		columnNumber: 7
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName,
	lineNumber: 38,
	columnNumber: 5
}, void 0)] }, void 0, true, {
	fileName: _jsxFileName,
	lineNumber: 36,
	columnNumber: 3
}, void 0));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 57,
	columnNumber: 3
}, void 0);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 62,
	columnNumber: 3
}, void 0);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 73,
	columnNumber: 3
}, void 0));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 85,
	columnNumber: 3
}, void 0));
DialogDescription.displayName = DialogDescription$1.displayName;
function formatPrice(value) {
	return new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
		maximumFractionDigits: 0
	}).format(value);
}
var WHATSAPP_NUMBER = "5493541639512";
function buildWhatsappUrl(message, number = WHATSAPP_NUMBER) {
	return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
//#endregion
export { DialogFooter as a, DialogTrigger as c, Logo as d, buildWhatsappUrl as f, useAdmin as g, logo_mo_png_asset_default as h, DialogDescription as i, Input as l, formatPrice as m, Dialog as n, DialogHeader as o, cn as p, DialogContent as r, DialogTitle as s, Button as t, Label as u };
