import { Height } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

export default function Loading() {
    return(
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        </div>
    )
}