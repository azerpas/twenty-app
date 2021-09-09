import { Account, MnemonicKey, CHAINS, AnchorEarn, NETWORKS, DENOMS, BalanceOutput } from "@anchor-protocol/anchor-earn";

class Anchor {
    private account: Account | MnemonicKey;
    private earn: AnchorEarn;

    constructor(mnemonic?: string)
    {
        if(mnemonic)
            this.account = new MnemonicKey({
                mnemonic: mnemonic
            });
        else
            this.account = new Account(CHAINS.TERRA);
        this.earn = new AnchorEarn({
            chain: CHAINS.TERRA,
            network: NETWORKS.COLUMBUS_4, // TODO: set to TEQUILA if dev == true
            privateKey: this.account.privateKey
        });
    }

    async getUserBalance(): Promise<BalanceOutput>
    {
        return this.earn.balance({
            currencies: [DENOMS.UST],
        });
    }
}

export default Anchor;