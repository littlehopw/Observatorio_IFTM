
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Inicial state
const initialState = {
  images: [{ id: '1', uri: 'https://scontent.fudi1-2.fna.fbcdn.net/v/t31.18172-8/16113476_1048373305267286_1048077865783499369_o.jpg?_nc_cat=111&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeErXjZtRu-W2ypmG5rjjm2KAZGEMOx4UNkBkYQw7HhQ2UaMIbHVhal_D0uvSWwHyCcodKWB6oB54nqOYmMRNuFG&_nc_ohc=PRX9dtJ67mwQ7kNvgFEgzUz&_nc_ht=scontent.fudi1-2.fna&oh=00_AYAN6tt0gqgYxZtcxXAahKx8WlEszk9ej4UF3aXaxBD1Vw&oe=66B2DC73' }]
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_IMAGE':
      return {
        ...state,
        images: [...state.images, action.payload]
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(rootReducer);

const StoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default StoreProvider;
