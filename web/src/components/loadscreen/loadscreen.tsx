import React, { useEffect, useRef, useState } from 'react';
import { clsx } from '@cfx-dev/ui-components';
import { observer } from 'mobx-react-lite';
import s from './loadscreen.module.scss';
import { BsArrowBarLeft, BsArrowBarRight, BsArrowRepeat } from 'react-icons/bs';
import YouTube, { YouTubeProps } from "react-youtube";
import { GameLoadingState } from '../../services/loadscreen/GameLoadingState';

// -- https://discord.gg/P8KKAb7D4q
// -- UI Projects for FiveM by totenmajkel_ (misiek_dev)

interface YouTubeAudioPlayerProps {
    videoId: string; // YouTube video ID
}

const YouTubeAudioPlayer: React.FC<YouTubeAudioPlayerProps> = ({ videoId }) => {
    const [volume, setVolume] = useState(50); // Volume state (0-100)
    const playerRef = useRef<any>(null); // Ref to store the YouTube player

    // Event handler for when the player is ready
    const onPlayerReady: YouTubeProps["onReady"] = (event) => {
        playerRef.current = event.target; // Store the player instance
        playerRef.current.setVolume(volume); // Set initial volume

        event.target.setVolume(volume); // Set initial volume (optional)
    };
  
    // Event handler for when the player state changes
    const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
      // You can handle player state changes here (e.g., when the video ends)
      if (event.data === (window as any).YT.PlayerState.ENDED) {
        console.log("Video ended");
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
          setVolume((prevVolume) => {
            const newVolume = Math.max(0, prevVolume - 10); // Decrease volume, min 0
            playerRef.current?.setVolume(newVolume); // Update player volume
            return newVolume;
          });
        } else if (event.key === "ArrowRight") {
          setVolume((prevVolume) => {
            const newVolume = Math.min(100, prevVolume + 10); // Increase volume, max 100
            playerRef.current?.setVolume(newVolume); // Update player volume
            return newVolume;
          });
        }
    };
    
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
  
    return (
      <div style={{ display: "none" }}> {/* Hides the video player */}
        <YouTube
          videoId={videoId} // The YouTube video ID
          opts={{
            height: "0",
            width: "0",
            playerVars: {
              autoplay: 1, // Auto-play the video
            },
          }}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
      </div>
    );
};

export const LoadScreen = observer(function LoadScreen() {
    const progress = `${GameLoadingState.loadingProgress * 100}%`;
    const pulseRef = useRef<HTMLDivElement>(null);

    const imageHestPulse = clsx(s.imageheist)

    const checkFadeOut = progress < '95%' && GameLoadingState.logLineStatus !== true

    const openExternalLink = (url: string) => {
        if (!url) return;

        if (window.invokeNative) {
            window.invokeNative('openUrl', url);
        } else {
            window.open(url, '_blank');
        }
    };

    return (
        <div className={clsx(s.root, 'animated-background')}>
            <div className={s.content}>
                {checkFadeOut && (
                    <div className={s.header} style={{ border: '1px solid #292929c5', borderRadius: '12px' }}>
                        <div className={s.title}>
                            <div>
                                <img alt='logo' src="https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/c46845952588bf44125a37117d4da32c.svg" />
                            </div>
                            <div>
                                <span>Grand Theft Auto V</span>
                            </div>
                        </div>

                        <div className={s.linkbar}>
                            <div>
                                <a className={s.link} onClick={() => {openExternalLink('LINKS.website')}}>Website</a>
                            </div>
                            <div>
                                <a className={s.link} onClick={() => {openExternalLink('LINKS.discord')}}>Discord</a>
                            </div>
                            <div>
                                <a className={s.link} onClick={() => {openExternalLink('LINKS.instagram')}}>Instagram</a>
                            </div>
                            <div>
                                <a className={s.link} onClick={() => {openExternalLink('LINKS.facebook')}}>Facebook</a>
                            </div>
                        </div>

                        <div className={s.userbar}>
                            <img alt='avatar' width={32} height={32} src='https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/a29e26aa160e7be7e845708c335b3c39.svg' />
                            <div className={s.username}>{'UNDEFINED'}</div>
                        </div>
                    </div>
                )}

                <YouTubeAudioPlayer videoId="Sw5fNI400E4" /> {/* Replace with your video ID */}

                <div className={s.imagescontent}>
                    {checkFadeOut &&(
                        <div className={s.blockcontent}>
                            <div className={s.imagebox}>
                                <div className={s.header}>
                                    Welcome to the server <span style={{ color: 'white', marginLeft: '8px' }}>Flame Development (UI Projects)</span>
                                </div>
                                <div className={s.imagecontent}>
                                    lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna 
                                    aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure 
                                    dolor in reprehenderit voluptate velit esse cillum dolore fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum
                                </div>

                                <div className={s.instruction}>
                                    <div ref={pulseRef} className={s.leftarrow}><BsArrowBarLeft color='#f54e72' /></div><div>Control the volume with the arrows</div><div ref={pulseRef} className={s.rightarrow}><BsArrowBarRight color='#f54e72' /></div>
                                </div>

                                <div className={s.progress}>
                                    <div className={s.progbar}>
                                        <div className={s.bar} style={{ width: progress }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className={clsx(s.imagebox, s.esrb)}>
                                <img width={32} height={32} alt="Rating: ESRB M. Click here learn more about rating systems" src="https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/f4b0d9409df1e8a420b2118e4e601263.svg" />
                                <div className={s.esrbtitle}><p>Blood and Gore, Intense Violence, Mature Humor, Nudity, Strong Language, Strong Sexual Content, Use of Drugs and Alcohol</p><hr style={{borderColor: '#2d2d2d'}} /><p>In-Game Purchases,  Users Interact</p></div>
                                <div></div>
                            </div>
                        </div>
                    )}

                    <div className={imageHestPulse}></div>
                </div>
            </div>
        </div>
    );
});

// -- https://discord.gg/P8KKAb7D4q
// -- UI Projects for FiveM by totenmajkel_ (misiek_dev)