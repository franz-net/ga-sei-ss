import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const dateToUtc = (date: string, timestamp: string) => {
    return dayjs.tz(date, timestamp)
}

const utcToDate = (date: any, timezone: string) => {
    return dayjs.tz(date, timezone).format()
}

export {dateToUtc, utcToDate}