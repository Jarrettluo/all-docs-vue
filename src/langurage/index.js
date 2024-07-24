import Vue from 'vue'
import VueI18n from 'vue-i18n'
// 从语言包文件中导入语言包对象
import zh from './zh'
import en from './en'

// 参考 https://juejin.cn/post/7082730122809180174


Vue.use(VueI18n)
const messages = {
    zh,
    en
}
const i18n = new VueI18n({
    messages,
    locale: 'en'
})
export default i18n