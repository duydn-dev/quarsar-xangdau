import { boot } from 'quasar/wrappers'
import { date } from 'quasar';
import userService from './services/user-service';
import fileService from './services/file-service';
import pager from 'components/_share/pager.vue';

export default boot(({ app }) => {
    // common global component
    app.component('pager', pager);

    // common global function
    app.config.globalProperties.$formatDate = (value, format) =>{
        return date.formatDate(value, format)
    }
    app.config.globalProperties.$userService = userService;
    app.config.globalProperties.$fileService = fileService;
})

