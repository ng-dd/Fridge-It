// import axios from 'axios';

// //functions to get items and add items on front end 
// //uses reducers as part of promises to change state

// export function toggleClick() {
//     console.log('hllo')
//     return function(dispatch) {
//     axios.get('/api/items/')
//       .then(({ data }) => {
//         dispatch({type: 'BUTTON_CLICKED', payload: data});
//       })
//       .catch(err => { 
//         dispatch({type: 'BUTTON_NOT_CLICKED', payload: err});
//       });
//   };
// };