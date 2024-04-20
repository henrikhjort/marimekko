import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import { AuthProvider } from "@/context/AuthContext";
import { ProductProvider } from '@/context/ProductContext';
import ProfileMenu from "@/components/auth/ProfileMenu";
import Header from '@/components/LookBook/Header';
import ProductCatalog from '@/components/LookBook/ProductCatalog';

const theme = createTheme({
  colors: {
    'brand-black': [
      '#333333', // 50 - lighter
      '#2d2d2d', // 100
      '#262626', // 200
      '#202020', // 300
      '#1a1a1a', // 400
      '#141414', // 500 - base/black
      '#101010', // 600
      '#0c0c0c', // 700
      '#080808', // 800
      '#040404', // 900 - darker
    ],
    'brand-white': [
      '#f7f7f7', // 50 - lighter
      '#f2f2f2', // 100
      '#ededed', // 200 - base/white
      '#e8e8e8', // 300
      '#e3e3e3', // 400
      '#dedede', // 500
      '#d9d9d9', // 600
      '#d4d4d4', // 700
      '#cfcfcf', // 800
      '#cacaca', // 900 - darker
    ],
  },
  primaryColor: 'brand-black',
});


export default function Home() {
  return (
    <MantineProvider theme={theme}>
      <AuthProvider>
      <main className="flex min-h-screen flex-col items-center justify-start w-full bg-brand-white">
        <ProfileMenu />
        <Header />
        <ProductProvider>
          <ProductCatalog />
        </ProductProvider>
      </main>
      </AuthProvider>
    </MantineProvider>
  );
}
