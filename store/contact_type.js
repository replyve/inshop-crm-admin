import * as crud from '~/utils/crud'

const defaultState = () => ({
  item: {
    isActive: true,
  },
  items: [],
  error: null,
  errors: {},
})

export const state = () => defaultState()

export const mutations = {
  CONTACT_TYPE_SET_ITEM(state, item) {
    Object.assign(state, { item })
  },
  CONTACT_TYPE_UPDATE_ITEM(state, item) {
    state.item = Object.assign({}, state.item, item)
  },
  CONTACT_TYPE_SET_ITEMS(state, items) {
    Object.assign(state, { items })
  },
  CONTACT_TYPE_SET_ERROR(state, error) {
    Object.assign(state, { error })
  },
  CONTACT_TYPE_SET_ERRORS(state, errors) {
    Object.assign(state, { errors })
  },
  CONTACT_TYPE_RESET(state) {
    Object.assign(state, defaultState())
  },
}

export const getters = {
  item: (state) => state.item,
  items: (state) => state.items,
  error: (state) => state.error,
  errors: (state) => state.errors,
}

export const actions = {
  getItem(context, id) {
    return crud.getItem(context, this.$axios, 'CONTACT_TYPE', id)
  },
  getItems(context, query) {
    return crud.getItems(context, this.$axios, 'CONTACT_TYPE', query)
  },
  create(context) {
    return crud.create(context, this.$axios, 'CONTACT_TYPE')
  },
  update(context) {
    return crud.update(context, this.$axios, 'CONTACT_TYPE')
  },
  remove(context, item) {
    return crud.remove(context, this.$axios, 'CONTACT_TYPE', item)
  },
  reset(context) {
    return crud.reset(context, 'CONTACT_TYPE')
  },
}
