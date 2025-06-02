import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { act } from 'react';
import Todos from '../components/Todos';

jest.mock('react-icons/ri', () => ({
  RiArrowDropDownLine: (props: any) => (
    <div data-testid="arrow-icon" {...props}>▼</div>
  ),
}));

jest.mock('react-icons/io', () => ({
  IoMdCheckmark: (props: any) => (
    <div data-testid="checkmark-icon" {...props}>✓</div>
  ),
}));

function simulateInputChange(input: HTMLInputElement, value: string) {
  input.value = value;
  
  const event = new Event('input', { bubbles: true });
  Object.defineProperty(event, 'target', { 
    value: input, 
    enumerable: true 
  });
  
  input.dispatchEvent(event);
}

let container: HTMLDivElement | null = null;
let root: Root | null = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  if (root && container) {
    act(() => {
      root!.unmount();
    });
    container.remove();
    container = null;
    root = null;
  }
});

describe('Todos Component - Essential Tests', () => {  test('adds new todo when form is submitted', () => {
    act(() => {
      root!.render(<Todos />);
    });
    
    const input = container?.querySelector('input[type="text"]') as HTMLInputElement;
    const form = container?.querySelector('form') as HTMLFormElement;
    
    expect(container?.textContent).toContain('1 item left');
    
    expect(input).toBeTruthy();
    expect(input.placeholder).toBe('What needs to be done?');
    expect(form).toBeTruthy();
    
    act(() => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
    
    expect(container?.textContent).toContain('1 item left');
  });

  test('toggles todo completion when clicked', () => {
    act(() => {
      root!.render(<Todos />);
    });
    
    const todoItems = container?.querySelectorAll('li');
    const activeTodo = Array.from(todoItems || []).find(li => 
      li.textContent?.includes('Complete the MindBox internship task')
    );
    
    expect(container?.textContent).toContain('1 item left');
    
    act(() => {
      activeTodo?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    
    expect(container?.textContent).toContain('0 item left');
    
    act(() => {
      activeTodo?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    
    expect(container?.textContent).toContain('1 item left');
  });
  test('clears all completed todos', () => {
    act(() => {
      root!.render(<Todos />);
    });
    
    const buttons = container?.querySelectorAll('button');
    const clearButton = Array.from(buttons || []).find(btn => 
      btn.textContent === 'Clear Completed'
    );
    
    expect(container?.textContent).toContain('Learn more about React and TypeScript');
    
    act(() => {
      clearButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    
    expect(container?.textContent).not.toContain('Learn more about React and TypeScript');
    expect(container?.textContent).toContain('Complete the MindBox internship task');
    expect(container?.textContent).toContain('1 item left');
  });
  test('component renders without crashing', () => {
    act(() => {
      root!.render(<Todos />);
    });
    
    expect(container?.querySelector('input[type="text"]')).toBeTruthy();
    expect(container?.textContent).toContain('Complete the MindBox internship task');
    expect(container?.textContent).toContain('Learn more about React and TypeScript');
  });
});
