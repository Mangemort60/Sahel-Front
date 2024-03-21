import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import formReducer from '../slices/formSlice'
import userReducer from '../slices/userSlice'
import sessionStorage from 'redux-persist/es/storage/session'
// Importez d'autres reducers ici si nécessaire

// Configuration globale de Redux Persist
const rootPersistConfig = {
  key: 'root',
  storage: sessionStorage,
  blacklist: ['currentStep', 'isLoading'], // Exclure certains champs de la persistance au niveau de l'état global
}

const rootReducer = combineReducers({
  // Incluez ici tous vos reducers
  form: formReducer,
  user: userReducer,
  // autres reducers...
})

// Appliquer la persistance au rootReducer avec la configuration globale
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

// Types pour l'état racine et le dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
