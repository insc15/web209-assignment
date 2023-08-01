import Section from "@/components/layout/section";

function PageAdminDashboard() {
    return (
        <Section className="px-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold flex items-center mb-4">
                    <span className="w-1 h-6 bg-primary block mr-2"></span>
                    <span>Admin Dashboard</span>
                </h1>
            </div>
        </Section>
    );
}

export default PageAdminDashboard;