import home from './index.module.less';
import PinkCookie from "./pinkCookie";
import {useEffect, useState} from "react";
import constants from './const.js';
import useNodeBoundingRect from "../../hooks/useNodeBoundingRect";

const Home = () => {
    const [rect, topActions] = useNodeBoundingRect();
    const [topActionsWidth, setTopActionsWidth] = useState(
        0
    );
    useEffect(() => {
        if (rect && rect.width) {
            // 实际上的高度为：react.width + padding + border-width
            setTopActionsWidth(rect.width);
        }
    }, [rect]);
    return <div className={home.homePage} id={constants.homeId} ref={topActions}>
        <PinkCookie width={topActionsWidth}/>
    </div>
}
export default Home