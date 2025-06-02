import React, { useState, useMemo, useCallback } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IoMdCheckmark } from 'react-icons/io';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

const FILTERS = [
  { key: 'all' as const, label: 'All' },
  { key: 'active' as const, label: 'Active' },
  { key: 'completed' as const, label: 'Completed' },
] as const;

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Complete the MindBox internship task', completed: false },
    { id: 2, text: 'Learn more about React and TypeScript', completed: true },
  ]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [toggle, setToggle] = useState(false);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const remaining = useMemo(() => 
    todos.filter(todo => !todo.completed).length, 
    [todos]
  );

  const handleAdd = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      setTodos(prev => [
        ...prev,
        { id: Date.now(), text: trimmedInput, completed: false },
      ]);
      setInput('');
    }
  }, [input]);
  const handleToggle = useCallback((id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleClearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  const handleToggleView = useCallback(() => {
    setToggle(prev => !prev);
  }, []);

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);
  const isClearDisabled = useMemo(() => 
    todos.every(todo => !todo.completed), 
    [todos]
  );

  return (
    <div className="max-w-xl mx-auto bg-white shadow">
      <form onSubmit={handleAdd} className="flex mb-4 border-b-2">
        <RiArrowDropDownLine 
          fontSize={50} 
          className={`opacity-45 transition-all duration-300 ease-in-out cursor-pointer ${
            toggle ? "rotate-180" : ""
          }`} 
          onClick={handleToggleView} 
        />
        <input
          className="flex-1 font-raleway border-none rounded px-3 py-2 outline-none"
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </form>

      <ul className={`mb-4 divide-y transition-all duration-300 ease-in-out overflow-hidden ${
        toggle ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
      }`}>
        {filteredTodos.length === 0 ? (
          <li className="text-gray-400 text-center py-4">No tasks</li>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
            />
          ))
        )}
      </ul>

      <div className="flex justify-between items-center ml-2 p-2 border-t-2">
        <span className="text-[15px] text-gray-600">
          {remaining} item left
        </span>
        
        <div className="flex gap-2 mx-14">
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`text-gray-600 px-1 text-[15px] rounded ${
                filter === f.key ? 'border-[1px] border-pink-300' : ''
              }`}
              onClick={() => handleFilterChange(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        
        <button
          className="text-[15px] hover:underline cursor-pointer text-gray-600 disabled:opacity-50"
          onClick={handleClearCompleted}
          disabled={isClearDisabled}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

const TodoItem = React.memo(({ todo, onToggle }: TodoItemProps) => {
  const handleClick = useCallback(() => {
    onToggle(todo.id);
  }, [todo.id, onToggle]);

  return (
    <li
      className="flex items-center gap-2 py-2 px-4 cursor-pointer group"
      onClick={handleClick}
    >
      <span className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
        todo.completed 
          ? 'border-pink-300 bg-pink-100' 
          : 'border-gray-300'
      }`}>
        <IoMdCheckmark
          className={`text-pink-300 transition-all duration-300 ease-in-out ${
            todo.completed ? 'opacity-100' : 'opacity-0'
          }`}
          fontSize={20}
        />
      </span>

      <span className={`text-xl ${
        todo.completed ? 'line-through text-gray-400' : ''
      }`}>
        {todo.text}
      </span>
    </li>
  );
});
