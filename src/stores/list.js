import { defineStore } from 'pinia'
import { ref } from 'vue'

const time = Number.parseInt(import.meta.env.VITE_TIME)
const timeBreak = Number.parseInt(import.meta.env.VITE_TIME_BREAK)

export const useListStore = defineStore(
  'list',
  () => {
    // 未完成事項
    const items = ref([])
    // 已完成事項
    const finishedItems = ref([])
    // 目前進行事項
    const currentItem = ref('')
    // id
    const id = ref(1)

    // 倒數剩餘時間
    const timeleft = ref(time)

    // 是不是休息時間
    const isBreak = ref(false)

    const addItem = value => {
      items.value.push({
        id: id.value++,
        text: value,
        edit: false,
        model: value,
      })
    }

    const editItem = id => {
      const i = items.value.findIndex(item => item.id === id)
      items.value[i].edit = true
    }

    const submitEdit = id => {
      const i = items.value.findIndex(item => item.id === id)
      items.value[i].text = items.value[i].model
      items.value[i].edit = false
    }

    const cancelEdit = id => {
      const i = items.value.findIndex(item => item.id === id)
      items.value[i].model = items.value[i].text
      items.value[i].edit = false
    }

    const delItem = id => {
      const i = items.value.findIndex(item => item.id === id)
      items.value.splice(i, 1)
    }

    const delFinishedItem = id => {
      const i = finishedItems.value.findIndex(item => item.id === id)
      finishedItems.value.splice(i, 1)
    }

    const setCurrentItem = () => {
      currentItem.value = isBreak.value ? '休息時間' : items.value.shift().text
    }

    const countdown = () => {
      timeleft.value--
    }

    const setFinishItem = () => {
      if (!isBreak.value) {
        finishedItems.value.push({
          id: id.value++,
          text: currentItem.value,
        })
      }
      currentItem.value = ''

      if (items.value.length > 0) {
        isBreak.value = !isBreak.value
      }
      timeleft.value = isBreak.value ? timeBreak : time
    }

    return {
      items,
      finishedItems,
      currentItem,
      timeleft,
      id,
      addItem,
      editItem,
      submitEdit,
      cancelEdit,
      delItem,
      delFinishedItem,
      setCurrentItem,
      countdown,
      setFinishItem,
    }
  },
  {
    persist: {
      key: 'pomodoro-list',
    },
  }
)
