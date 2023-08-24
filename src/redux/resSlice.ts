import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface IquestionProps {
    // addText: string;
    // question: { id: number, me: string, you: string }[];
    answerInLine: string;
}

const initialState: IquestionProps = {
    answerInLine: ""
    // question: [],
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
