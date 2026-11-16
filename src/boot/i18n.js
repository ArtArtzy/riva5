import { defineBoot } from '@quasar/app-vite'
import { createI18n } from 'vue-i18n'
import messages from '../i18n'

export default defineBoot(({ app, router }) => {
  const savedLocale = localStorage.getItem('riva-locale')
  const locale = savedLocale && Object.hasOwn(messages, savedLocale)
    ? savedLocale
    : 'en-US'

  const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en-US',
    globalInjection: true,
    messages
  })

  // Set i18n instance on app
  app.use(i18n)

  router.beforeEach((to) => {
    if (to.meta.englishOnly) {
      i18n.global.locale.value = 'en-US'
      localStorage.setItem('riva-locale', 'en-US')
    }
  })
})
