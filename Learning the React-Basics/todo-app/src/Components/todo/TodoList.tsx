import './TodoList.css';

export default function TodoList() {

    const today = new Date();  
    const targetDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5);
    const targetDate2 = new Date(today.getFullYear() + 1, today.getMonth() + 1, today.getDate() + 4);
    const targetDate3 = new Date(today.getFullYear() + 2, today.getMonth() + 2, today.getDate() + 3);
    const todos = [
        { id: 1, description: 'Learn Frontend', dueDate: targetDate, done: false },
        { id: 2, description: 'Learn Backend', dueDate: targetDate2, done: false },
        { id: 3, description: 'Learn Fullstack', dueDate: targetDate3, done: false },
    ];

    return (
        <div className="container">
            <h1>Todo List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Done?</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>
                            <td>{todo.dueDate.toLocaleDateString()}</td>
                            <td>{todo.done ? 'Yes' : 'No'}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}