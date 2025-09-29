import React from 'react';
import { CopilotStep } from 'react-native-copilot';
import { walkthroughable } from 'react-native-copilot';
import { View, Text, TouchableOpacity } from 'react-native';

const WalkthroughableView = walkthroughable(View);
const WalkthroughableText = walkthroughable(Text);
const WalkthroughableTouchable = walkthroughable(TouchableOpacity);

export const TutorialProfile = ({ children }) => (
  <CopilotStep text="Aqui você vê as mensagens" order={1} name="messages">
    <WalkthroughableView>{children}</WalkthroughableView>
  </CopilotStep>
);

export const TutorialButton = ({ children }) => (
  <CopilotStep text="Clique aqui para adicionar" order={2} name="addButton">
    <WalkthroughableView>{children}</WalkthroughableView>
  </CopilotStep>
);
