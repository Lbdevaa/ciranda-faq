import "./import/modules"
import "./import/components"

document.addEventListener(`DOMContentLoaded`, () => {
  const content = [...document.querySelectorAll('.accordion__content')] || []
  const accordionPrompt = document.querySelector('.accordion-prompt')
  const searchInput = document.querySelector('.search-box__input')

  // searchInput.addEventListener('keyup', accordionPrompt && search)
  document.querySelector('.search-box__btn').addEventListener('click', accordionPrompt && search)

  // Найти элементы
  function search() {
    const filterItems = content.filter((item) => {
      return item.textContent.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1
    })

    content.forEach(element => {
      const parent = element.closest('.accordion__item')
      parent.classList.add('hide')
    })

    if (filterItems.length) {
      filterItems.forEach((element) => {
        const parent = element.closest('.accordion__item')

        element.innerHTML = element.textContent.replaceAll(searchInput.value, `<b>${searchInput.value}</b>`)
        parent.classList.remove('hide')
        parent.classList.add('active')
      })
    }
    prompt()
  }

  // Отобразить подсказку
  function prompt() {
    const activeTab = document.querySelector('.search-tabs__item.active').dataset.tab
    const hiddenAcc = [...document.querySelector(`.accordion[data-tab="${activeTab}"]`).querySelectorAll('.accordion__item')] || []

    if (hiddenAcc.every(elem => elem.classList.contains('hide'))) {
      accordionPrompt.classList.add('show')
    } else {
      accordionPrompt.classList.remove('show')
    }
  }

  // acc
  const accordionItems = document.querySelectorAll('.accordion__item') || []
  accordionItems && accordionHandler()

  function accordionHandler() {
    accordionItems.forEach((element) => {
      element.querySelector('.accordion__header').addEventListener('click', () => {
        element.classList.toggle('active')
      })
    })
  }

  // tabs
  const tabs = document.querySelectorAll('.search-tabs__item') || []

  tabs.forEach(element => {
    element.addEventListener('click', () => {
      const tabName = element.dataset.tab
      tabs.forEach(el => { el.classList.remove('active') })
      element.classList.add('active')

      document.querySelectorAll(`.accordion`).forEach(item => {
        item.dataset.tab === tabName ? item.classList.add('active') : item.classList.remove('active')
      })
      prompt()
    })
  })

})