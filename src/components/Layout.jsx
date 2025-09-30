import DashboardNav from "./DashboardNav";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className="">
      <Nav />
      <div className=" m-auto">{children}</div>
    </div>
  );
}
