import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";


// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.reown.com
const projectId = "1b71d46e9c1be156ac05bf666c0c8861";

// 2. Create a metadata object - optional
const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://example.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

const scrollTestnet = {
  id: 534351,
  name: "Scroll Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rpc.scroll.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "ScrollScan",
      url: "https://sepolia.scrollscan.com",
    },
  },
  testnet: true,
};
  

// 3. Set the networks
const networks = [scrollTestnet];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
