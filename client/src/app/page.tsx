import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import { AuthProvider } from "@/context/AuthContext";
import ProfileMenu from "@/components/ProfileMenu";
import Header from '@/components/LookBook/Header';
import ImageGrid from '@/components/LookBook/ImageGrid';

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
        <section className="lookbook-content flex flex-col w-full md:px-8 px-2">
          <div className="lookbook-content-rows flex flex-2 flex-col md:flex-row md:space-x-8 h-1/3">
            <div className="lookbook-content-left flex flex-1 items-center justify-center">
              <ImageGrid />
            </div>
            <div className="lookbook-content-left flex flex-1 bg-purple-500">
              oikea
            </div>
          </div>
        </section>
      </main>
      </AuthProvider>
    </MantineProvider>
  );
}
