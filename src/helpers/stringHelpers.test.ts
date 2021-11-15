import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { truncateString, stringToArray } from './stringHelpers';

describe('stringHelpers tests', (): void => {
  test('string turns into array', (): void => {
    const arrayString = 'Dit, is, een, test';
    const result = stringToArray(arrayString);
    expect(result).toHaveLength(4);
  });

  test('truncate string', (): void => {
    const longString =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    const result = truncateString(longString, 5);
    expect(result).toMatch('Lorem...');
  });
});
