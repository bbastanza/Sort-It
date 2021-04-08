import { DotStyle, ContainerStyle } from "./../helpers/interfaces";

export default function DotAnimation() {
    const containerStyle: ContainerStyle = {
        width: 80,
        margin: "70px auto",
    };

    const dotStyle: DotStyle = {
        width: 20,
        height: 20,
        display: "inline-block",
        margin: 2,
        borderRadius: "50%",
    };

    return (
        <div style={containerStyle}>
            <div className="dot1" style={dotStyle}></div>
            <div className="dot2" style={dotStyle}></div>
            <div className="dot3" style={dotStyle}></div>
        </div>
    );
}
