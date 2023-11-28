import Sidebar from "../_components/Sidebar";

function OrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-20 md:pt-24 px-4 md:max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <div className="flex gap-x-7">
        <div className="w-64 shrink-0 md:block hidden">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
}

export default OrganizationLayout;
