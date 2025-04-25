import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('font-semibold');
    expect(buttonElement).toHaveClass('theme-bg');
    expect(buttonElement).not.toBeDisabled();
  });

  test('renders with custom variant', () => {
    render(<Button variant="danger">Danger Button</Button>);
    const buttonElement = screen.getByText('Danger Button');
    
    expect(buttonElement).toHaveClass('bg-red-600');
  });

  test('renders with custom size', () => {
    render(<Button size="lg">Large Button</Button>);
    const buttonElement = screen.getByText('Large Button');
    
    expect(buttonElement).toHaveClass('py-3');
    expect(buttonElement).toHaveClass('px-8');
    expect(buttonElement).toHaveClass('text-lg');
  });

  test('handles disabled state', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByText('Disabled Button');
    
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('opacity-50');
    expect(buttonElement).toHaveClass('cursor-not-allowed');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    const buttonElement = screen.getByText('Clickable Button');
    
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled Button</Button>);
    const buttonElement = screen.getByText('Disabled Button');
    
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const buttonElement = screen.getByText('Custom Button');
    
    expect(buttonElement).toHaveClass('custom-class');
  });
});