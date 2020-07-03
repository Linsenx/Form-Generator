import React from "react";
import { Form } from "antd";
import { useLocalStore } from "mobx-react";
import { GInput, GObject, GList } from "./elements";
import { GSchema } from "./type";

export interface FormGeneratorProps {
  value?: any;
  schema: GSchema[];
  onChange: (data: any) => any;
}
export const FormGenerator: React.FC<FormGeneratorProps> = props => {
  const { schema, value, onChange } = props;
  const store = useLocalStore(() => ({
    data: {} as any
  }));

  return (
    <Form layout="vertical">
      {genFields(
        schema,
        {
          onChange(key: string, data: any) {
            console.log("Receive new data, key:", key, "data:", data);
            store.data[key] = data;
            onChange(store.data);
          }
        },
        value
      )}
    </Form>
  );
};

const initialValues: { [key: string]: any } = {
  array: [],
  object: {}
};
export interface FieldEvents {
  onChange: (key: string, data: any) => any;
}
export function genFields(
  schema: GSchema[],
  events: FieldEvents,
  values?: any
) {
  return schema.map(s => {
    const value = values ? values[s.label] : undefined;
    const field = genField(s, events, value);
    return field;
  });
}
function genField(schema: GSchema, events: FieldEvents, value?: any) {
  let E: any = null;
  let props: any = {
    label: schema.label,
    onChange: events.onChange
  };

  if (value !== undefined) {
    props.value = value;
  }

  switch (schema.type) {
    case "input":
      E = GInput;
      break;
    case "object":
      E = GObject;
      props = {
        ...props,
        schema: schema.items!
      };
      break;
    case "array":
      E = GList;
      props = {
        ...props,
        schema: schema.items!,
        childUseIndexAsName: schema.props && schema.props.childUseIndexAsName
      };
      break;
    default:
      E = GInput;
  }

  return (
    <Form.Item key={schema.label} label={schema.label}>
      {/* {element} */}
      {React.cloneElement(<E />, props)}
    </Form.Item>
  );
}
