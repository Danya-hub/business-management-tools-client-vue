export const isProduction: boolean = process.env.NODE_ENV === 'production';
export const appName: string = import.meta.env.VITE_APP_NAME;
export const reCaptchaKey: string = import.meta.env.VITE_APP_RECAPTCHA_KEY;
export const googleClientId: string = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
export const githubClientId: string = import.meta.env.VITE_APP_GITHUB_CLIENT_ID;