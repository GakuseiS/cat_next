type TApiOptions = {
  url: string;
  data?: any;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
  token?: string;
  headers?: Record<string, string>;
  searchParams?: string;
};
