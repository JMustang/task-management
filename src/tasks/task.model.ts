export interface Task {
    id: string;
    titles: string;
    description: string;
    status: TaskStatus
}

enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}
