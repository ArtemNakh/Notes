import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { AppDispatch, RootState } from "./store";


/**
 * Хук для отримання dispatch з типом any.
 * Використовується для відправки Redux-екшенів.
 *
 * @returns {any} Redux dispatch
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();


/**
 * Типізований useSelector для роботи з Redux state.
 * Використовується для вибірки даних зі стору.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
