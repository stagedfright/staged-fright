import React from 'react';

export default (props) => (
      <a-entity 
        position="0 1 0" 
        geometry="primitive: box" 
        draw="width: 512; height: 128" 
        someshit={`points: ${props.points}`}>
      </a-entity>
    )
