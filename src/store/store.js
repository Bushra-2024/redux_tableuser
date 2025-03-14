import { configureStore } from '@reduxjs/toolkit'
import tableUserSlice  from './table-users/tableUserSlice'

export const store = configureStore({
	reducer:{
		table_users:tableUserSlice
	},
})