import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

const getItems = ({ commit }, page = '/payment_types') => {
  commit(types.TOGGLE_LOADING)

  fetch(page)
    .then(response => response.json())
    .then((data) => {
      let items = data['hydra:member']

      items.forEach(function(type) {
        type.text = type.name
      })

      commit(types.TOGGLE_LOADING)
      commit(types.SET_ITEMS, items)
      commit(types.SET_VIEW, data['hydra:view'])
    })
    .catch((e) => {
      commit(types.TOGGLE_LOADING)
      commit(types.SET_ERROR, e.message)
    })
}

export default getItems