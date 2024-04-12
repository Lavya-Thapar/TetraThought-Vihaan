import { NextRequest, NextResponse } from "next/server";
import { DateTime } from 'luxon';
export async function POST(req: Request) {
    try {
        // Get tasks array from request
        const raw_tasks = await req.json() ;
        const tasks = raw_tasks.tasks;
        

        if (!Array.isArray(tasks)) {
            console.error("Tasks is not an array:", tasks);
            return NextResponse.error();
        }

        // Generate schedule for the tasks
        const schedule = generateSchedule(tasks);

        return NextResponse.json({ schedule });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({});
    }
}

function generateSchedule(tasks: Array<{name: string, deadline: string, duration: number}>): Array<{
    task: string,
    startTime: string,
    endTime: string,
    duration: number
}> {
    // Check if tasks is an array
    if (!Array.isArray(tasks)) {
        throw new Error("Tasks is not an array");
    }

    // Sort tasks by deadline (earliest first) and then by duration (smallest first)
    const sortedTasks = tasks.sort((a, b) => {
        if (a.deadline === b.deadline) {
            return a.duration - b.duration;
        }
        return a.deadline.localeCompare(b.deadline);
    });

    // Initialize schedule
    let schedule: Array<{
        task: string,
        startTime: string,
        endTime: string,
        duration: number
    }> = [];

    // Set initial start time
    let startTime = DateTime.now();

    // Iterate through tasks to calculate schedule
    sortedTasks.forEach((sortedTask) => {
        // Convert deadline string to DateTime object
        const deadline = DateTime.fromISO(sortedTask.deadline);            

        // Calculate duration until deadline
        const timeUntilDeadline = deadline.diff(startTime, 'hours');

        // Calculate the remaining time until deadline after accounting for task duration
        const remainingTimeUntilDeadline = timeUntilDeadline.minus({ hours: sortedTask.duration }).toMillis();

        // If there's enough time remaining until the deadline, schedule the task
        if (remainingTimeUntilDeadline >= 0) {
            // Add task to schedule
            schedule.push({
                task: sortedTask.name,
                startTime: startTime.toISO(),
                endTime: startTime.plus({ hours: sortedTask.duration }).toISO(),
                duration: sortedTask.duration
            });

            // Update start time for next task
            startTime = startTime.plus({ hours: sortedTask.duration });
        }
    });

    return schedule;
}
