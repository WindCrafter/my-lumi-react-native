/**
 * Created by nghinv on Fri Feb 14 2020
 * Copyright (c) 2020 nghinv@lumi.biz
 */

import React from 'react';
import { ViewStyle, StyleProp, Dimensions } from 'react-native';
import { TabView, TabBar, TabViewProps } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import { Colors } from '../../../utlis/color/index';

const SCREEN = Dimensions.get('window');

interface Props extends TabViewProps {
  position?: Animated.Value<number>;
  onIndexChange: (index: number) => void;
  navigationState: NavigationState<T>;
  renderScene: (props: SceneRendererProps & {
    route: T;
  }) => React.ReactNode;
  renderLazyPlaceholder: (props: {
    route: T;
  }) => React.ReactNode;
  tabBarPosition: 'top' | 'bottom';
  initialLayout?: {
    width?: number;
    height?: number;
  };
  lazy: boolean;
  lazyPreloadDistance: number;
  removeClippedSubviews?: boolean;
  sceneContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  keyboardDismissMode: string;
  swipeEnabled: boolean;
  styleInRoom: boolean,
  tabbarBackgroundColor: String;
  tabStyle?: StyleProp<ViewStyle>;
  tabbarStyle?: StyleProp<ViewStyle>;
  initialLayout?: Object;
  activeColor?: String;
  inactiveColor?: String;
  indicatorColor?: String;
}

TabViewComponent.defaultProps = {
  tabbarBackgroundColor: Colors.white,
  initialLayout: {width: SCREEN.width},
  activeColor: Colors.background,
  inactiveColor: Colors.itemInActive,
  indicatorColor: Colors.background,
};

export default function TabViewComponent(props?: Props) {
  const {
    tabbarBackgroundColor,
    tabStyle,
    initialLayout,
    tabbarStyle,
    navigationState,
    activeColor,
    inactiveColor,
    indicatorColor
  } = props;
  const { index, routes } = navigationState;
  const indexOut = index >= routes.length ? 0 : index;

  const navigationStateOut = { index: indexOut, routes: routes.filter(r => r !== undefined) };
  return (
    <TabView
      {...props}
      navigationState={navigationStateOut}
      renderTabBar={params => (
        <TabBar
          {...params}
          indicatorStyle={{ backgroundColor: indicatorColor, height: 3 }}
          style={{ backgroundColor: tabbarBackgroundColor, tabbarStyle,borderWidth:0 }}
          scrollEnabled
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          tabStyle={[{ width: 'auto' }, tabStyle]}
          getLabelText={({ route }) => route.title}
          initialLayout={initialLayout}
        />
      )}
    />
  );
}
