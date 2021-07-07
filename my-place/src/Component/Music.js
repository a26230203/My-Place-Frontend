import React, { Component } from "react";
import { Upload } from 'antd';
import _ from "lodash";
import "../static/style.css";


const musicList = [
  {
    id: "1",
    title: "Mariage d'amour ",
    info: "Paul de Senneville ",
    resource: "http://m7.music.126.net/20210708034809/6c94250fbe265d93b04f11dab52132cf/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3463824034/c986/8c67/7d20/648bf98985577cfa9b6c89ed8ebcdd0f.mp3",
    time: "5:00",
    img:
      "http://singerimg.kugou.com/uploadpic/softhead/400/20160913/20160913140233132.jpg"
  },
  {
    id: "2",
    title: "Kiss The Rain ",
    info: "Yiruma",
    resource: "https://sharefs.ali.kugou.com/202107080001/570d32e1e386eacd9a133fa2e4d56f12/G203/M07/0B/0F/a4cBAF5d-ziAQNadAEnQf8bIoLs857.mp3",
    time: "04:50",
    img:
      "http://singerimg.kugou.com/uploadpic/softhead/400/20160913/20160913140233132.jpg"
  },
  {
    id: "3",
    title: "My Soul",
    info: "July",
    resource: "https://sharefs.ali.kugou.com/202107080002/c0dffd58af5ed3012eceeb2152717ab4/G096/M08/01/09/oA0DAFkb-fqAKdpbADgXpJHizC0506.mp3",
    time: "04:50",
    img:
      "http://singerimg.kugou.com/uploadpic/softhead/400/20160913/20160913140233132.jpg"
  }]

export default class Music extends Component {

