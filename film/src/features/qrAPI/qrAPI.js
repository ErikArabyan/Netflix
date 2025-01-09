import { createAsyncThunk } from '@reduxjs/toolkit'
import { useStringContext } from '../..'

export const qrAPI = createAsyncThunk('qr session', async (uniqueID, email) => {
    const { ipPort } = useStringContext()  
    try {
        const socket = new WebSocket(`ws://${ipPort}/ws/auth/qr-auth/${uniqueID}/${email}/`)
        return socket.data
    } catch (error) {
        return error.response?.data
    }
})
