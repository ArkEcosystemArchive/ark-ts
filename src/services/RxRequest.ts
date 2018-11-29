import { Observable } from 'rxjs/Observable';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';

/** Based on @waldojeffers/rx-request. */
export class RxRequest {

  private req: AxiosInstance;
  public get;
  public post;
  public put;

  constructor(options: any) {
    const headers = {
      ...options.headers,
      'Content-Type': 'application/json',
    };

    this.req = axios.create({
      ...options,
      headers,
    });

    this.get = this.toObservable(this.req.get);
    this.post = this.toObservable(this.req.post);
    this.put = this.toObservable(this.req.put);
  }

  private toObservable(method: any): (url: string, AxiosRequestConfig) => Observable<any> {

    return (url: string, options: AxiosRequestConfig): Observable<any> => {
      return Observable.create((observer) => {
        method(url, options)
          .then((res) => {
            if (res.status < 200 || res.status >= 300) {
              observer.error({
                ...res.data
              });
            } else {
              observer.next(res.data);
              observer.complete();
            }
          })
          .catch((err) => {
            observer.error(err);
            observer.complete();
          });
      });
    };
  }
}
