import { createSlice } from '@reduxjs/toolkit';

export const tableUserSlice = createSlice({
  name: "table_users",
  initialState: {
    data: [
      {
        id: "1",
        name: "Emily Smith",
        email: "djsdn",
        city: "Dushanbe",
        status: false,
        phone: "987654321"
      },
      {
        id: "2",
        name: "John Doe",
        email: "johndoe@example.com",
        city: "Khujand",
        status: true,
        phone: "995432678"
      },
      {
        id: "3",
        name: "Amina Karimova",
        email: "amina.karimova@example.com",
        city: "Bakhtar",
        status: true,
        phone: "33445"
      },
      {
        id: "4",
        name: "Ali Khamidov",
        email: "alikhamidov@example.com",
        city: "Dushanbe",
        status: false,
        phone: "915876543"
      },
      {
        id: "5",
        name: "Lana Ivanova",
        email: "lana.ivanova@example.com",
        city: "Khujand",
        status: true,
        phone: "92334567"
      },
      {
        id: "6",
        name: "David Miller",
        email: "david.miller@example.com",
        city: "Bakhtar",
        status: false,
        phone: "939876543"
      }
    ],
    filteredData: [], 
    selectedUser:null
  },
  reducers: {
    del: (state, action) => {
      state.data = state.data.filter((tableuser) => tableuser.id !== action.payload);
      state.filteredData = state.filteredData.filter((tableuser) => tableuser.id !== action.payload);
    },
    add: (state, action) => {
      const newUser = {
        id: Date.now().toString(),
        name: action.payload.name,
        email: action.payload.email,
        city: action.payload.city,
        status: action.payload.status,
        phone: action.payload.phone,
      };
      state.data = [...state.data, newUser];
      state.filteredData = [...state.filteredData, newUser]; 
    },
    update: (state, action) => {
      state.data = state.data.map((users) =>
        users.id === action.payload.id ? { ...users, ...action.payload } : users
      );
      state.filteredData = state.filteredData.map((users) =>
        users.id === action.payload.id ? { ...users, ...action.payload } : users
      ); 
    },
    filterData: (state, action) => {
      const { statusFilter, cityFilter, search } = action.payload;
      state.filteredData = state.data.filter((user) => {
        const matchesStatus =
          statusFilter === "All status" ||
          (statusFilter === "Active" ? user.status : !user.status);
        const matchesCity =
          cityFilter === "All cities" ||
          user.city.toLowerCase() === cityFilter.toLowerCase();
        const searching = JSON.stringify(user)
          .toLowerCase()
          .trim()
          .includes(search.toLowerCase().trim());
        return matchesStatus && matchesCity && searching;
      });
    },
    show:(state,action)=>{
      state.selectedUser = state.data.find((user) => user.id == action.payload) || null
    }
  },
});

export const { del, add, update, filterData,show } = tableUserSlice.actions;
export default tableUserSlice.reducer;
