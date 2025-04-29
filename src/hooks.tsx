import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "./redux/store";
import { useState, useCallback } from "react";
import { toShortDateString } from "./utils/utils";

export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useToggle: (initial?: boolean) => [state: boolean, toggle: () => void] = (initial = false) => {
    const [state, setState] = useState<boolean>(initial);
    const toggle = useCallback(() => setState((s) => !s), []);
    return [state, toggle];
};

export function useDateInput(initial: string = "") {
    const [value, setValue] = useState(toShortDateString(initial));
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
    return {value, onChange};
}