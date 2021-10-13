import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('Getflix test suite', () => {
  it('should display the GETFLIX LOGO Text', () => {
    const { getByText } = render(<App />);
    expect(getByText('GETFLIX')).toBeTruthy();
  });
});
