import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { Outlet, useOutletContext, Link } from "react-router-dom";
import { HOME_PATH, MANAGE_PATH } from "../router";
import { useResponsive, useSize } from "ahooks";
import logo from "../assets/react.svg";
import { FaBars, FaGripVertical } from "react-icons/fa6";
import { MenuItem } from "../components/Sidebar";

const topItems = new Array(9).fill(null).map((_, index) => ({
  id: index + 200,
  title: `nav ${index + 1}`,
}));

type SidebarContext = {
  sidebarOpened: boolean;
  isLargeScreen: boolean;
  topItems: MenuItem[];
};

// eslint-disable-next-line react-refresh/only-export-components
export function useSidebar() {
  return useOutletContext<SidebarContext>();
}

const MainLayout: FC = () => {
  const responsive = useResponsive();

  const isLargeScreen = responsive.sm;

  const menuRef = useRef<HTMLUListElement>(null);

  const menuSize = useSize(menuRef);

  const menuItemWidths = useRef<number[]>([]);

  const [sidebarOpened, setSidebarOpened] = useState(isLargeScreen);

  const [overlayDisplayed, setOverlayDisplayed] = useState(false);

  const [hiddenMenuItems, setHiddenMenuItems] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    setSidebarOpened(isLargeScreen);
  }, [isLargeScreen]);

  useEffect(() => {
    if (sidebarOpened && !isLargeScreen) setOverlayDisplayed(true);
    else setOverlayDisplayed(false);
  }, [sidebarOpened, isLargeScreen]);

  useEffect(() => {
    const menu = menuRef.current;
    if (menu && menuSize) {
      const children = Array.from(menu.children) as HTMLElement[];

      if (menuItemWidths.current.length === 0)
        menuItemWidths.current = children.map((child) => child.offsetWidth);

      console.log(menuItemWidths);

      let totalWidth = 0;
      // Calculate the total width of all items
      menuItemWidths.current.forEach((childWidth) => {
        totalWidth += childWidth;
      });

      const newHiddenIndexes = new Set<number>();
      // Hide items from the end if the total width exceeds the ul clientWidth
      if (totalWidth > menu.clientWidth) {
        for (let i = menuItemWidths.current.length - 1; i >= 0; i--) {
          totalWidth -= menuItemWidths.current[i];
          newHiddenIndexes.add(i);
          if (totalWidth <= menu.clientWidth) break;
        }
      }

      setHiddenMenuItems(newHiddenIndexes);
    }
  }, [menuSize]);

  return (
    <>
      <nav className="sticky top-0 z-30 flex h-16 items-center justify-center gap-x-8 border-b bg-white px-8 shadow-sm">
        <button
          className="rounded-full p-2 text-black hover:bg-gray-100 sm:hidden"
          onClick={() => {
            setSidebarOpened((prev) => !prev);
          }}
        >
          <FaBars className="text-lg" />
        </button>
        <div className="flex flex-auto justify-center sm:flex-none">
          <Link to={HOME_PATH}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul
          className="hidden overflow-hidden sm:flex sm:flex-auto sm:items-center sm:justify-center sm:self-stretch"
          ref={menuRef}
        >
          {topItems.map((item, index) => (
            <li
              key={item.id}
              className={`px-4 ${hiddenMenuItems.has(index) ? "hidden" : ""}`}
            >
              <Link
                to={MANAGE_PATH}
                className={`block whitespace-nowrap border-2 border-white p-2 hover:border-b-indigo-500`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-none items-center justify-center">
          <button className="rounded-full p-2 text-black hover:bg-gray-100 sm:hidden">
            <FaGripVertical className="text-lg" />
          </button>
          <div className="hidden gap-x-2 sm:inline-flex">
            <button className="w-20 rounded-full bg-indigo-500 py-1 text-white">
              注册
            </button>
            <button className="w-20 rounded-full bg-indigo-500 py-1 text-white">
              登录
            </button>
          </div>
        </div>
      </nav>
      <Outlet context={{ sidebarOpened, isLargeScreen, topItems }} />
      {/* <footer>这里是footer</footer> */}
      {overlayDisplayed && (
        <div
          className="fixed inset-0 z-30 bg-gray-500 opacity-50 transition-opacity duration-300"
          onClick={() => {
            setSidebarOpened((prev) => !prev);
          }}
        ></div>
      )}
    </>
  );
};

export default MainLayout;
