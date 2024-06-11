const config = {
    'Send E-mail': 5,
    'Generate PDF': 10,
    'Upload File': 15,
};

export type ActionType = keyof typeof config;
export const ActionTypes: ActionType[] = Object.keys(config) as ActionType[];
export const MAX_CREDIT: Record<ActionType, number> = config;

export const COMPUTE_CREDIT_TIMER = 15 * 60 * 1000; // 15 minutes
export const EXECUTE_ACTION_TIMER = 15000; // 15 seconds