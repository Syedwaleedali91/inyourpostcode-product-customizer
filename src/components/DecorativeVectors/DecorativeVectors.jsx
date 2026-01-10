import vector9 from '@/assets/Vector 9.png';
import vector8 from '@/assets/Vector 8.png';
import vector7 from '@/assets/Vector 7.png';
import vector1 from '@/assets/Vector 1.png';
import React from 'react';


export const DecorativeVectors = () => {
    return (
        <>
            {/* Left side vectors */}
            <img
                src={vector1}
                alt=""
                className="absolute top-[295px] left-[0px] h-[230px] w-[380px]  z-[1] pointer-events-none"
            />
            <img
                src={vector9}
                alt=""
                className="absolute top-[540px] left-[317px] h-[220px] z-[1] pointer-events-none"
            />
            <img
                src={vector7}
                alt=""
                className="absolute top-[220px] left-[0px] h-[270px] w-[320px] z-[1] pointer-events-none"
            />

            {/* Right side vectors */}
            <img
                src={vector1}
                alt=""
                className="absolute top-[290px] right-[0px] h-[255px] z-[1] pointer-events-none transform -scale-x-100"
            />
            <img
                src={vector8}
                alt=""
                className="absolute top-[185px] right-[0px] h-[400px] z-[1] pointer-events-none"
            />
            <img
                src={vector9}
                alt=""
                className="absolute top-[600px] right-[452px] h-[220px] z-[1] pointer-events-none"
            />
        </>
    );
};
