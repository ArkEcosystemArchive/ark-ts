import { Observable } from 'rxjs';
import * as request from 'request';

/** Based on @waldojeffers/rx-request. */
export class RxRequest {

  private req: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>;
  public get;
  public post;
  public put;

  constructor(options: any) {
    this.req = request.defaults(options);

    this.get = this.toObservable(this.req.get);
    this.post = this.toObservable(this.req.post);
    this.put = this.toObservable(this.req.put);
  }

  private toObservable(method: any): (url: string, options: request.CoreOptions) => Observable<any> {

    return (url: string, options: request.CoreOptions): Observable<any> => {
      return Observable.create((observer) => {
        let body = '';

        method(url, options)
          .on('response', function onResponse(res) {
            res.setEncoding('utf8');
            if (res.statusCode < 200 || res.statusCode >= 300) {
              this.emit('error', {
                statusCode: res.statusCode,
                statusMessage: res.statusMessage,
              });
            }
          })

          .on('error', (e) => observer.error(e))
          .on('data', (chunk) => body += chunk)
          .on('end', () => {
            observer.next(body);
            observer.complete();
          });
      });
    };
  }
}
