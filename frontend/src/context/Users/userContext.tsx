import { createContext } from "react";
import { User } from '../../types/User';

const userContext = createContext<User | undefined>(undefined);
export default userContext;
