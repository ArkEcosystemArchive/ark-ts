/**
 * @module api
 */
/** Peer related API calls. */

import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import * as model from '../model';
import Http from '../services/Http';
import LoaderApi from './LoaderApi';

import config from '../config';

export default class PeerApi {

  constructor(private http: Http) {}

  /**
   * Get peer by ip and port.
   */
  public get(ip: string, port: number): Observable<model.PeerResponse> {
    const params = {ip, port};
    return this.http.get<model.PeerResponse>('/peers/get', params);
  }

  /**
   * Get peers list by parameters.
   */
  public list(params?: model.PeerQueryParams): Observable<model.PeerResponse> {
    return this.http.get<model.PeerResponse>('/peers', params);
  }

  /**
   * Find good peer ordered by synchronized blocks.
   */
  public findGoodPeer(): Observable<model.Peer> {
    return Observable.create((observer) => {
      const networkType = model.NetworkType[this.http.network.type].toLowerCase();
      const peersList = config.networks[networkType].peers;

      const blockList = [];

      const loader = new LoaderApi(this.http);

      peersList.forEach((element, index) => {
        loader
          .synchronisationStatus(`http://${element}`)
          .subscribe((status) => {
            blockList.push([element, status.blocks]);

            // when find a good peer or at the end
            if (status.blocks === 0 || peersList.length - 1 === index) {
              blockList.sort((a, b) => a[1] < b[1] ? 1 : -1); // sort by better to the worst
              const host = blockList[0][0].split(':');

              const peer: model.Peer = new model.Peer;
              peer.ip = host[0];
              peer.port = host[1];

              observer.next(peer);
              observer.complete();
            }
          }, (e) => Observable.empty());
      });
    });
  }

}
