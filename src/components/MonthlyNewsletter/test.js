import { React, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './test.css';
import CircularText from '../../jsrepo/CircularText/CircularText';
import ShinyText from '../../jsrepo/ShinyText/ShinyText';
import MagnetLines from '../../jsrepo/MagnetLines/MagnetLines';
import ScrambledText from '../../jsrepo/ScrambledText/ScrambledText';

import { set, get, onValue, ref } from "firebase/database";
import { Studentdb } from '../firebaseStudent';


const TestNewsLetter = () => {
    const [speedsq, setSpeedSq] = useState(0.5);
    const [totalViews, setTotalViews] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setSpeedSq(0.5);
        }, 1000);
        setSpeedSq(0.2);
    }, []);

    const KEY = 'ofjeiru-3454dfg-34554';

    useEffect(() => {
        const viewsRef = ref(Studentdb, 'magazine/June/views');

        const unsubscribe = onValue(viewsRef, (snapshot) => {
            const data = snapshot.val();
            if (data?.views !== undefined) {
                setTotalViews(data.views);
            }
        });

        return () => unsubscribe(); // clean up
    }, []);

    // Visitor tracking once only
    useEffect(() => {
        const isVisited = localStorage.getItem(KEY);
        if (!isVisited) {
            localStorage.setItem(KEY, true);

            const viewsRef = ref(Studentdb, 'magazine/June/views');
            set(viewsRef, {
                views: totalViews + 1,
            });
        }
    }, [totalViews]);

    return (
        <>
            <div className='monthly-newsletter-visitor-count'>Total Views: {totalViews}</div>
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <HTMLFlipBook width={600} height={800} showCover={true} showPageCorners={true} maxShadowOpacity={0.5} size='fixed' >

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
                            <div className='news-letter-cover-relase-title'><ShinyText text="SJCIT x CodeArena Monthly Newsletter" disabled={false} speed={3} className='custom-class' /></div>
                            <div className='news-letter-cover-relase-names'>
                                <ShinyText text="Focus Protocol" disabled={false} speed={3} className='custom-class' />
                            </div>
                        </div>
                    </div>

                    <div className="demoPage">
                        <div className='news-letter-page-1-title-main'>
                            <p className='news-letter-page-number'>1</p>
                            <p className='news-letter-page-1-title'>Tech Snap <br /> The compiler that lives in your head</p>
                            <p className='news-letter-page-1-text'>
                                Every day, your brain compiles thoughts into actions.
                                Miss a bracket? That’s your stutter.
                                Segfault at a party? That’s forgetting someone’s name mid-handshake.
                                And just like C++, you’re strongly typed but loosely scoped in your college years.
                                Sleep is your garbage collector.
                                Dreams are just infinite loops with no <span style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px", borderRadius: "5px" }}>break;</span></p>
                            <blockquote>“Debug yourself before you wreck yourself.” <cite>- CodeArena</cite></blockquote>
                        </div>
                    </div>
                    <div className="demoPage2">
                        <div className='news-letter-page-2-title-main'>

                            <div className='news-letter-page-2-gif'></div>
                            {/* <Squares
                            key={speedsq}
                            speed={speedsq}
                            squareSize={40}
                            direction='diagonal' // up, down, left, right, diagonal
                            borderColor='rgba(255, 255, 255, 0.2)'
                            hoverFillColor='#222'
                            style={{ zIndex: 1000 }}
                        /> */}
                            <p className='news-letter-page-2-text' style={{ zIndex: 10022, backgroundColor: "rgba(255, 255, 255)", color: "rgba(0, 0, 0)", borderRadius: "5px" }}>
                                “Why did the kernel panic at the party?”<br /><br />
                                Because someone used sudo to get the aux cable.<br />
                                (He wasn’t <span style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px", borderRadius: "5px" }}>root</span>.)
                            </p>
                            <p className='news-letter-page-number-right' style={{ color: '#fff' }}>2</p>
                        </div>
                    </div>
                    <div className="demoPage3">
                        <div className='news-letter-page-2-title-main'>
                            <p className='news-letter-page-number'>3</p>
                            <p className='news-letter-page-1-title reused' style={{ paddingBottom: "5px" }}>Definition of the month</p>
                            <p className='news-letter-page-1-text reused' style={{ marginTop: "0px" }}>Schrödinger's Merge Conflict<br /><br /><span style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px", borderRadius: "5px" }}>A Git conflict that doesn’t exist until you pull from main.</span></p>
                            <div className='news-letter-page-3-gif'></div>
                        </div>
                    </div>
                    <div className="demoPage4">
                        <div className='news-letter-page-2-title-main' style={{ padding: "0px", backgroundColor: "rgba(0, 0, 0, 0.1) !important" }}>
                            <MagnetLines
                                rows={15}
                                columns={15}
                                containerSize="100%"
                                lineColor="rgba(255, 255, 255, 0.2)"
                                lineWidth="0.2vmin"
                                lineHeight="5vmin"
                                baseAngle={0}
                                style={{ margin: "0rem auto" }}
                            />
                            <p style={{ position: 'absolute', left: "50%", top: "50%", transform: "translate(-50%, -50%)", color: "white", fontSize: "20px", padding: "20px", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "5px" }}>Go to next page</p>
                            <p className='news-letter-page-number-right' style={{ color: '#fff' }}>4</p>
                        </div>
                    </div>
                    <div className="demoPage5">
                        <div className='news-letter-page-1-title-main reused'>
                            <p className='news-letter-page-number'>5</p>
                            <p className='news-letter-page-1-title' style={{ paddingBottom: "0px" }}>Puzzle of the Month</p>
                            <>
                                <ScrambledText
                                    className="news-letter-page-5-scramble"
                                    radius={100}
                                    duration={1.2}
                                    speed={0.5}
                                    scrambleChars={"*"}>
                                    “You walk into a room with 100 perfectly labeled servers. Each is either on or off. A professor tells you:
                                    ‘You may inspect them once. Then, you may flip the switch on any subset. After that, I will tell you which one failed. Your task is to uniquely identify which server it is — no matter which fails.’

                                    What’s your strategy?
                                </ScrambledText>
                                <p className='news-letter-page-1-text' style={{ position: "absolute", top: "45%" }}>Hint: It’s a twist on binary encoding. And no, ChatGPT can’t help you cheat. (Maybe.)</p>
                            </>
                        </div>

                    </div>
                    <div className="demoPage6">
                        <div className='news-letter-page-1-title-main'>
                            <p className='news-letter-page-number-right'>6</p>
                            <p className='news-letter-page-1-title' style={{ paddingBottom: "0px" }}>Qoute of the Month</p>
                            <p className='news-letter-page-1-text'>The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge.</p>
                            <p className='news-letter-page-1-title' style={{ paddingBottom: "0px", paddingTop: "0px" }}>Micro Anecdote</p>
                            <p className='news-letter-page-1-text'>⚠️ 2010: A junior dev at GitHub deleted a production database... from staging.
                                He forgot he was SSHed into the wrong box. GitHub didn’t fire him.
                                They made a t-shirt that read: <span style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px", borderRadius: "5px" }}>$ whoami</span><br /><br />

                                Moral: Own your bugs. Or someone else will name a function after them.

                            </p>
                            <div className='news-letter-page-3-gif' style={{ height: "200px", top: "70%", width: "200px", backgroundImage: `url("data:image/jpeg;base64,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")` }}></div>
                        </div>
                    </div>
                    <div className="demoPage7">
                    </div>
                </HTMLFlipBook >
            </div >
        </>
    );
};

export default TestNewsLetter;