let client=AgoraRTC.createClient({mode:'rtc','codec':"vp8"})
let config=
{
    appid:'29cfb2694fe4423d91b4436dc6128db9',
    token:'00629cfb2694fe4423d91b4436dc6128db9IAC4OhptBcFD5jZngjS0xL6FpB1ge44JvbhixpiDLBUVwZy1PTUAAAAAEACJVdSDuceyYgEAAQCox7Ji',
    uid:null,
    channel:'zeeshan'
}

let localTracks={
    audioTracks:null,
    videoTracks:null,
}

let remoteTracks={}

document.getElementById('join-btn').addEventListener('click',async ()=>
{
    console.log("User joined stream")
    await joinStreams()
})



let joinStreams=async()=>{
   [config.uid,localTracks.audioTracks,localTracks.videoTracks]=await Promise.all(
    [client.join(config.appid,config.channel,config.token),
    AgoraRTC.createMicrophoneAudioTrack(),
    AgoraRTC.createCameraVideoTrack(),
    
    ])
    let videoplayer=`<div class="video-containers" id="video-wrapper-${config.uid}">
    <p class="user-uid"> ${config.uid}</p>
    <div class="video-player player" id="stream-${config.uid}"></div>
    </div>`

    document.getElementById('user-streams').insertAdjacentHTML('beforeend',videoplayer)
    localTracks.videoTracks.play(`stream-${config.uid}`);
    await client.publish([localTracks.audioTracks,localTracks.videoTracks])
    
}