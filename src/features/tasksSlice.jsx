import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// create initialState

const initialState = {
    tasks: [],
    loading: false,
    error: null,
    status: "All" // Complated, To Do, Processing
}

// get data using create async thunk

const fetchTodo = createAsyncThunk('tasks/fetchTodo', async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos?_limit=5'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return data.map(task => ({
        id: task.id,
        title: task.title,
        description: '',
        status: task.completed ? 'Completed' : 'To Do'
    }))
})

// create slice

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodo.pending, (state) => {
            state.loading = true
        }).addCase(fetchTodo.fulfilled, (state, action) => {
            state.loading = false
            state.tasks = action.payload
        }).addCase(fetchTodo.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

// export reducers and actions

export default tasksSlice.reducer