declare module 'react-native-video-controls' {
  import { Component } from 'react';
  import { VideoProps } from 'react-native-video';
  import { StyleSheetProp, ViewStyle } from 'react-native';

  export interface VideoPlayerProps extends VideoProps {
    toggleResizeModeOnFullscreen?: boolean;
    controlAnimationTiming?: number;
    doubleTapTime?: number;
    controlTimeout?: number;
    scrubbing?: number;
    showOnStart?: boolean;
    videoStyle?: StyleSheetProp<ViewStyle>;
    navigator?: any;
    seekColor?: string;
    style?: StyleSheetProp<ViewStyle>;
    tapAnywhereToPause?: boolean;
    showTimeRemaining?: boolean;
    showHours?: boolean;
    onEnterFullscreen?: () => void;
    onExitFullscreen?: () => void;
    onHideControls?: () => void;
    onShowControls?: () => void;
    onPause?: () => void;
    onPlay?: () => void;
    onBack?: () => void;
    onEnd?: () => void;
    disableFullscreen?: boolean;
    disablePlayPause?: boolean;
    disableSeekbar?: boolean;
    disableVolume?: boolean;
    disableTimer?: boolean;
    disableBack?: boolean;
  }

  export default class VideoPlayer extends Component<VideoPlayerProps> {}
}