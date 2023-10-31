/* eslint-disable no-var */
export class ScheduleManager {
	// eslint-disable-next-line @typescript-eslint/require-await
	public async init() {
		console.log('> init ScheduleManager ');
	}
}

declare global {
	var _scheduleManager: ScheduleManager;
}

global._scheduleManager = global._scheduleManager || new ScheduleManager();
export const scheduleManager = global._scheduleManager;
