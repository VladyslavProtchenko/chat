import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
}

interface UserState {
  user: User | null;
  activeChat: number | null;
}

const initialState: UserState = {
  user: null,
  activeChat: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setActiveChat: (state, action: PayloadAction<number>) => {
      state.activeChat = action.payload;
    },
    clearActiveChat: (state) => {
      state.activeChat = null;
    },
  },
});

export const { setUser, clearUser, setActiveChat, clearActiveChat } = userSlice.actions;
export default userSlice.reducer;
