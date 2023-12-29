import React from "react"

export default function AuthLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <nav>Auth</nav>
            <h1>Auth</h1>
            {children}
        </section>
    )
}