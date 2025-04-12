import { PrivateLayout } from "@/components/common/private-layout/private-layout";

const TestLayout = ({
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

export default TestLayout;
