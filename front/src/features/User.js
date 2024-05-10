import { createSlice } from "@reduxjs/toolkit";

export const shiftSlice = createSlice({
    name:"shiftId",
    initialState:{value:{data:""}},
    reducers:{
        setShiftId:(state, action)=>{
            state.value = action.payload
        }
    }
})

export const {setShiftId} = shiftSlice.actions

export default shiftSlice.reducer