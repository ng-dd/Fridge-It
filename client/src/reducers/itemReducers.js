const initialState = {
  items: [],
  fetching: false,
  fetched: false,
  posting: false,
  posted: false,
  updating: false,
  updated: false,
  deleting: false,
  deleted: false,
  clicked: false,
  error: null,
  macroItems: [],
  nutrients: []
}

//reducer to change state for each action

const itemReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'ITEM_ID_INCOMING': {
      return Object.assign({}, state, {
        macroItems: action.payload
      });
    }

    case'NUTRIENTS_INCOMING': {
      return Object.assign({}, state, {
        nutrients: action.payload
      })
    }

    case 'FETCH_ITEMS_PENDING': {
      return Object.assign({}, state, {fetching: true});
    }

    case 'FETCH_ITEMS_REJECTED': {
      return Object.assign({}, state, {fetching: false, error: action.payload});
    }

    case 'FETCH_ITEMS_FULFILLED': {
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        items: action.payload
      }) 
    }

    case 'POST_ITEM_PENDING': {
      return Object.assign({}, state, {posting: true}); 
    }

    case 'POST_ITEM_REJECTED': {
      return Object.assign({}, state, {posting: false, error: action.payload});
    }

    case 'POST_ITEM_FULFILLED': {
      return Object.assign({}, state, {
        posting: false,
        posted: true,
        items: state.items.concat(action.payload)
      })
    }

    case 'UPDATE_ITEM_PENDING': {
      return Object.assign({}, state, {updating: true});
    }

    case 'UPDATE_ITEM_REJECTED': {
      return Object.assign({}, state, {updating: false, error: action.payload});
    }

    case 'UPDATE_ITEM_FULFILLED': {
      return Object.assign({}, state, {
        updating: false,
        updated: true,
        items: state.items.map(item => {
          return item.id === action.payload[0].id ? item = action.payload[0] : item;
        })
      });
    }

    case 'DELETE_ITEM_PENDING': {
      return Object.assign({}, state, {deleting: true});
    }

    case 'DELETE_ITEM_REJECTED': {
      return Object.assign({}, state, {deleting: false, error: action.payload});
    }

    case 'DELETE_ITEM_FULFILLED': {
      return Object.assign({}, state, {
        deleting: false,
        deleted: true,
        items: state.items.filter(item => {
          return item.id === Number(action.payload.id) ? null : item;
        })
      })
    }
  }
  
  return state;
}

export default itemReducer; 