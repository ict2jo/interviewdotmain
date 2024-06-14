import { Button } from "@mui/material";
import Header from "./_components/Header";
import Footer from "./_components/Footer";


export default function Home() {
  return (
    <div>
      <Header />
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Footer />
    </div>
  );
}
