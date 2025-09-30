export default function SidebarMenu({ active, setActive }) {
  const menuItems = [
    "Пропайл",
    "Борлуулалт",
    "Бүтээгдэхүүн",
    "Захиалгын жагсаалт",
  ];

  return (
    <div className="flex flex-col gap-2 text-gray-700">
      {menuItems.map((item) => (
        <button
          key={item}
          onClick={() => setActive(item)}
          className={`w-full text-left py-2.5 px-3 rounded-md transition ${
            active === item
              ? "bg-blue-50 text-blue-600 font-medium"
              : "hover:bg-gray-50"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
