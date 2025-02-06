import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";

import { ScreenOne } from "./ScreenOne";
import { ScreenTwo } from "./ScreenTwo";
// import { TimerHistory } from './TimerHistory';

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Screen One"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#3B82F6",  
                },
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="My timer app"
                component={ScreenOne}
            />
            <StackNavigator.Screen
                name="Two"
                component={ScreenTwo}
            />
              {/* <StackNavigator.Screen
                name="Histoty"
                component={TimerHistory}
            /> */}
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);
