import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { sepolia} from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = "71aae411baa36b9efd4f551ff59c8694"

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [sepolia]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig