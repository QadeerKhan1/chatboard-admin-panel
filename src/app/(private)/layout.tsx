import { PrivateLayout } from "@/components/common/private-layout/private-layout";

const MainPrivateLayout = ({
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

export default MainPrivateLayout;
