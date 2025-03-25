import { PrivateLayout } from "@/components/common/private-layout/private-layout";
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'], weight: ['300', '400', '600', '700'] })
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={`${nunito.className}`}>
      <PrivateLayout>
        {children}
      </PrivateLayout>
    </div>
  );
};

export default Layout;
