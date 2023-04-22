import { CircularProgress } from "@mui/material";
import Styles from "./Loader.module.css";

export const Loader = () => <div className={Styles.loader}><CircularProgress className='loader' color="inherit" /></div>