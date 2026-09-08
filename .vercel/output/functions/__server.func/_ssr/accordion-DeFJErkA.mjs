import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { M as ChevronDown } from "../_libs/lucide-react.mjs";
import { p as cn } from "./format-aQySvrb2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accordion-DeFJErkA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/ui/accordion.tsx";
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 13,
	columnNumber: 3
}, void 0));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 31,
			columnNumber: 7
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 22,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 21,
	columnNumber: 3
}, void 0));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("pb-4 pt-0", className),
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 46,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 41,
	columnNumber: 3
}, void 0));
AccordionContent.displayName = Content2.displayName;
//#endregion
export { AccordionTrigger as i, AccordionContent as n, AccordionItem as r, Accordion as t };
