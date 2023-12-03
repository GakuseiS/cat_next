type ReqError = {
  statusCode: number;
  body: any;
};

export const getErrorData = (error: Error): ReqError => {
  return JSON.parse(error?.message);
};
