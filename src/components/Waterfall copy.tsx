import type { FC } from "react";
import { useRef, useEffect, useState } from "react";
import { useSize, useRequest } from "ahooks";
import { Spin } from "antd";
import { getItemService } from "../services/items";
import { useMainElement } from "../layouts/MainLayout";

type WaterfallItem = {
  id: string;
  src: string;
  srcset: string;
  title: string;
  description: string;
  width: number;
  height: number;
  color: string;
};

type ItemPosition = {
  width: number;
  height: number;
  left: number;
  top: number;
};

const Waterfall: FC = () => {
  const xx = useMainElement();

  console.log(xx);

  const itemWidthBase: number = 236;
  const gutterBase: number = 16;

  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  const placeholderSize = useSize(placeholderRef);

  const columnCount = useRef<number>(0);
  const columnHeights = useRef<number[]>([]);

  const [positions, setPositions] = useState<ItemPosition[]>([]);
  const [containerSize, setContainerSize] = useState<{
    containerWidth: number;
    containerHeight: number;
  }>();

  const calculatePositions = (
    items: WaterfallItem[],
    placeholderWidth: number,
  ) => {
    const positions: ItemPosition[] = [];

    let itemWidth = itemWidthBase;
    const gutter = gutterBase;

    // correct
    if (placeholderWidth < 2 * (itemWidth + gutter)) {
      const width = Math.floor(placeholderWidth / 2) - gutter;
      itemWidth = width < 0 ? 0 : width;
    }

    // compute
    const newColumnCount = Math.floor(placeholderWidth / (itemWidth + gutter));

    // initialize
    columnCount.current = newColumnCount;
    columnHeights.current = new Array(columnCount.current).fill(0);

    for (const item of items) {
      const aspectRatio = item.width / item.height;
      const itemHeight = itemWidth / aspectRatio;

      const minColHeight = Math.min(...columnHeights.current);
      const minColIndex = columnHeights.current.indexOf(minColHeight);

      positions.push({
        width: itemWidth,
        height: itemHeight,
        left: (itemWidth + gutter) * minColIndex,
        top: minColHeight,
      });

      columnHeights.current[minColIndex] += itemHeight + gutter;
    }

    const containerWidth = (itemWidth + gutter) * columnCount.current - gutter;
    const containerHeight = Math.max(...columnHeights.current);

    setPositions(positions);
    setContainerSize({ containerWidth, containerHeight });
  };

  const { loading, data = {} } = useRequest(() => getItemService());

  const { list } = data as {
    list: WaterfallItem[];
    total: number;
  };

  useEffect(() => {
    if (!list || list.length === 0) return;
    const placeholderWidth = placeholderRef.current!.clientWidth;
    calculatePositions(list, placeholderWidth);
  }, [list, placeholderSize?.width]);

  return (
    <>
      {/* <video
        className="hwa kVc MIw L4E"
        poster="https://i.pinimg.com/236x/47/6e/44/476e44ecd9f7141dea6cf119c9ddfe8d.jpg"
        preload="auto"
        src="blob:https://www.pinterest.com/4dc1235b-0bef-4b99-9844-fc24a5af710e"
      ></video> */}
      {loading && (
        <div className="p-3 text-center">
          <Spin />
        </div>
      )}
      <div
        className="relative mx-auto my-0"
        ref={containerRef}
        style={{
          width: containerSize?.containerWidth,
          height: containerSize?.containerHeight,
        }}
      >
        {!loading &&
          list.length > 0 &&
          list.map((item, index) => {
            return (
              <div
                key={item.id}
                className="absolute overflow-hidden rounded-lg"
                style={{
                  left: positions[index]?.left,
                  top: positions[index]?.top,
                  width: positions[index]?.width,
                  height: positions[index]?.height,
                  backgroundColor: item.color,
                }}
              >
                <a href={`/post/${item.id}`} className="d-block">
                  <img
                    className="h-full w-full object-cover"
                    src={item.src}
                    alt={item.title}
                    srcSet={item.srcset}
                    loading="lazy"
                  />
                </a>
              </div>
            );
          })}
      </div>
      <div ref={placeholderRef}></div>
    </>
  );
};

export default Waterfall;
