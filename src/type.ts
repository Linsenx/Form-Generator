export interface GElementprops {
  value?: any;
  label: string;
  onChange: (key: any, data: any) => any;
}

export interface GSchema {
  label: string;
  type: "input" | "array" | "object";
  items?: GSchema[];
  props?: any;
}
