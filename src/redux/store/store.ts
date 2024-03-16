import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import formReducer from '../slices/formSlice'
// Importez d'autres reducers ici si nécessaire

// Configuration globale de Redux Persist
const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['currentStep', 'isLoading'], // Exclure certains champs de la persistance au niveau de l'état global
}

const rootReducer = combineReducers({
  // Incluez ici tous vos reducers
  form: formReducer,
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
