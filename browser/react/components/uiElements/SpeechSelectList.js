import React from 'react';
import MobileTearSheet from './MobileTearSheet';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const SpeechSelectList = ({ pickPremadeSpeech }) => (
  <MobileTearSheet>
    <List style={{ textAlign: 'center' }}>
      <Subheader>Get inspired by the classics.</Subheader>
      <ListItem 
        onClick={() => pickPremadeSpeech('gettysburgaddress')}
        primaryText="Gettysburg Address (~2 min)"
        leftAvatar={<Avatar src="/lincoln.jpeg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <Divider />
      <ListItem
        onClick={() => pickPremadeSpeech('ihaveadream')}
        primaryText="I Have A Dream (~2 min)"
        leftAvatar={<Avatar src="/mlk.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <Divider />
      <ListItem
        onClick={() => pickPremadeSpeech('thencamethewar')}
        primaryText="Then Came The War (~3 min)"
        leftAvatar={<Avatar src="/yuri.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <Divider />
      <ListItem
        onClick={() => pickPremadeSpeech('womensrights')}
        primaryText="Women's Rights Are Human Rights (~3 min)"
        leftAvatar={<Avatar src="/hillary.png" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <Divider />
      <ListItem
        onClick={() => pickPremadeSpeech('independenceday')}
        primaryText="Independence Day (~2 min)"
        leftAvatar={<Avatar src="/indyday.jpg" />}
        rightIcon={<CommunicationChatBubble />}
      />
      <Divider />
      <ListItem
        onClick={() => pickPremadeSpeech('pi')}
        primaryText="The First 100 Digits of Pi (~1 min)"
        leftAvatar={<Avatar src="/pi.jpeg" />}
        rightIcon={<CommunicationChatBubble />}
      />
    </List>
  </MobileTearSheet>
);

export default SpeechSelectList;