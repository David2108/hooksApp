import * as z from 'zod';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface TaskState {
    todos: Todo[];
    length: number;
    completed: number;
    pending: number;
}

export type TaskAction =
    { type: 'ADD_TODO', payload: string }
    | { type: 'TOGGLE_TODO', payload: number }
    | { type: 'REMOVE_TODO', payload: number };

const TodoSchema = z.object({
    id: z.number(),
    text: z.string(),
    completed: z.boolean()
})

const TaskStateSchema = z.object({
    todos: z.array(TodoSchema),
    length: z.number(),
    completed: z.number(),
    pending: z.number()
})

export const getTasksInitialState = () => {

    const localStorageState = localStorage.getItem('tasks-state');

    if (!localStorageState) {
        return {
            todos: [],
            length: 0,
            completed: 0,
            pending: 0,
        }
    }

    const result = TaskStateSchema.safeParse(JSON.parse(localStorageState));
    if (result.error) {
        console.error(result.error);
        return {
            todos: [],
            length: 0,
            completed: 0,
            pending: 0,
        }
    }

    return result.data;
}

/*
 * - Es una función que siempre debe devolver un nuevo estado basado en los argumentos
 * - Recibe dos argumentos:
 *      - El estado anterior
 *      - La acción que se va a ejecutar
 * - Debe ser una función pura
 * - Siempre debe devolver algo del mismo tipo que el estado
 * - No se debe modificar el estado original, se debe crear un nuevo estado
 * - Siempre debe devolver un nuevo estado o en caso de que no se pueda devolver un nuevo estado, debe devolver el estado original
 *
 * Acción
 * - Debe tener un tipo
 * - Debe tener un payload, es opcional
 * - El segundo argumento a una acción es el payload
 * - El payload es el que se va ha usar para crear el nuevo estado
 */
export const tasksReducer = (state: TaskState, action: TaskAction): TaskState => {

    switch (action.type) {
        case "ADD_TODO": {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
            }
            const todos = [...state.todos, newTodo]
            return {
                ...state,
                todos: todos,
                length: todos.length,
                pending: todos.filter(todo => !todo.completed).length,
            };
        }
        case "TOGGLE_TODO": {
            const updatedTodos = state.todos.map(todo => {
                if (todo.id === action.payload) {
                    return {...todo, completed: !todo.completed}
                }
                return todo;
            });
            return {
                ...state,
                todos: updatedTodos,
                completed: updatedTodos.filter(todo => todo.completed).length,
                pending: updatedTodos.filter(todo => !todo.completed).length,
            }
        }
        case "REMOVE_TODO": {
            const updatedTodos = state.todos.filter(todo => todo.id !== action.payload)
            return {
                ...state,
                todos: updatedTodos,
                length: updatedTodos.length,
                completed: updatedTodos.filter(todo => todo.completed).length,
                pending: updatedTodos.filter(todo => !todo.completed).length,
            };
        }
        default:
            return state;
    }
}