import { Network, NetworkType, Http, PeerApi } from './src';

const n = Network.getDefault(NetworkType.Devnet);
PeerApi.findGoodPeer(n).subscribe((data) => {
  console.log(data);
});
