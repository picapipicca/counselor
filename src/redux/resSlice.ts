import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface IquestionProps {
    answerInLine: string;
}

const initialState: IquestionProps = {
    answerInLine: ""
}


export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        storeQuestion: (state, action) => {
            return { ...action.payload };
        },
    }
})
export const { storeQuestion } = questionSlice.actions;

export default questionSlice.reducer;
