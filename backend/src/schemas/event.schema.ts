import z from 'zod'

export interface EventSchema {
    PAGE_VIEW: String
    CLICK: String
    SCROLL: String
}

export const EventRequest = z.object({
    UUID: z.string().nonempty(),
    event: z.string().nonoptional(),
})