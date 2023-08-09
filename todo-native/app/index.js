import { AppContext } from "./Context/Context";
import Routers from "./routers";

const Home = () => {
  return (
    <AppContext>
      <Routers/>
    </AppContext>
  );
};

export default Home;
