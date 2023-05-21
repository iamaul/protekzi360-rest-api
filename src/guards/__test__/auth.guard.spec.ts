import { AuthGuard } from '../auth.guard';
import { ConfigFirebase } from '../../config/config.firebase';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let configFirebase: ConfigFirebase;

  beforeEach(() => {
    configFirebase = new ConfigFirebase();
    authGuard = new AuthGuard(configFirebase);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should return true if valid idToken is provided', async () => {
    // Mock the necessary dependencies and inputs
    const mockIdToken = 'valid-id-token';
    const mockClaims = { uid: 'user-uid' };

    const mockContext = {
      getArgs: jest.fn().mockReturnValue([
        {
          headers: { authorization: `Bearer ${mockIdToken}` },
        },
      ]),
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({}),
    };

    configFirebase.setup = jest.fn().mockReturnValue({
      auth: jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(mockClaims),
      }),
    });

    const canActivateResult = await authGuard.canActivate(mockContext as any);

    expect(canActivateResult).toBe(true);
    expect(mockContext.getRequest().uid).toBe(mockClaims.uid);
  });

  it('should throw UnauthorizedException if invalid idToken is provided', async () => {
    // Mock the necessary dependencies and inputs
    const mockIdToken = 'invalid-id-token';

    const mockContext = {
      getArgs: jest.fn().mockReturnValue([
        {
          headers: { authorization: `Bearer ${mockIdToken}` },
        },
      ]),
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({}),
    };

    configFirebase.setup = jest.fn().mockReturnValue({
      auth: jest.fn().mockReturnValue({
        verifyIdToken: jest
          .fn()
          .mockRejectedValue(new Error('Invalid idToken')),
      }),
    });

    try {
      await authGuard.canActivate(mockContext as any);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });
});
