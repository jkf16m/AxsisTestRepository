import { ReactNode } from "react";

type RenderFunctionRef<T>= (ref: T)=>ReactNode;

export default RenderFunctionRef;