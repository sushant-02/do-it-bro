export interface OTPSlice {
  email: string;
  otpLoading: boolean;
  setEmail: (text: string) => void;
  sendOTP: (
    email: string,
    navigate?: () => void,
    showFlashMessage?: () => void
  ) => Awaited<Promise<any>>;
}

export interface SafeAreaViewSlice {
  safeAreaHeight: number;
  setSafeAreaHeight: (value: number) => void;
}

export interface AuthSlice {
  refreshToken: string | null;
  accessToken: string | null;
  setTokens: (refreshToken: string, accessToken: string) => void;
}
