import type { FC } from "react";
import { Fragment, useState, useEffect } from "react";
import classNames from "classnames";
import { AppstoreOutlined, BorderOutlined } from "@ant-design/icons";
import { FaAngleDown } from "react-icons/fa6";
import { useSidebar } from "../layouts/MainLayout";

type MenuItem = {
  id: string;
  title: string;
  children?: MenuItem[];
  spacing?: boolean;
};

export type { MenuItem };

const menuItems: MenuItem[] = [
  { id: "1", title: "Dashboard" },
  { id: "2", title: "Pages" },
  {
    id: "3",
    title: "Projects",
    children: [
      { id: "31", title: "Submenu" },
      { id: "32", title: "Submenu" },
      { id: "33", title: "Submenu" },
    ],
  },
  {
    id: "4",
    title: "Menu",
    children: [
      { id: "41", title: "Submenu" },
      { id: "42", title: "Submenu" },
      { id: "43", title: "Submenu" },
    ],
  },
  { id: "5", title: "Menu" },
  { id: "6", title: "Menu2" },
  {
    id: "7",
    title: "Menu3",
    children: [
      { id: "71", title: "Submenu" },
      { id: "72", title: "Submenu" },
      {
        id: "73",
        title: "Submenu",
        children: [
          { id: "731", title: "Submenu" },
          { id: "732", title: "Submenu" },
          {
            id: "733",
            title: "Submenu",
            children: [
              { id: "7331", title: "Submenu" },
              { id: "7332", title: "Submenu" },
              { id: "7333", title: "Submenu" },
            ],
          },
        ],
      },
    ],
  },
  { id: "8", title: "Menu" },
];

const Sidebar: FC = () => {
  const { sidebarOpened, isLargeScreen, topItems } = useSidebar();

  const [items, setItems] = useState<MenuItem[]>(menuItems);

  const [itemsStatus, setItemsStatus] = useState<Record<string, boolean>>({});

  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (!isLargeScreen) {
      setItems((prevItems) => {
        topItems[topItems.length - 1].spacing = true;
        const itemsToAdd = topItems.filter(
          (item) => !prevItems.some((inItem) => inItem.id === item.id),
        );
        return [...itemsToAdd, ...prevItems];
      });
    } else {
      setItems((prevItems) => {
        const filteredItems = prevItems.filter(
          (item) => !topItems.some((inItem) => inItem.id === item.id),
        );
        return filteredItems;
      });
    }
  }, [isLargeScreen, topItems]);

  useEffect(() => {
    setItemsStatus(initialItems(menuItems));
  }, []);

  const initialItems = (items: MenuItem[]): Record<string, boolean> => {
    const initItemsStatus: Record<string, boolean> = {};
    const setAllOpen = (items: MenuItem[]) => {
      items.forEach((item) => {
        if (item.children) {
          initItemsStatus[item.id] = true;
          setAllOpen(item.children);
        }
      });
    };
    setAllOpen(items);
    return initItemsStatus;
  };

  const toggleItem = (id: string) => {
    setItemsStatus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSidebar = () => {
    setExpanded((curr) => !curr);
  };

  const sidebarClass = classNames(
    "h-full",
    "max-w-64",
    "border-r",
    "z-50",
    "bg-white",
    "transition-transform",
    "duration-300",
    "fixed",
    "top-0",
    "bottom-0",
    {
      "translate-x-0": sidebarOpened,
      "-translate-x-full": !sidebarOpened,
      sticky: sidebarOpened && isLargeScreen,
      fixed: !sidebarOpened,
      "top-0": !sidebarOpened,
      "bottom-0": !sidebarOpened,
      "min-w-64": expanded && isLargeScreen,
    },
  );

  const controlBarClass = classNames(
    "group",
    "absolute",
    "right-0",
    "top-1/2",
    "z-10",
    "flex",
    "h-16",
    "w-8",
    "-translate-y-1/2",
    "translate-x-full",
    "cursor-pointer",
    "items-center",
    "justify-center",
    {
      "rotate-0": expanded,
      "rotate-180": !expanded,
      hidden: !sidebarOpened,
    },
  );

  const itemTextClass = classNames({
    "overflow-hidden": true,
    "flex-auto": true,
    "whitespace-nowrap": true,
    hidden: !expanded,
  });

  const renderItems = (items: MenuItem[], depth: number = 0) => {
    return (
      <div
        className={
          depth === 0 ? "scrollbar flex-auto overflow-y-auto p-3" : undefined
        }
      >
        {items.map((item) => (
          <Fragment key={item.id}>
            <div
              key={item.id}
              className={`${item.spacing ? "mb-6" : "mb-2"} flex cursor-pointer items-center justify-center gap-2 rounded-lg p-2 hover:bg-gray-200`}
              style={{
                paddingLeft: expanded ? `${(depth + 1) * 0.75}rem` : undefined,
              }}
              onClick={() => {
                item.children && toggleItem(item.id);
              }}
            >
              {item.children ? (
                <AppstoreOutlined className="text-xl text-indigo-500" />
              ) : (
                <BorderOutlined className="text-xl text-indigo-500" />
              )}
              <span
                className={`${itemTextClass} ${item.children ? "font-medium" : "font-normal"}`}
              >
                {item.title}
              </span>
              {item.children && (
                <FaAngleDown
                  className={`${!itemsStatus[item.id] ? "-rotate-90" : ""} ${!expanded ? "hidden" : ""} text-xs text-indigo-300 duration-200`}
                />
              )}
            </div>
            {item.spacing && (
              <div className="mb-6 h-px w-full bg-gray-200"></div>
            )}
            {item.children &&
              itemsStatus[item.id] &&
              renderItems(item.children, depth + 1)}
          </Fragment>
        ))}
      </div>
    );
  };

  return (
    <aside className={sidebarClass}>
      <nav className="relative flex h-full flex-col">
        <div className={controlBarClass} onClick={toggleSidebar}>
          <div className="flex h-10 w-6 flex-col items-center">
            <div className="h-5 w-1 translate-y-0.5 rounded-full bg-gray-200 group-hover:rotate-12 group-hover:bg-gray-500"></div>
            <div className="h-5 w-1 -translate-y-0.5  rounded-full bg-gray-200 group-hover:-rotate-12 group-hover:bg-gray-500"></div>
          </div>
        </div>
        {renderItems(items)}
        <div className="p-3 text-center">版权信息</div>
      </nav>
    </aside>
  );
};

export default Sidebar;
