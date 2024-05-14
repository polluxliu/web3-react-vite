import type { FC } from "react";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { HOME_PATH, MANAGE_PATH } from "../router";
import { useResponsive, useSize, useHover, useEventListener } from "ahooks";
import logo from "../assets/react.svg";
import {
  FaBars,
  FaGripVertical,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa6";
import Sidebar, { MenuItem } from "../components/Sidebar";

const topItems = new Array(9).fill(null).map((_, index) => ({
  id: String(index + 200),
  title: `gorithms ${index + 1}`,
}));

type SidebarContextType = {
  sidebarOpened: boolean;
  isLargeScreen: boolean;
  topItems: MenuItem[];
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

const MainLayout: FC = () => {
  const responsive = useResponsive();

  const isLargeScreen = responsive.sm;

  const menuRef = useRef<HTMLUListElement>(null);

  const menuContainerRef = useRef<HTMLDivElement>(null);

  const menuSize = useSize(menuRef);

  const [sidebarOpened, setSidebarOpened] = useState(isLargeScreen);

  const [overlayDisplayed, setOverlayDisplayed] = useState(false);

  const [menuX, setMenuX] = useState(0);

  const [maxMenuX, setMaxMenuX] = useState(0);

  const isHovering = useHover(menuContainerRef);

  useEventListener(
    "wheel",
    (event: WheelEvent) => {
      if (isHovering) {
        event.preventDefault();

        if (event.deltaX !== 0) {
          // 大于0：向左移动滚轮
          // 小于0：向右移动滚轮时
          event.deltaX > 0
            ? moveToLeft(event.deltaX)
            : moveToRight(-event.deltaX);
        }
      }
    },
    { target: menuContainerRef, passive: false },
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

      // Calculate the total width of all items
      let totalWidth = 0;
      children.forEach((child) => {
        totalWidth += child.offsetWidth;
      });

      const difference = menu.clientWidth - totalWidth;
      setMaxMenuX(difference < 0 ? difference : 0);
    }
  }, [menuSize]);

  const moveToLeft = (steps: number = 200) => {
    // console.log("moveToLeft", steps, maxMenuX);
    setMenuX((current) => Math.max(current - steps, maxMenuX));
  };

  const moveToRight = (steps: number = 200) => {
    // console.log("moveToRight", steps, maxMenuX);
    setMenuX((current) => (current + steps >= 0 ? 0 : current + steps));
  };

  return (
    <div className="flex h-screen flex-col">
      <nav className="sticky top-0 z-30 flex h-16 flex-none items-center justify-center gap-x-8 border-b bg-white px-8 shadow-sm">
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
        <div
          className="relative hidden overflow-hidden sm:flex sm:flex-auto sm:items-stretch sm:justify-center sm:self-stretch"
          ref={menuContainerRef}
        >
          <div
            id="right-arrow"
            className={`absolute right-0 z-50 flex h-full items-stretch ${menuX === maxMenuX ? "hidden" : ""}`}
          >
            <button
              className="bg-white p-2 text-black hover:bg-gray-100"
              onClick={() => {
                moveToLeft();
              }}
            >
              <FaAngleRight className="text-lg text-indigo-300" />
            </button>
          </div>
          <div
            id="left-arrow"
            className={`absolute left-0 z-50 flex h-full items-stretch ${menuX === 0 ? "hidden" : ""}`}
          >
            <button
              className="bg-white p-2 text-black hover:bg-gray-100"
              onClick={() => {
                moveToRight();
              }}
            >
              <FaAngleLeft className="text-lg text-indigo-300" />
            </button>
          </div>
          <ul
            className="w-full transition-transform duration-300 sm:flex sm:items-center"
            style={{ transform: `translateX(${menuX}px)` }}
            ref={menuRef}
          >
            {topItems.map((item) => (
              <li key={item.id} className="px-2">
                <Link
                  to={MANAGE_PATH}
                  className={`block whitespace-nowrap rounded-lg bg-gray-100 px-3 py-1.5 font-medium transition-colors hover:bg-gray-200`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
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
      <div className="flex flex-auto overflow-hidden">
        <SidebarContext.Provider
          value={{ sidebarOpened, isLargeScreen, topItems }}
        >
          <Sidebar />
        </SidebarContext.Provider>
        <main className="scrollbar flex-auto overflow-auto p-8">
          <Outlet />
        </main>
      </div>
      {/* <footer>这里是footer</footer> */}
      {overlayDisplayed && (
        <div
          className="fixed inset-0 z-30 bg-gray-500 opacity-50 transition-opacity duration-300"
          onClick={() => {
            setSidebarOpened((prev) => !prev);
          }}
        ></div>
      )}
    </div>
  );
};

export default MainLayout;
