import Main from "./main/1_head/Main"
import HowTo from "./main/2_body/HowTo"
import Carousel from "./main/2_body/Carousel";
import WhereToGo from "./main/3_foot/WhereToGo"
import TourListPage from "./main/3_foot/tour/TourListPage";
import MainCarousel from "./main/2_body/MainCarousel";
import PlanDrawer from "./plan/PlanDrawer";
function App() {
    return(
        <>
            <Main /> 
            <HowTo/>
            <Carousel/>
            <WhereToGo/>
            <TourListPage/>  
            <PlanDrawer/>
        </>
    )
}

export default App;
