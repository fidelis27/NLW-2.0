import { renderHook, act } from '@testing-library/react-hooks';

import MockAdapter from 'axios-mock-adapter';
import { useAuth, AuthProvider } from '../../hooks/auth';

import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hoook', () => {
  it('should be able to sin in', async () => {
    const apiResponse = {
      user: {
        id: 'user-123',
        name: 'thiago',
        email: 'thiago@email.com',
      },
      token: 'token-123',
    };
    apiMock.onPost('session').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'thiago@email.com',
      password: '123456',
    });

    await waitForNextUpdate();
    expect(setItemSpy).toHaveBeenCalledWith('@proffy:token', apiResponse.token);
    expect(setItemSpy).toHaveBeenCalledWith(
      '@proffy:user',
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user?.email).toEqual('thiago@email.com');
  });

  it('should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@proffy:token':
          return 'token-123';
        case '@proffy:user':
          return JSON.stringify({
            id: 'user-123',
            name: 'thiago',
            email: 'thiago@email.com',
          });
        default:
          return null;
      }
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    expect(result.current.user?.email).toEqual('thiago@email.com');
  });

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@proffy:token':
          return 'token-123';
        case '@proffy:user':
          return JSON.stringify({
            id: 'user-123',
            name: 'thiago',
            email: 'thiago@email.com',
          });
        default:
          return null;
      }
    });
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    act(() => {
      result.current.signOut;
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });
});
