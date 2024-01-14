import MainLayout from "@/components/Layouts/MainLayout/MainLayout";
import Image from "next/image";
import AuthLayout from "@/components/Layouts/AuthLayout/AuthLayout";

export default function AuthLayoutPage({
    children,
}: {
    children: React.ReactNode
}) {
    return <AuthLayout>{children}</AuthLayout>
}