import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface RequestConfig extends AxiosRequestConfig {}
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Response<T = any> extends AxiosResponse<T> {}

// Essa classe foi para desacoplar o axios do projeto
// Possibilitando assim utilizar qualquer lib para as requisi'ões no futuro
export class Request {
  constructor(private request = axios) {}

  public get<T>(url: string, config: RequestConfig = {}): Promise<Response<T>> {
    return this.request.get<T, Response<T>>(url, config);
  }

  // Este método é estatico pois nao utiliza o this da classe pra nada
  public static isRequestError(error: AxiosError): boolean {
    return !!(error.response && error.response.status);
  }
}