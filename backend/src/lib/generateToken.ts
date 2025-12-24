import { randomUUID } from 'crypto'

export const generateUniqueToken = () => {
    return randomUUID()
}