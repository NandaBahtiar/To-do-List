import TodoList from './components/TodoList';
import TodoForm from "./components/TodoForm.jsx";

function App() {
    return (
        // Body background diatur di index.css atau index.html
        <div className="max-w-2xl m-auto w-full content-center  mt-12 bg-white rounded-xl shadow-lg p-6 md:p-8">
            <header className="border-b border-gray-200 pb-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My To-Do List</h1>
                {/* Menggunakan tanggal saat ini */}
                <p className="text-sm text-gray-500 mt-1">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </header>
            <main>
                <TodoForm />
                <TodoList />
            </main>
        </div>
    );
}

export default App;