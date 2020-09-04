import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
import zh from './zh'
import en from './en'
const i18n = new VueI18n({
  locale:localStorage.getItem('lang') || 'zh',
  messages:{zh,en}
})
localStorage.setItem('lang',i18n.locale)
export default i18n