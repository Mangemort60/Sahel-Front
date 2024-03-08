// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import formReducer from '../slices/formSlice'

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
})

// Type pour l'état racine et le dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