    state = {
      isPause: false,
      musicList: musicList || [],
      currentMusic: musicList ? musicList[0] : {},
      totalTime: "00:00",
      currentTime: "00:00",
      processItemMove: false,
      volumeProcessItemMove: false,
      volumeControl: false,
      playMode: 1,
      isMusicListShow: false
    };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.currentMusic.id !== this.state.currentMusic.id) {
      this.resetProcess();
      if (this.state.isPause) {
        this.onPlay();
      }
    }
  }

  componentDidMount() {
    const audio = this.audio;
    audio.addEventListener("canplay", () => {
      const totalTime = parseInt(audio.duration);
      this.setState({
        totalTime: this.getTime(totalTime)
      });
    });
    audio.addEventListener("timeupdate", () => {
      const { processItemMove } = this.state;
      const currentTime = parseInt(audio.currentTime);
      const buffered = audio.buffered;
      let bufferTime = 0;
      if (buffered.length !== 0) {
        bufferTime = buffered.end(buffered.length - 1);
      }
      const bufferWidth = 500 * (bufferTime / audio.duration);
      const playWidth = 500 * (audio.currentTime / audio.duration);
      if(this.processPlayed || this.processItem.style){
        if (!processItemMove) {
          this.processPlayed.style.width = `${playWidth}px`;
          this.processItem.style.left = `${playWidth - 4}px`;
          this.setState({
            currentTime: this.getTime(currentTime)
          });
        }
    }
      this.processBuffered.style.width = `${bufferWidth}px`;
    });

    audio.addEventListener("ended", () => {
      this.endedPlayMusic();
    });
    this.initVolumeProcess();
  }

  getTime = time => {
    if (time) {
      const minute = parseInt((time / 60) % 60);
      const second = parseInt(time % 60);
      let minuteText = `${minute}`;
      let secondText = `${second}`;
      if (minute < 10) {
        minuteText = `0${minute}`;
      }
      if (second < 10) {
        secondText = `0${second}`;
      }
      return `${minuteText}:${secondText}`;
    } else {
      return "00:00";
    }
  };

  onPlay = () => {
    const audio = this.audio;
    this.setState({ isPause: true });
    audio.play();
  };

  onPause = () => {
    const audio = this.audio;
    this.setState({ isPause: false });
    audio.pause();
  };

  onProcessClick = e => {
    this.setProcess(e, "click");
  };

  setProcess = (e, key) => {
    let offsetWidth = e.pageX - this.processPlayed.getBoundingClientRect().left;
    if (offsetWidth < 0) {
      offsetWidth = 0;
    }
    if (offsetWidth > this.process.offsetWidth) {
      offsetWidth = this.process.offsetWidth;
    }
    const offsetPercentage = offsetWidth / this.process.offsetWidth;
    const currentTime = this.audio.duration * offsetPercentage;
    if (key == "click" || key == "dragMove") {
      this.processPlayed.style.width = `${offsetWidth}px`;
      this.processItem.style.left = `${offsetWidth - 4}px`;
      this.setState({ currentTime: this.getTime(currentTime) });
    }
    if (key == "dragEnd" || key == "click") {
      this.audio.currentTime = currentTime;
    }
  };

  onProcessItemMouseDown = e => {
    e.stopPropagation();
    this.setState({ processItemMove: true });
  };

  onProcessItemMouseMove = e => {
    e.stopPropagation();
    const { processItemMove } = this.state;
    if (processItemMove) {
      this.setProcess(e, "dragMove");
    }
  };
  
  onProcessItemMouseUp = e => {
    const { processItemMove } = this.state;
    e.stopPropagation();
    if (processItemMove) {
      this.setState({ processItemMove: false });
      this.setProcess(e, "dragEnd");
    }
  };

  endedPlayMusic = () => {
    const { playMode, currentMusic } = this.state;
    const { musicList } = this.state;
    if (musicList.length > 0 && currentMusic) {
      const currentIndex = musicList.findIndex(item => {
        return item.id === currentMusic.id;
      });
      if (playMode === 1) {
        if (musicList[currentIndex + 1]) {
          this.setState({ currentMusic: musicList[currentIndex + 1] }, () => {
            this.onSwitchAction();
          });
        } else {
          this.setState({ currentMusic: musicList[0] }, () => {
            this.onSwitchAction();
          });
        }
      }
      else if (playMode === 2) {
        const randomIndex = Math.floor(Math.random() * 3 + 1);
        if (musicList[randomIndex + 1]) {
          this.setState({ currentMusic: musicList[randomIndex + 1] }, () => {
            this.onSwitchAction();
          });
        } else {
          this.setState({ currentMusic: musicList[0] }, () => {
            this.onSwitchAction();
          });
        }
      }
      else if (playMode === 3) {
        this.onSwitchAction();
      }
    } else {
      this.onSwitchAction();
    }
  };

  nextMusic = () => {
    const { currentMusic } = this.state;
    const { musicList } = this.state;
    if (musicList.length > 1 && currentMusic) {
      const currentIndex = musicList.findIndex(item => {
        return item.id === currentMusic.id;
      });
      if (musicList[currentIndex + 1]) {
        this.setState({ currentMusic: musicList[currentIndex + 1] }, () => {
          this.onSwitchAction();
        });
      } else {
        this.setState({ currentMusic: musicList[0] }, () => {
          this.onSwitchAction();
        });
      }
    } else {
      this.audio.currentTime = 0;
      this.onSwitchAction();
    }
  };

  previousMusic = () => {
    const { currentMusic } = this.state;
    const { musicList } = this.state;
    if (musicList.length > 1 && currentMusic) {
      const currentIndex = musicList.findIndex(item => {
        return item.id === currentMusic.id;
      });
      if (musicList[currentIndex - 1]) {
        this.setState({ currentMusic: musicList[currentIndex - 1] }, () => {
          this.onSwitchAction();
        });
      } else {
        this.setState({ currentMusic: musicList[musicList.length - 1] }, () => {
          this.onSwitchAction();
        });
      }
    } else {
      this.audio.currentTime = 0;
      this.onSwitchAction();
    }
  };

  onSwitchAction = () => {
    const { isPause } = this.state;
    this.resetProcess();
    if (isPause) {
      this.onPlay();
    }
  };

  resetProcess = () => {
    this.processPlayed.style.width = "0px";
    this.processItem.style.left = "-4px";
  };


  onVolumeControl = () => {
    const { volumeControl } = this.state;
    this.setState({ volumeControl: !volumeControl });
  };

  onVolumeControlHide = () => {
    const { volumeControl } = this.state;
    if (volumeControl) {
      this.setState({ volumeControl: false });
    }
  };

  initVolumeProcess = () => {

    const processLength = this.volumeProcess.offsetHeight;

    this.volumeProcessCurrent.style.height = `${processLength / 2}px`;

    this.volumeProcessItem.style.bottom = `${processLength / 2 - 6}px`;
  
    this.audio.volume = 0.5;
  };


  onVolumeProcessSet = e => {
    const processLength = this.volumeProcess.offsetHeight;
    let volumeOffsetHeight =
      processLength -
      (e.pageY - this.volumeProcess.getBoundingClientRect().top);
    let volumepercentage = 0;

    if (volumeOffsetHeight < 0) {
      volumeOffsetHeight = 0;
    }
    if (volumeOffsetHeight > processLength) {
      volumeOffsetHeight = processLength;
    }
    volumepercentage = volumeOffsetHeight / processLength;

    this.volumeProcessCurrent.style.height = `${volumeOffsetHeight}px`;

    this.volumeProcessItem.style.bottom = `${volumeOffsetHeight - 6}px`;

    this.audio.volume = volumepercentage;
  };

  onVolumeProcessItemMouseDown = () => {
    this.setState({ volumeProcessItemMove: true });
  };


  onVolumeProcessItemMouseUp = e => {
    const { volumeProcessItemMove } = this.state;
    if (volumeProcessItemMove) {
      this.setState({ volumeProcessItemMove: false });
    }
  };

  onVolumeProcessItemMove = e => {
    const { volumeProcessItemMove } = this.state;
    if (volumeProcessItemMove) {
      this.onVolumeProcessSet(e);
    }
  };

  onPlayModeChange = () => {
    const { playMode } = this.state;
    if (playMode === 3) {
      this.setState({ playMode: 1 });
    } else {
      this.setState({ playMode: playMode + 1 });
    }
  };


  addPlayList = () => {
    alert("add musci to playlist");
  };

  onMusicList = () => {
    const { isMusicListShow } = this.state;
    this.setState({ isMusicListShow: !isMusicListShow });
  };


  onDeleteMusic = (e, item) => {
    e.stopPropagation();
    const { onDeleteMusic } = this.props;
    if (onDeleteMusic) {
      onDeleteMusic(item.id);
    }
  };

  onDeleteAllMusic = () => {
    const { onDeleteAllMusic } = this.props;
    if (onDeleteAllMusic) {
      onDeleteAllMusic();
    }
  };

  onMusicListItemClick = id => {
    const { musicList } = this.state;
    const { currentMusic } = this.state;
    const index = musicList.findIndex(item => {
      return item.id === id;
    });
    if (index !== -1) {
      if (currentMusic.id === id) {
        this.resetProcess();
        this.audio.currentTime = 0;
        this.onPlay();
      } else {
        this.setState({ currentMusic: musicList[index] }, () => {
          this.resetProcess();
          this.onPlay();
        });
      }
    }
  };

  render() {
    const {
      currentMusic,
      isPause,
      totalTime,
      currentTime,
      volumeControl,
      playMode,
      isMusicListShow
    } = this.state;
    const { title, info, img, resource, id } = currentMusic || {};
    const { musicList } = this.state;
    let playModeIcon = "";
    switch (playMode) {
      case 1:
        playModeIcon = "icon-circulation-list";
        break;
      case 2:
        playModeIcon = "icon-circulation-random";
        break;
      case 3:
        playModeIcon = "icon-circulation-single";
        break;
      default:
        playModeIcon = "icon-circulation-list";
        break;
    }
    return (
      <div className="mainLayout">
        <div
          className="mainContent"
          onMouseMove={this.onProcessItemMouseMove}
          onMouseUp={this.onProcessItemMouseUp}
        >
          <div className="playContent">
            <div className="left-controler">
              <span
                className="icon-prev prev-next-icon"
                onClick={this.previousMusic}
              />
              {isPause ? (
                <span className="icon-pause playIcon" onClick={this.onPause} />
              ) : (
                <span className="icon-play playIcon" onClick={this.onPlay} />
              )}
              <span
                className="icon-next prev-next-icon"
                onClick={this.nextMusic}
              />
            </div>
            <div className="main-controler">
              <img src={img} alt="" className="thumbnail" />
              <div className="music-control">
                <div className="music-info">
                  <span className="title-info">{title}</span>
                  <span className="author-info">{info}</span>
                </div>
                <div className="process-time">
                  <div
                    className="process-wrapper"
                    onClick={this.onProcessClick}
                    ref={ref => (this.process = ref)}
                  >
                    <div className="process">
                      <div
                        className="progress-buffered"
                        ref={ref => (this.processBuffered = ref)}
                      />
                      <div
                        className="progress-played"
                        ref={ref => (this.processPlayed = ref)}
                      >
                        <div
                          className="process-item"
                          ref={ref => (this.processItem = ref)}
                          onMouseDown={this.onProcessItemMouseDown}
                        >
                          <div className="process-item-inside" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="time">
                    <span className="current-time">{currentTime}</span>/
                    <span className="total-time">{totalTime}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-folder">
              <Upload>
                <span className="icon-folder folder"/>
              </Upload>
            </div>
            <div className="right-controler">
              <div
                className="volume-controler"
                style={{ visibility: volumeControl ? "visible" : "hidden" }}
                onMouseMove={this.onVolumeProcessItemMove}
                onMouseUp={this.onVolumeProcessItemMouseUp}
              >
                <div
                  className="volume-process"
                  onClick={this.onVolumeProcessSet}
                  ref={ref => (this.volumeProcess = ref)}
                >
                  <div
                    className="volume-current"
                    ref={ref => (this.volumeProcessCurrent = ref)}
                  >
                    <div
                      className="volume-item"
                      ref={ref => (this.volumeProcessItem = ref)}
                      onMouseDown={this.onVolumeProcessItemMouseDown}
                      onMouseUp={this.onVolumeProcessItemMouseUp}
                    >
                      <div className="volume-item-inside" />
                    </div>
                  </div>
                </div>
              </div>
              <span
                className="icon-volume volume"
                onClick={this.onVolumeControl}
              />
              <span
                className={`${playModeIcon} circulation`}
                onClick={this.onPlayModeChange}
              />
              <span className="icon-list list" onClick={this.onMusicList} />
            </div>
            {isMusicListShow && (
              <div className="musicList">
                <div className="music-list-head">
                  <h4 className="music-list-head-title">
                     Playlist(
                    <span>
                      {musicList && musicList.length ? musicList.length : 0}
                    </span>
                    )
                  </h4>
                  <span
                    className="music-list-head-collect"
                    onClick={this.onCollect}
                  >
                    <span className="icon-addfile music-list-common-icon" />
                  </span>
                  <span className="music-list-head-line" />
                  <span
                    className="music-list-head-clear"
                    onClick={this.onDeleteAllMusic}
                  >
                  </span>
                  <p className="music-list-head-name">{title}</p>
                  <span className="music-list-head-close">
                    <span
                      className="icon-close music-list-common-icon"
                      onClick={this.onMusicList}
                    />
                  </span>
                </div>
                <div className="music-list-body">
                  <div className="music-list-body-content">
                    <ul className="music-list-body-ul">
                      {musicList &&
                        musicList.length > 0 &&
                        musicList.map(item => {
                          return (
                            <li
                              className={`music-list-li ${id === item.id &&
                                "music-current"}`}
                              onClick={() => this.onMusicListItemClick(item.id)}
                              key={item.id}
                            >
                              <div className="col music-list-li-col-1">
                                {id === item.id && (
                                  <span className="play-triangle-icon icon-currentPlay" />
                                )}
                              </div>
                              <div className="col music-list-li-col-2">
                                <span className="music-list-li-text">
                                  {item.title}
                                </span>
                              </div>
                              <div className="col music-list-li-col-3">
                                <span
                                  className="icon-clear music-list-action-icon"
                                  onClick={e => this.onDeleteMusic(e, item)}
                                />
                              </div>
                              <div className="col music-list-li-col-4">
                                <span className="music-list-li-text">
                                  {item.info}
                                </span>
                              </div>
                              <div className="col music-list-li-col-5">
                                <span className="music-list-li-text">
                                  {item.time}
                                </span>
                              </div>
                              <div className="col music-list-li-col-6">
                                <span className="icon-link music-list-action-icon" />
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <div className="music-cover">
                  </div>
                </div>
              </div>
            )}
            <audio src={resource} ref={ref => (this.audio = ref)} />
          </div>
        </div>
      </div>
    );
  }
}


