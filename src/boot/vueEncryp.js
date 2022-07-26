import { boot } from 'quasar/wrappers';
import VueCryptojs from 'vue-cryptojs';
import vueCrypt from 'vue-crypt';

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
export default boot(({ app }) => {
 app.use(VueCryptojs);
 app.use(vueCrypt);
})