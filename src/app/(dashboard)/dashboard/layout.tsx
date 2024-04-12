import SideBar from "@/components/dashboard/SideBar";

export default function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex ">
        <div>
            <SideBar></SideBar>
        </div>
        <div className="ml-[250px]">{children}</div>
      </div>
    </>
  );
}
