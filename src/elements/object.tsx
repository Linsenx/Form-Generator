import React, { useEffect } from "react";
import { Button, Modal, Form } from "antd";
import { ModalProps } from "antd/lib/modal";
import { GElementprops, GSchema } from "../type";
import { genFields } from "../FormGenerator";
import { action } from "mobx";
import { useLocalStore, useObserver, observer } from "mobx-react";
import { EditTwoTone } from "@ant-design/icons";

interface GObjectModalProps extends ModalProps {
  value: any;
  schema: GSchema[];
  onChange: (data: any) => any;
  onClose: () => void;
}
const GObjectModal: React.FC<GObjectModalProps> = observer(props => {
  const { value, schema, onChange, onClose, visible, ...restProps } = props;
  const cache = useLocalStore(() => ({
    data: value as any
    // _data: {} as any,
    // startEdit() {
    //   cache._data = toJS(cache.data);
    // },
    // cancelEdit() {
    //   cache.data = cache._data;
    // }
  }));

  // useLayoutEffect(() => {
  //   if (visible) {
  //     cache.startEdit();
  //   }
  // }, [visible, cache]);

  return useObserver(() => {
    return (
      <Modal
        visible={visible}
        closable={false}
        footer={
          <Button
            type="primary"
            onClick={() => {
              onChange(cache.data);
              onClose();
            }}
          >
            确认
          </Button>
        }
        {...restProps}
      >
        <Form layout="vertical">
          {genFields(
            schema,
            {
              onChange(key: string, data: any) {
                // if (key === null) {
                //   cache.data = data;
                //   return;
                // }
                cache.data[key] = data;
              }
            },
            cache.data
          )}
        </Form>
      </Modal>
    );
  });
});

interface GObjectProps extends GElementprops {
  schema: GSchema[];
  suffix?: React.ReactNode;
}
const GObject: React.FC<GObjectProps> = props => {
  const { value = {}, onChange, label, schema, suffix } = props;

  const store = useLocalStore(() => ({
    data: {} as any,
    modalVisiable: false,
    openModal() {
      store.modalVisiable = true;
    },
    closeModal() {
      store.modalVisiable = false;
    }
  }));

  // const store = useLocalStore(
  //   source => ({
  //     data: props.value as any,
  //     modalVisiable: false,
  //     openModal() {
  //       store.modalVisiable = true;
  //     },
  //     closeModal() {
  //       store.modalVisiable = false;
  //     }
  //   }),
  //   props
  // );

  return useObserver(() => {
    const usedTitle = `编辑元素 ${label}`;
    return (
      <div>
        <Button
          icon={<EditTwoTone />}
          style={{ minWidth: 200 }}
          onClick={store.openModal}
        >
          {usedTitle}
        </Button>
        <GObjectModal
          value={value}
          schema={schema}
          title={usedTitle}
          visible={store.modalVisiable}
          onClose={store.closeModal}
          onChange={data => {
            store.data = data;
            onChange(label, store.data);
          }}
        />
        {suffix && suffix}
      </div>
    );
  });
};

export { GObject };
