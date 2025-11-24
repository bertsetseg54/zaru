import { useTheme } from "@/context/ThemeContext";
import DashboardNav from "./DashboardNav";
import Nav from "./Nav";
import Sun from "./Sun";
import Moon from "./Moon";

export default function Layout({ children }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="">
      <Nav />
      <div className=" m-auto">{children}</div>
    </div>
  );
}
