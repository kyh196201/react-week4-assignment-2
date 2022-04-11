import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import InputContainer from './InputContainer';

jest.mock('react-redux');

function renderInputContainer() {
  return render((
    <InputContainer />
  ));
}

describe('InputContainer', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    name: '브루클린 버거',
    category: '양식',
    address: '서래마을',
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders add button, the restaurant name, category and address', () => {
    const { queryByText, queryByDisplayValue } = renderInputContainer();

    expect(queryByText(/등록/)).not.toBeNull();
    expect(queryByDisplayValue(/브루클린 버거/)).not.toBeNull();
    expect(queryByDisplayValue(/양식/)).not.toBeNull();
    expect(queryByDisplayValue(/서래마을/)).not.toBeNull();
  });

  it('changes the restaurant name', () => {
    const { getByPlaceholderText } = renderInputContainer();

    fireEvent.change(getByPlaceholderText('이름'), {
      target: { value: '더조은 참치' },
    });

    expect(dispatch).toBeCalledWith({
      type: 'updateName',
      payload: {
        name: '더조은 참치',
      },
    });
  });

  it('changes the restaurant category', () => {
    const { getByPlaceholderText } = renderInputContainer();

    fireEvent.change(getByPlaceholderText('분류'), {
      target: { value: '일식' },
    });

    expect(dispatch).toBeCalledWith({
      type: 'updateCategory',
      payload: {
        category: '일식',
      },
    });
  });

  it('changes the restaurant address', () => {
    const { getByPlaceholderText } = renderInputContainer();

    fireEvent.change(getByPlaceholderText('주소'), {
      target: { value: '압구정' },
    });

    expect(dispatch).toBeCalledWith({
      type: 'updateAddress',
      payload: {
        address: '압구정',
      },
    });
  });

  it('adds a new restaurant', () => {
    const { getByText } = renderInputContainer();

    fireEvent.click(getByText(/등록/));

    expect(dispatch).toBeCalledWith({ type: 'addRestaurant' });
  });
});
