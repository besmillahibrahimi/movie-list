import type { PropsWithChildren } from "react";

type Props<T> = PropsWithChildren & {
  data: T[];
};
export function List<T>({ data, children }: Readonly<Props<T>>) {
  return <div>{children}</div>;
}
