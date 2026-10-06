import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextareaAutosize } from './TextareaAutosize';
import { touchTextFloor } from './Field';
import { Textarea } from './Textarea';
import { Input } from './Input';

/** iOS zooms into a focused text field under 16px, and an installed PWA never zooms back out,
 *  so every text-entry primitive carries the touch floor. */
describe('touch text floor', () => {
  it('holds the shared fields at the floor', () => {
    render(
      <>
        <Input aria-label="input" />
        <Textarea aria-label="textarea" />
        <TextareaAutosize aria-label="autosize" />
      </>,
    );

    expect(screen.getByLabelText('input')).toHaveClass('text-sm', touchTextFloor);
    expect(screen.getByLabelText('textarea')).toHaveClass('text-sm', touchTextFloor);
    expect(screen.getByLabelText('autosize')).toHaveClass(touchTextFloor);
  });

  it('keeps the title variant at its heading size on touch', () => {
    render(<Input variant="title" aria-label="title" />);
    const field = screen.getByLabelText('title');

    expect(field).toHaveClass('text-2xl', 'touch:text-2xl');
    expect(field).not.toHaveClass(touchTextFloor);
  });
});
