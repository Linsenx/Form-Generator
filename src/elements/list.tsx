import React from "react";
import { Button } from "antd";
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import { GElementprops, GSchema } from "../type";
import { useLocalStore, useObserver } from "mobx-react";
import { GObject } from "./object";

interface GListProps extends GElementprops {
  schema: GSchema[];
  childUseIndexAsName?: boolean;
}
const GList: React.FC<GListProps> = props => {
  const {
    value = [],
    onChange,
    label,
    schema,
    childUseIndexAsName = false
  } = props;
  const store = useLocalStore(() => ({
    list: value as any,
    counter: value.length,
    indexToKey: value.map((_: any, i: number) => i) as number[],
    getKey(index: number) {
      return this.indexToKey[index] || 0;
    },
    addItem() {
      store.counter++;
      store.indexToKey.push(store.counter);
      store.list.push({});
      onChange(label, store.list);
    },
    removeItem(index: number) {
      store.list.splice(index, 1);
      store.indexToKey.splice(index, 1);
      onChange(label, store.list);
    },
    updateItem(index: number, data: any) {
      store.list[index] = data;
      onChange(label, store.list);
    }
  }));

  return useObserver(() => {
    return (
      <div>
        {store.list.map((_: string, index: number) => {
          return (
            <div key={store.getKey(index)} style={{ marginBottom: 15 }}>
              <GObject
                label={index as any}
                schema={schema}
                onChange={store.updateItem}
                suffix={
                  <Button
                    type="text"
                    icon={<DeleteTwoTone />}
                    style={{ marginLeft: 8 }}
                    onClick={() => store.removeItem(index)}
                  >
                    删除
                  </Button>
                }
                value={store.list[index]}
              />
            </div>
          );
        })}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={store.addItem}
          block
        >
          新增元素
        </Button>
      </div>
    );
  });
};

export { GList };
