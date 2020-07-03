import * as React from "react";
import { FormGenerator } from "./FormGenerator";
import { useLocalStore, observer, useObserver } from "mobx-react";
import { GSchema } from "./type";

const schema0: GSchema[] = [
  {
    label: "学生列表",
    type: "array",
    items: [
      {
        label: "学号",
        type: "input"
      },
      {
        label: "姓名",
        type: "input"
      },
      {
        label: "选修课程",
        type: "array",
        items: [
          {
            label: "课程代号",
            type: "input"
          },
          {
            label: "课程名",
            type: "input"
          }
        ]
      }
    ]
  },
  {
    label: "班级信息",
    type: "object",
    items: [
      {
        label: "班级号",
        type: "input"
      },
      {
        label: "任课老师",
        type: "input"
      }
    ]
  }
];

function App() {
  const store = useLocalStore(() => ({
    data: {},
    json: "",
    schema: schema0,
    _schema: [
      {
        label: "name2",
        type: "input"
      }
    ] as GSchema[]
  }));

  const handleDataChange = (data: any) => {
    store.data = data;
    store.json = JSON.stringify(data, null, 2);
  };

  return useObserver(() => {
    return (
      <div className="App" style={{ padding: 50 }}>
        <FormGenerator
          schema={store.schema}
          value={store.data}
          onChange={handleDataChange}
        />
        <pre>{store.json}</pre>
        <button
          onClick={() => {
            [store.schema, store._schema] = [store._schema, store.schema];
          }}
        >
          Switch Schema
        </button>
      </div>
    );
  });
}

export default observer(App);
