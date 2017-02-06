import React from 'react';
import colorChange from '../VRViewer/utils/colorChange'

  export default (props) => (
      <a-entity>
        <a-box
          color="gray"
          position="-7.38 0.88 -4.53"
          rotation="0 7.42 0"
          depth="0.2"
          height="6"
          width=".7">
        </a-box>
        <a-box
          color={colorChange(props.volume)}
          position={`
            -7.38
            ${-2.12 + props.volume/2}
            -4.32
          `}
          rotation="0 7.42 0"
          depth="0.2"
          height={props.volume}
          width=".7"
          anchor="bottom">
        </a-box>
        <a-entity position="-3.26 0.87 -4.24"
                  scale="10 10 10"
                  text="value: V\nO\nL\nU\nM\nE; line-height: 30px;">
        </a-entity>
      </a-entity>
);
