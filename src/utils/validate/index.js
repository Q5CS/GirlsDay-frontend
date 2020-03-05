import { ValidationProvider } from "vee-validate";
import { localize, extend } from "vee-validate";
import { confirmed, required, email, min, max } from "vee-validate/dist/rules";
import zh_CN from "vee-validate/dist/locale/zh_CN.json";

extend("confirmed", confirmed);
extend("required", required);
extend("email", email);
extend("min", min);
extend("max", max);

localize("zh_CN", zh_CN);

export default ValidationProvider;
