export const logError = (
  scope: string,
  error: any,
  extra?: Record<string, any>
) => {
  console.error(`❌ [${scope}]`, {
    message: error?.message,
    error,
    ...extra,
  });
};
