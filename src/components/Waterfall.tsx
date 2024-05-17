import { useRef, useEffect, useState, type FC } from "react";
import { useSize, useDebounceFn, useRequest } from "ahooks";
import { Spin, Empty } from "antd";
import { getItemService } from "../services/items";

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
  const placeholderRef = useRef<HTMLDivElement>(null);
  const placeholderSize = useSize(placeholderRef);

  const itemWidthBase: number = 236;
  const gutterBase: number = 16;

  const columnCount = useRef<number>(0);
  const columnHeights = useRef<number[]>([]);

  const [positions, setPositions] = useState<ItemPosition[]>([]);
  const [containerSize, setContainerSize] = useState<{
    containerWidth: number;
    containerHeight: number;
  }>();

  /**
   * 空数据指示器
   * @returns
   */
  const indicator = () => {
    return (
      <div className="py-3 text-center">
        {loading ? (
          <Spin />
        ) : (
          !hasMore &&
          (pageNumber.current === 1 ? <Empty /> : <span>没有更多数据了</span>)
        )}
      </div>
    );
  };

  /**
   * 瀑布流布局的计算逻辑
   * @param items
   * @param placeholderWidth
   */
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

  /**
   * 数据列表
   */
  const [items, setItems] = useState<WaterfallItem[]>([]);

  /**
   * 当前页码
   */
  const pageNumber = useRef<number>(1);

  /**
   * 服务器端是否还有更多数据
   */
  const [hasMore, setHasMore] = useState<boolean>(true);

  /**
   * 数据获取
   */
  const { loading, run: loadItems } = useRequest(
    async () => {
      const data = await getItemService({ pageNumber: pageNumber.current });
      return data;
    },
    {
      manual: true,
      onSuccess: (result) => {
        // 如果请求遇到了异常，返回的可能是undefined。（详情查看ajax.ts）
        const { list = [] } = (result || {}) as {
          list: WaterfallItem[];
          total: number;
        };
        if (list.length > 0) {
          setItems((prev) => prev.concat(list));
          ++pageNumber.current;
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      },
    },
  );

  /**
   * 滚动条滚动时执行
   */
  const { run: loadMore } = useDebounceFn(
    () => {
      const wrapperElement = placeholderRef.current!.parentElement;
      const scrollTop = wrapperElement!.scrollTop; // scrollTop: 已滚动的距离
      const clientHeight = wrapperElement!.clientHeight; // clientHeight: div的可视区域高度
      const scrollHeight = wrapperElement!.scrollHeight; // scrollHeight: div的总内容高度
      const bottomDistance = scrollHeight - scrollTop - clientHeight; // 计算距离底部的距离
      // console.log(scrollTop, clientHeight, scrollHeight, bottomDistance);
      if (!loading && bottomDistance <= 300) loadItems();
    },
    { wait: 500 },
  );

  /**
   * 组件加载时执行
   */
  useEffect(loadItems, [loadItems]);

  /**
   * 滚动事件绑定到wrapper
   */
  useEffect(() => {
    const wrapperElement = placeholderRef.current!.parentElement;
    if (hasMore) wrapperElement?.addEventListener("scroll", loadMore);
    return () => wrapperElement?.removeEventListener("scroll", loadMore);
  }, [hasMore, loadMore]);

  /**
   * 布局瀑布流
   */
  useEffect(() => {
    if (!items || items.length === 0) return;
    const placeholderWidth = placeholderRef.current!.clientWidth;
    calculatePositions(items, placeholderWidth);
  }, [items, placeholderSize?.width]);

  return (
    <>
      {/* <video
        className="hwa kVc MIw L4E"
        poster="https://i.pinimg.com/236x/47/6e/44/476e44ecd9f7141dea6cf119c9ddfe8d.jpg"
        preload="auto"
        src="blob:https://www.pinterest.com/4dc1235b-0bef-4b99-9844-fc24a5af710e"
      ></video> */}
      <div
        className="relative mx-auto my-0"
        style={{
          width: containerSize?.containerWidth,
          height: containerSize?.containerHeight,
        }}
      >
        {items.length > 0 &&
          items.map((item, index) => {
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
      {indicator()}
      <div ref={placeholderRef}></div>
    </>
  );
};

export default Waterfall;
