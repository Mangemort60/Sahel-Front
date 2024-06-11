import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import formReducer from '../slices/formSlice'
import userReducer from '../slices/userSlice'
import uiReducer from '../slices/uiSlice'
import persistStore from 'redux-persist/es/persistStore'

// Configuration spécifique de Redux Persist pour le formReducer
const formPersistConfig = {
  key: 'form',
  storage: storageSession,
  blacklist: ['currentStep', 'isLoading'], // Exclure certains champs spécifiques du formReducer
}

const userPersistConfig = {
  key: 'user',
  storage: storageSession,
}

const uiPersistConfig = {
  key: 'ui',
  storage: storageSession,
}

// Appliquer la persistance au formReducer avec sa configuration spécifique
const persistedFormReducer = persistReducer(formPersistConfig, formReducer)
const persistedUserReducer = persistReducer(userPersistConfig, userReducer)
const persistedUiReducer = persistReducer(uiPersistConfig, uiReducer)

const rootReducer = combineReducers({
  form: persistedFormReducer, // Utiliser le reducer persisté
  user: persistedUserReducer,
  ui: persistedUiReducer,
  // Pas de configuration spécifique de persistance ici, mais vous pourriez en ajouter une similaire si nécessaire
  // Ajoutez d'autres reducers ici...
})

// Configuration globale de Redux Persist pour le rootReducer
const rootPersistConfig = {
  key: 'root',
  storage: storageSession,
  // Pas besoin de blacklist ici si vous gérez la persistance spécifiquement pour chaque reducer
}

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

// Types pour l'état racine et le dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
