// client/src/services/scheduleService.js

const API_URL = 'http://localhost:3000/schedules'; // Update with your actual schedule service URL

const scheduleService = {
    createSchedule: async (scheduleData) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scheduleData),
        });
        if (!response.ok) {
            throw new Error('Failed to create schedule');
        }
        return await response.json();
    },
    getSchedules: async () => {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to retrieve schedules');
        }
        return await response.json();
    },
};

export default scheduleService;