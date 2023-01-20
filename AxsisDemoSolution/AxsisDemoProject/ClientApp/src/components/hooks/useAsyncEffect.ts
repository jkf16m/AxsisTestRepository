import React, { useEffect } from "react";

export const useAsyncEffect = (effect: Function, deps?: React.DependencyList | undefined) => {
    useEffect(() => {
        var returnEffectResult = effect();
        
    }, deps);
}