import type {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";

export type resultType = {
  accessToken?: string;
};

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface PureHttpError extends AxiosError {
  isCancelRequest?: boolean;
}

// TODO PureHttpRequestConfig 废弃
export interface PureHttpResponse extends AxiosResponse {
  config: PureHttpRequestConfig;
}

export interface PureHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: PureHttpRequestConfig) => void;
  beforeResponseCallback?: (response: PureHttpResponse) => void;
}

export default class PureHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig
  ): Promise<T>;
  post<T, P>(url: string, params?: T): Promise<P>;
  get<T, P>(url: string, params?: T): Promise<P>;
}
