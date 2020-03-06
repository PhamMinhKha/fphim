import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import Video from 'react-native-video';
import vd from './../Assets/video/video.mp4';

import {Navigation} from 'react-native-navigation';
import Slider from '@react-native-community/slider';
import {getFPRO} from './API/getVideo';
import {useSelector} from 'react-redux';
import axios from 'axios';
import buttonSeek from './../Assets/img/seekAction.gif';
import SendIntentAndroid from 'react-native-send-intent';
import Orientation from 'react-native-orientation-locker';

var width = Dimensions.get('screen').width;
var height = Dimensions.get('screen').height;
const loading = 'https://nhacsong.pro/public/phimthuyetminh/loading.gif';
const options = function() {
  return {};
};
const VideoScreen = ({item}) => {
  Orientation.lockToLandscape();

  const [duration, setDuration] = useState(0);
  const [showControl, setShowControl] = useState(true);
  const [timeNow, setTimeNow] = useState(0);
  const [fullscreen, setFullscreen] = useState(true);
  const [source, setSource] = useState('');
  const [pause, setPause] = useState(false);
  const [timeout, settimeout] = useState(0);
  const [myStyleButton, setMyStyleButton] = useState(0.9);
  const Player = useSelector(state => state.setting.player);
  const player = useRef();
  const refSeek = useRef();
  // console.log('xxx', window.TKK);
  useEffect(() => {
    console.log('start');
    getFPRO(item).then(data => {
      if (data.search('error') !== -1) {
        ToastAndroid.show(
          'Không tìm thấy tập tin trênn Fshare',
          ToastAndroid.SHORT,
        );
      } else if (data.search('credentials') !== -1) {
        ToastAndroid.show('Tài khoản Fshare Admin hết hạn', ToastAndroid.SHORT);
      } else {
        setSource(data);
      }

      console.log('--->', data);
    });
    return () => {
      setSource('');
    };
  }, []);
  function handleControl() {
    setShowControl(true);
    if (timeout) clearTimeout(timeout);
    setTimeout(function() {
      setShowControl(false);
    }, 10000);
  }
  function openMX(link) {
    SendIntentAndroid.openAppWithData(Player, link, 'video/*', {
      position: {type: 'int', value: 60},
    }).then(wasOpened => {});
  }
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.wrapperVideo}
        onPress={function() {
          // showControl();
          handleControl();
          // refSeek.current.focus();
        }}
        onFocus={function() {
          // showControl();
          handleControl();
          // refSeek.current.focus();
        }}>
        {source !== '' ? (
          Player === 'native' ? (
            <Video
              source={{
                uri: source,
              }} // Can be a URL or a local file.
              // source={vd}
              ref={player}
              poster={loading}
              // onBuffer={this.onBuffer} // Callback when remote video is buffering
              // onError={this.videoError} // Callback when video cannot be loaded
              paused={pause}
              controls={false}
              style={styles.backgroundVideo}
              fullscreenOrientation={'landscape'}
              posterResizeMode={'stretch'}
              resizeMode={'stretch'}
              onProgress={t => setTimeNow(t.currentTime)}
              onLoadStart={t => console.log(t)}
              onBuffer={t => console.log(t)} // Callback when remote video is buffering
              onError={t =>
                ToastAndroid.show(
                  'Phi chất lượng quá cao. Vui lòng sử dụng MX Player',
                  ToastAndroid.SHORT,
                )
              }
              hideShutterView={false}
              fullscreen={true}
              onLoad={t => {
                setDuration(t.duration);
                handleControl();
                player.current.presentFullscreenPlayer();

                // player.current.presentFullscreenPlayer();
              }}
            />
          ) : (
            openMX(source)
          )
        ) : (
          <></>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setPause(!pause)}
        activeOpacity={1}
        onFocus={() => setMyStyleButton(1)}
        onBlur={() => setMyStyleButton(0.9)}
        style={{
          transform: [{scale: myStyleButton}],
          display: showControl ? 'flex' : 'none',
        }}>
        <Text style={styles.buttonPlay}>{pause ? 'Play' : 'Pause'}</Text>
      </TouchableOpacity>
      {showControl ? (
        <Slider
          ref={refSeek}
          style={{width, height: 40}}
          value={timeNow}
          minimumValue={0}
          maximumValue={duration}
          // thumbImage={buttonSeek}
          minimumTrackTintColor="red"
          maximumTrackTintColor="white"
          onValueChange={t => {
            player.current.seek(t);
          }}
        />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  // Later on in your styles..

  backgroundVideo: {
    // position: 'absolute',
    // backgroundColor: 'red',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width,
    height,
    zIndex: 2,
  },
  seek: {
    position: 'absolute',
    top: 20,
    width: '90%',
    height: 40,
    alignSelf: 'center',
  },
  wrapperVideo: {
    position: 'relative',
    flex: 1,
  },
  buttonPlay: {
    fontSize: 50,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white',
    backgroundColor: 'green',
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  wrapperControl: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgb(140, 114, 114)',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
});
export default VideoScreen;
