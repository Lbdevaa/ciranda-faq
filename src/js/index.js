import "./import/modules"
import "./import/components"

document.addEventListener(`DOMContentLoaded`, () => {
  const content = [...document.querySelectorAll('.accordion__content')] || []
  const accordionPrompt = document.querySelector('.accordion-prompt')
  const searchInput = document.querySelector('.search-box__input')

  // searchInput.addEventListener('keyup', accordionPrompt && search)
  document.querySelector('.search-box__btn').addEventListener('click', accordionPrompt && search)

  // find elems
  function search() {
    const filterItems = content.filter((item) => {
      return item.textContent.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1
    })
    const tabActive = document.querySelector('.search-tabs__item.active').dataset.tab

    content.forEach(element => {
      const parent = element.closest('.accordion__item')
      parent.classList.add('hide')
      parent.classList.remove('active')
      element.innerHTML = element.textContent.replaceAll('<b>', '')
    })

    if (filterItems.length) {
      filterItems.forEach((element) => {
        const parent = element.closest('.accordion__item')
        if (tabActive === parent.dataset.tab) {
          element.innerHTML = element.textContent.replaceAll(searchInput.value, `<b>${searchInput.value}</b>`)
          parent.classList.remove('hide')
          parent.classList.add('active')
        }
      })
    }
    prompt()
  }

  // show prompt
  function prompt() {
    const activeTab = document.querySelector('.search-tabs__item.active').dataset.tab
    const acc = [...document.querySelectorAll(`.accordion__item[data-tab="${activeTab}"]`)] || []

    if (acc.every(elem => elem.classList.contains('hide'))) {
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
  let tabNames = []
  accordionItems.forEach(element => tabNames.push(element.dataset.tab))
  tabNames = [...new Set(tabNames)]

  generateTabs()
  function generateTabs() {
    document.querySelector('.search-tabs').innerHTML =
      tabNames.map(function (item) {
        return `
          <li class="search-tabs__item" data-tab="${item}">
            ${item}
          </li>
        `
      }).join('')
  }

  const tabs = document.querySelectorAll('.search-tabs__item') || []
  tabs[0].classList.add('active')

  tabs.forEach(element => {
    element.addEventListener('click', () => {
      const tabName = element.dataset.tab
      tabs.forEach(el => { el.classList.remove('active') })
      element.classList.add('active')

      document.querySelectorAll(`.accordion__item`).forEach(item => {
        item.dataset.tab === tabName ? item.classList.remove('hide') : item.classList.add('hide')
      })
      prompt()
    })
  })

})