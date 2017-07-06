import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import * as model from '../model/models';
import { Http } from '../services/Http';
import { LoaderApi } from './LoaderApi';

import config from '../config';

export class PeerApi {

  constructor(private http: Http) {}

  public get(params: model.PeerQueryParams) {
    return this.http.get('/peers/get', params, model.PeerResponse);
  }

  public list(params?: model.PeerQueryParams) {
    return this.http.get('/peers', params, model.PeerResponse);
  }

  /* Return the better peer based on synced blocks */
  public findGoodPeer(): Observable<model.Peer> {
    return Observable.create((observer) => {
      const networkType = model.NetworkType[this.http.network.type].toLowerCase();
      const peersList = config.networks[networkType].peers;

      const blockList = [];

      const loader = new LoaderApi(this.http);

      peersList.forEach((element, index) => {
        loader
          .synchronisationStatus(`http://${element}/api`)
          .subscribe((status) => {

            blockList.push([element, status.blocks]);

            // when find a good peer or at the end
            if (status.blocks == 0 || peersList.length -1 == index) {
              blockList.sort((a, b) => a[1] < b[1] ? 1 : -1); // sort by better to the worst
              const host = blockList[0][0].split(':');

              const peer: model.Peer = new model.Peer;
              peer.ip = host[0];
              peer.port = host[1];

              observer.next(peer);
              observer.complete();
            }
          }, (e) => Observable.empty());
      })
    })
  }

}
