import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes';
import constants from '../components/_common/constants';
import {Cookies} from 'quasar';
import CryptoJS from "crypto-js";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ( { store, ssrContext }) {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies //
    let isAuth = false;
    if(cookies.get('cookie_default')){
      const bytes  = CryptoJS.AES.decrypt(cookies.get('cookie_default'), constants.userKey);
      const user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      if(new Date(user.expire) > new Date()){
        store.dispatch("users/userLoginAction", user);
        isAuth = true;
      }
    }
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  });

  Router.beforeEach((to, from, next) => {
    const menu = constants.menuLeft.find(n => n.name == to.name);
    if (menu && menu.auth) {
      if(isAuth) next();
      else next({name: "login"});
    }
    else {
      next();
    }
  })

  return Router
})
