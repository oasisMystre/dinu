import {
  mplTokenMetadata,
  createFungible,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import { generateSigner, percentAmount } from "@metaplex-foundation/umi";
import { createUmi, type Umi } from "@metaplex-foundation/umi-bundle-defaults";

import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import DinuConfig from "../dinu.json";
import { SPL_TOKEN_2022_PROGRAM_ID } from "./constants";

export default class DinuContract {
  private readonly umi: Umi;

  constructor(cluster: Cluster) {
    this.umi = createUmi(clusterApiUrl(cluster)).use(mplTokenMetadata());
  }

  async createMint() {
    const mint = generateSigner(this.umi);
    await createFungible(this.umi, {
      mint,
      name: DinuConfig.name,
      symbol: DinuConfig.symbol,
      uri: "",
      sellerFeeBasisPoints: percentAmount(0),
      splTokenProgram: SPL_TOKEN_2022_PROGRAM_ID,
    });
  }
}
