import React from 'react';
import { render } from '@testing-library/react';
import Home from './page';

// Mock the data module to return some fake data for testing
jest.mock('../../utils/data', () => ({
  getAllCats: () => Promise.resolve({ data: { categories: [] } }),
  getSubCategoryProperties: () => Promise.resolve(null),
}));

describe('Home', () => {
  test('renders without errors', async () => {
    const { getByTestId } = render(<Home searchParams={{}} />);
    expect(getByTestId('home')).toBeInTheDocument();
  });

  test('renders categories dropdown', async () => {
    const { getByText } = render(<Home searchParams={{}} />);
    expect(getByText('التصنيفات الرئيسية')).toBeInTheDocument();
  });

  test('renders subcategories dropdown when category is selected', async () => {
    const { getByText } = render(
      <Home searchParams={{ category: '1' }} />,
    );
    expect(getByText('التصنيفات الفرعية')).toBeInTheDocument();
  });

  test('does not render subcategories dropdown when category is not selected', async () => {
    const { queryByText } = render(<Home searchParams={{}} />);
    expect(queryByText('التصنيفات الفرعية')).toBeNull();
  });

  test('renders properties dropdown when subcategory is selected', async () => {
    const { getByText } = render(
      <Home searchParams={{ category: '1', subCategory: '15' }} />,
    );
    expect(getByText('Subcategory Properties')).toBeInTheDocument();
  });

  test('does not render properties dropdown when subcategory is not selected', async () => {
    const { queryByText } = render(
      <Home searchParams={{ category: '1' }} />,
    );
    expect(queryByText('Subcategory Properties')).toBeNull();
  });
});
