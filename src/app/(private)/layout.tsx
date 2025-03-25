import { PrivateLayout } from "@/components/common/private-layout/private-layout";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <PrivateLayout>
            {children}
        </PrivateLayout>
    );
};

export default Layout;
