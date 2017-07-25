declare var _default: {
    networks: {
        mainnet: {
            bip32: {
                private: number;
                public: number;
            };
            name: string;
            nethash: string;
            token: string;
            symbol: string;
            version: number;
            explorer: string;
            wif: number;
            activePeer: {
                ip: string;
                port: number;
            };
            peers: string[];
        };
        devnet: {
            bip32: {
                public: number;
                private: number;
            };
            name: string;
            nethash: string;
            token: string;
            symbol: string;
            version: number;
            explorer: string;
            wif: number;
            activePeer: {
                ip: string;
                port: number;
            };
            peers: string[];
        };
    };
    blockchain: {
        interval: number;
        delegates: number;
        date: Date;
    };
};
export default _default;
