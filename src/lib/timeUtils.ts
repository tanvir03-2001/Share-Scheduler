/**
 * Time conversion utilities for client-side
 * Handles conversion between local time and UTC for scheduling
 */

/**
 * Get user's timezone
 */
export function getUserTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Convert local date and time to UTC (Timezone 0)
 * This function properly converts local time to UTC by creating a Date object
 * that represents the local time, then extracting its UTC equivalent
 */
export function convertLocalToUTC(localDate: string, localTime: string, timezone?: string): {
    utcDate: string;
    utcTime: string;
    utcDateTime: Date;
} {
    try {
        const userTimezone = timezone || getUserTimezone();

        // Parse the local date and time components
        const [year, month, day] = localDate.split('-').map(Number);
        const [hours, minutes] = localTime.split(':').map(Number);

        // Create a Date object using local time components
        // This creates a date in the user's local timezone
        const localDateObj = new Date(year, month - 1, day, hours, minutes, 0, 0);

        // Get UTC equivalent - toISOString() converts to UTC
        const utcISOString = localDateObj.toISOString();
        const utcDate = utcISOString.split('T')[0];
        const utcTime = utcISOString.split('T')[1].slice(0, 5);

        // Create UTC Date object for validation
        const utcDateTime = new Date(`${utcDate}T${utcTime}:00.000Z`);

        console.log(`🕐 Time Conversion (Local → UTC):`, {
            local: `${localDate} ${localTime}`,
            timezone: userTimezone,
            utc: `${utcDate} ${utcTime}`,
            utcISO: utcISOString
        });

        return {
            utcDate,
            utcTime,
            utcDateTime
        };
    } catch (error) {
        console.error('Error converting local time to UTC:', error);
        // Fallback to current UTC time
        const now = new Date();
        return {
            utcDate: now.toISOString().split('T')[0],
            utcTime: now.toISOString().split('T')[1].slice(0, 5),
            utcDateTime: now
        };
    }
}

/**
 * Convert UTC date and time to local timezone
 */
export function convertUTCToLocal(utcDate: string, utcTime: string, targetTimezone?: string): {
    localDate: string;
    localTime: string;
    localDateTime: Date;
} {
    try {
        const userTimezone = targetTimezone || getUserTimezone();

        // Create UTC date object
        const utcDateTimeString = `${utcDate}T${utcTime}:00.000Z`;
        const utcDateObj = new Date(utcDateTimeString);

        // Convert to local timezone
        const localDateObj = new Date(utcDateObj.toLocaleString('en-US', { timeZone: userTimezone }));

        const localDate = localDateObj.toISOString().split('T')[0];
        const localTime = localDateObj.toTimeString().slice(0, 5);

        return {
            localDate,
            localTime,
            localDateTime: localDateObj
        };
    } catch (error) {
        console.error('Error converting UTC to local time:', error);
        // Fallback to UTC time
        const now = new Date();
        return {
            localDate: now.toISOString().split('T')[0],
            localTime: now.toISOString().split('T')[1].slice(0, 5),
            localDateTime: now
        };
    }
}

/**
 * Get current date and time in user's timezone
 */
export function getCurrentLocalDateTime(): {
    date: string;
    time: string;
    timezone: string;
    dateFormatted: string;
} {
    const now = new Date();
    const timezone = getUserTimezone();

    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().slice(0, 5);

    const dateFormatted = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: timezone
    });

    return {
        date,
        time,
        timezone,
        dateFormatted
    };
}

/**
 * Format time for display with timezone info
 */
export function formatTimeWithTimezone(date: string, time: string, timezone?: string): string {
    try {
        const userTimezone = timezone || getUserTimezone();
        const dateTimeString = `${date}T${time}:00`;
        const dateObj = new Date(dateTimeString);

        return dateObj.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: userTimezone,
            timeZoneName: 'short'
        });
    } catch (error) {
        console.error('Error formatting time with timezone:', error);
        return `${date} ${time}`;
    }
}

/**
 * Validate if a scheduled time is in the future (Universal Timezone)
 * Converts local time to UTC first, then validates against UTC
 */
export function isScheduledTimeInFuture(localDate: string, localTime: string): boolean {
    try {
        // Convert local time to UTC first
        const utcConversion = convertLocalToUTC(localDate, localTime);

        // Validate the UTC time against current UTC time
        return isUTCScheduledTimeInFuture(utcConversion.utcDate, utcConversion.utcTime);
    } catch (error) {
        console.error('Error validating scheduled time:', error);
        return false;
    }
}

/**
 * Validate if a UTC scheduled time is in the future (Universal Timezone)
 */
export function isUTCScheduledTimeInFuture(utcDate: string, utcTime: string): boolean {
    try {
        const scheduledDateTime = new Date(`${utcDate}T${utcTime}:00.000Z`);
        const now = new Date();

        // Use minimal buffer (10 seconds) to match server validation
        const bufferTime = new Date(now.getTime() + 10000); // 10 seconds buffer

        const isValid = scheduledDateTime > bufferTime;
        const timeDifferenceSeconds = (scheduledDateTime.getTime() - now.getTime()) / 1000;

        console.log(`🌍 Frontend Universal UTC Time Validation:`, {
            utcDate,
            utcTime,
            scheduledDateTime: scheduledDateTime.toISOString(),
            currentTime: now.toISOString(),
            bufferTime: bufferTime.toISOString(),
            isValid,
            timeDifferenceSeconds: Math.round(timeDifferenceSeconds),
            validationMethod: 'Frontend Universal UTC Time Check',
            timezone: 'Universal (UTC)'
        });

        return isValid;
    } catch (error) {
        console.error('Error validating UTC scheduled time:', error);
        return false;
    }
}

/**
 * Get minimum time for scheduling (current time + 1 minute)
 */
export function getMinScheduleTime(): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1); // Add 1 minute buffer
    return now.toTimeString().slice(0, 5);
}

/**
 * Get minimum date for scheduling (today)
 */
export function getMinScheduleDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Get default time for scheduling (current time + 2 minutes)
 */
export function getDefaultScheduleTime(): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 2); // Add 2 minutes
    return now.toTimeString().slice(0, 5);
}
