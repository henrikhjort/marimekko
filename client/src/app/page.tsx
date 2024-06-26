import { ProductProvider } from '@/context/ProductContext';
import ProfileMenu from "@/components/auth/ProfileMenu";
import Header from '@/components/LookBook/Header';
import ProductCatalog from '@/components/LookBook/ProductCatalog';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start w-full">
      {/*<ProfileMenu />*/}
      <Header h1Title="Pre-Spring 24 Fashion" h4Title="COLLECTION LOOKBOOK" />
      <ProductProvider>
        <ProductCatalog />
      </ProductProvider>
    </main>
  );
}
