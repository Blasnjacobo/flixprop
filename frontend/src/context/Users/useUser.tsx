import { useContext } from "react";
import userContext from "./userContext";

export default function useUser() {
    return useContext(userContext);
}