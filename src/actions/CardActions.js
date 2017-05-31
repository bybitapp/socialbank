import server from '../api/server'
import * as types from '../constants/ActionTypes'

const export getAllCards = () => {
  server.getCards((ex, cards) => {
    dispatch({type: types.RECEIVE_CARDS, cards})
  })
}

const export addCard = () => {

}

const export updateCard = () => {

}

const export destroyCard = () => {

}

const export blockCard = () => {

}

const export unblockCard = () => {

}
