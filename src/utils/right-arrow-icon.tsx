import React from 'react'

export default function RightArrow({ fillColor = "#2649F0", width, height }: { fillColor: string; width?: number; height?: number }) {
    return (
        <svg width={width} height={height} viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.4529 12.5234C1.17052 12.5234 0.919512 12.4293 0.731256 12.2411C0.323368 11.8645 0.323368 11.2056 0.731256 10.8291L5.02977 6.49924L0.731256 2.20073C0.323368 1.82422 0.323368 1.16532 0.731256 0.788812C1.10777 0.380924 1.76666 0.380924 2.14318 0.788812L7.16334 5.80897C7.57122 6.18548 7.57122 6.84438 7.16334 7.22089L2.14318 12.2411C1.95492 12.4293 1.70391 12.5234 1.4529 12.5234Z" fill={fillColor} fillOpacity="0.5" />
        </svg>

    )
}
