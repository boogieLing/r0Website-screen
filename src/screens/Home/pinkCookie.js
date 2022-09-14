import home from './index.module.less';
import {useEffect, useState} from "react";
import colors from "tailwindcss/colors";

const drawCircle = (_options) => {
    const options = _options || {}; //获取或定义options对象;

    options.angle = options.angle || [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05];    //定义默认角度1为360度(角度范围 0-1);
    options.color = options.color || '#111';    //定义默认颜色（包括字体和边框颜色）;
    options.lineWidth = options.lineWidth || 20;    //定义默认圆描边的宽度;
    options.num = options.num || 0
    options.showText = options.showText || false;

    const oBoxOne = document.getElementById(options.id);
    // oBoxOne.width = oBoxOne.width  //重置宽刷新canvas
    const sCenter = oBoxOne.width / 2;    //获取canvas元素的中心点;
    const ctx = oBoxOne.getContext('2d');
    const nBegin = Math.PI / 2;    //定义起始角度;
    const nEnd = Math.PI * 2;    //定义结束角度;

    ctx.textAlign = 'center';    //定义字体居中;
    ctx.font = 'normal normal bold 24px Arial';    //定义字体加粗大小字体样式;
    ctx.fillStyle = '#202224';    //判断文字填充样式为颜色，还是渐变色;
    if (options.showText) {
        ctx.fillText((options.angle[options.num] * 100).toFixed(1) + '%', sCenter, sCenter);//设置填充文字;
    }
    ctx.lineCap = options.lineCap;
    ctx.lineWidth = options.lineWidth;
    ctx.beginPath();    //设置起始路径，这段绘制360度背景;
    ctx.strokeStyle = '#0f0f0f';
    ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, nEnd, false);
    ctx.stroke();

    const nBegins = [];
    const nEnds = [];
    let sum = 0
    options.angle.forEach(item => {
        nBegins.push(sum * nEnd)
        sum += item
        nEnds.push(sum * nEnd)
    })

    const draw = (nBegin, nEnd, color) => {    //该函数实现角度绘制;
        const imd = ctx.getImageData(0, 0, 1000, 1000);
        ctx.putImageData(imd, 0, 0);
        ctx.beginPath();
        ctx.strokeStyle = color ? color : '#6699FF';
        ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), nBegin, nEnd, false);
        ctx.stroke();
    }

    for (let i = 0; i < nBegins.length; i++) {
        draw(nBegins[i], nEnds[i], colors[i])
    }

}

function PinkCookie({width}) {

    const [ids, setId] = useState();
    const cookieSize = width / 3;
    useEffect(() => {
        let id = "PinkCookie" + ('_' + Math.random()).replace('.', '_');
        setId(id);
    }, []);
    useEffect(() => {
        if (ids) {
            drawCircle({id: ids,})
        }
    }, [ids, width]);
    return (
        <canvas className={home.pinkCookie} width={cookieSize ? cookieSize : 150} height={cookieSize ? cookieSize : 150}
                style={{
                    height: `${cookieSize}px`,
                    width: `${cookieSize}px`,
                }} id={ids}/>);
}

export default PinkCookie