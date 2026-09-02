import * as runtime from "react/jsx-runtime";

type MdxComponents = Record<string, unknown>;

export function VeliteMdxContent({
  code,
  components,
}: {
  code: string;
  components?: MdxComponents;
}) {
  const Component = new Function(code)({ ...runtime }).default;
  return <Component components={components} />;
}
