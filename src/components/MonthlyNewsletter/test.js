import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import './test.css';
import CircularText from '../../jsrepo/CircularText/CircularText';


const TestNewsLetter = () => {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <HTMLFlipBook width={400} height={600} showCover={true} showPageCorners={true} maxShadowOpacity={0.5} size='fixed'>
                <div className="page">
                    <div className='news-letter-cover-logo'></div>
                    <div className='news-letter-cover-college-logo'></div>
                    <div className='news-letter-cover'>
                        {/* <div className='news-letter-cover-relase-date'>June 10, 2025</div> */}
                        <CircularText
                            text="June*10*2025*"
                            onHover="speedUp"
                            spinDuration={30}
                            className="news-letter-cover-relase-date"
                        />
                        <div className='news-letter-cover-relase-names'>Attention is all we need!</div>
                    </div>
                </div>
                <div className="demoPage">Page 2</div>
                <div className="demoPage">Page 3</div>
                <div className="demoPage">Page 4</div>
                <div className="demoPage">Page 5</div>
                <div className="demoPage">Page 6</div>
                <div className="demoPage">Page 7</div>
                <div className="demoPage">Page 8</div>
            </HTMLFlipBook>
        </div>
    );
};

export default TestNewsLetter;