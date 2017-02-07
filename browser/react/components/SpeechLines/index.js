import React from 'react';

export default (props) =>

    <a-entity
      position={ props.position.join(' ') }
      geometry="primitive: plane; width: 100"
      material="side: double; transparent: true; opacity: 0; color: #EF2D5E"
      text={`value: ${props.line}; line-height: 30px; anchor: center; wrapCount: 1000; align: center;`}>
    </a-entity>

