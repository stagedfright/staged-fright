import React from 'react';
import MobileTearSheet from './MobileTearSheet';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const SpeechSelectList = () => (
  <MobileTearSheet>
    <List style={{textAlign: 'center'}}>
      <Subheader>Get inspired by the classics.</Subheader>
      <a href={`/gettysburgaddress/practice`}>
        <ListItem
          primaryText="Gettysburg Address (~2 min)"
          leftAvatar={<Avatar src="/lincoln.jpeg" />}
          rightIcon={<CommunicationChatBubble />}
        />
      </a>
      <Divider />
      <a href={`/ihaveadream/practice`}>
        <ListItem
          primaryText="I Have A Dream (~2 min)"
          leftAvatar={<Avatar src="/mlk.jpg" />}
          rightIcon={<CommunicationChatBubble />}
        />
      </a>
      <Divider />
      <a href={`/thencamethewar/practice`}>
        <ListItem
          primaryText="Then Came The War (~3 min)"
          leftAvatar={<Avatar src="/yuri.jpg" />}
          rightIcon={<CommunicationChatBubble />}
        />
      </a>
      <Divider />
      <a href={`/womensrights/practice`}>
        <ListItem
          primaryText="Women's Rights Are Human Rights (~3 min)"
          leftAvatar={<Avatar src="/hillary.png" />}
          rightIcon={<CommunicationChatBubble />}
        />
      </a>
      <Divider />
      <a href={`/independenceday/practice`}>
        <ListItem
          primaryText="Independence Day (~2 min)"
          leftAvatar={<Avatar src="/indyday.jpg" />}
          rightIcon={<CommunicationChatBubble />}
        />
      </a>
      <Divider />
      <a href={`/pi/practice`}>
        <ListItem
          primaryText="The First 100 Digits of Pi (~1 min)"
          leftAvatar={<Avatar src="/pi.jpeg" />}
          rightIcon={<CommunicationChatBubble />}
        />
      </a>
    </List>
  </MobileTearSheet>
);

export default SpeechSelectList;