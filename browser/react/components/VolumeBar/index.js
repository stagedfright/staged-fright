import React from 'react';
import colorChange from '../VRViewer/utils/colorChange'

  export default (props) => (
      <a-entity>
        <a-box
          color="gray"
          position="5.00 1.88 -10.00"
          rotation="0 7.42 0"
          depth="0.2"
          height="6"
          width=".7">
        </a-box>
        <a-box
          color={colorChange(props.volume)}
          position={`
            5.00
            ${-1.12 + props.volume/2}
            -10.00
          `}
          rotation="0 7.42 0"
          depth="0.2"
          height={props.volume}
          width=".7"
          anchor="bottom">
        </a-box>
        <a-entity position="8.80 2.70 -8.77"
                  scale="10 10 10"
                  text="value: V\nO\nL\nU\nM\nE; line-height: 35px;">
        </a-entity>
      </a-entity>
);
