import React from 'react';

export default (props) => (
      <a-entity>
        <a-entity
          material={`color: ${colorChange(props.pitch)}`}
          position="-7.38 5.47 -4.53"
          rotation="0 7.42 0"
          geometry="primitive: circle; radius: 0.5">
        </a-entity>
        <a-entity position="-3.26 5.47 -4.24"
                  scale="10 10 10"
                  text="value: P\nI\nT\nC\nH; line-height: 30px;">
        </a-entity>
      </a-entity>
    )

function colorChange(pitch) {
  return pitch 
  ? `#FFFF00`
  : `#00FF00`
}
