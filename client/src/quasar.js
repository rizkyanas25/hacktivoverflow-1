import Vue from 'vue'

import './styles/quasar.styl'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QImg,
  QAvatar,
  Notify,
  Dialog,
  QEditor,
  QInput,
  QSeparator,
  QChip,
  QCard,
  QFooter,
  QCardSection,
  QToggle,
  QForm,
  QDialog,
  QSpace,
  ClosePopup,
  QBar,
  QTooltip,
  QCardActions,
  QChatMessage,
  QSpinnerCube
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QImg,
    QAvatar,
    QEditor,
    QInput,
    QSeparator,
    QChip,
    QCard,
    QFooter,
    QCardSection,
    QToggle,
    QForm,
    QDialog,
    QSpace,
    QBar,
    QTooltip,
    QCardActions,
    QChatMessage,
    QSpinnerCube
  },
  directives: {
    ClosePopup
  },
  plugins: {
    Notify,
    Dialog
  }
})
