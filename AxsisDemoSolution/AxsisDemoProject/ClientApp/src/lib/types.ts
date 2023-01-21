import { ReactNode, RefObject } from "react";

type RenderFunctionRef<T>= (ref: RefObject<T>)=>ReactNode;

export default RenderFunctionRef;