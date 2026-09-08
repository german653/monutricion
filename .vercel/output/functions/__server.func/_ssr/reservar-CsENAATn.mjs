import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as SiteLayout } from "./SiteLayout-BwNyWXL7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reservar-CsENAATn.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/reservar.tsx?tsr-split=errorComponent";
objectType({
	first_name: stringType().trim().min(1, "Ingresá tu nombre").max(80),
	last_name: stringType().trim().min(1, "Ingresá tu apellido").max(80),
	email: stringType().trim().email("Correo inválido").max(255),
	phone: stringType().trim().min(6, "Teléfono inválido").max(30),
	service_id: stringType().min(1, "Elegí un servicio"),
	date: stringType().min(1, "Elegí una fecha"),
	time: stringType().min(1, "Elegí un horario"),
	notes: stringType().max(1e3).optional()
});
var SplitErrorComponent = ({ error }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: "p-24 text-center",
	role: "alert",
	children: error.message
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 17,
	columnNumber: 7
}, void 0) }, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 16,
	columnNumber: 7
}, void 0);
//#endregion
export { SplitErrorComponent as errorComponent };
