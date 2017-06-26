export default {
  "networks": {
    "mainnet": {
      "name": "mainnet",
      "nethash": "6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
      "token": "ARK",
      "symbol": "Ѧ",
      "version": 0x17,
      "explorer": "https://explorer.ark.io",
      "wif": 0xaa,
      "activePeer": {
        "ip": "node1.arknet.cloud",
        "port": 4001
      }
    },
    "devnet": {
      "name": "devnet",
      "nethash": "6e84d08bd299ed97c212c886c98a57e36545c8f5d645ca7eeae63a8bd62d8988",
      "token": "DEVARK",
      "symbol": "DѦ",
      "version": 0x82,
      "explorer": "https://dexplorer.arkcoin.net",
      "wif": 0xba,
      "activePeer": {
        "ip": "164.8.251.179",
        "port": 4002
      }
    }
  },
  "blockchain": {
    "interval": 8,
    "delegates": 51,
    "date": new Date(Date.UTC(2017,2,21,13,0,0,0))
  }
}
