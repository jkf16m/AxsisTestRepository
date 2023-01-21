import React from "react";

interface IIfRendererProps {
    condition: boolean;
    trueRender: () => React.ReactNode;
    falseRender: () => React.ReactNode;
}
const IfRenderer = (props: IIfRendererProps) => {
    if (props.condition) {
        return <>{props.trueRender}</>;
    }
    else {
        return <>{props.falseRender}</>;
    }
}
export default IfRenderer;