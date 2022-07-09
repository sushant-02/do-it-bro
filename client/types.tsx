// Navigation

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootTabParamList = {
  Home: undefined;
  DailyTasks: undefined;
  Projects: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Onboarding: undefined;
  OTP: undefined;
  AddTask: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type BottomTabTypes = {
  name: keyof RootTabParamList;
  title: string;
  component: () => JSX.Element;
  icon: (color: string) => JSX.Element;
  hideHeader?: boolean;
  alignCenter?: boolean;
};

// Task

export interface TaskItemType {
  title: string;
  status: "complete" | "due" | "inProgress" | "todo";
}

// Projects

export interface ProjectsItemType {
  title: string;
  totalTasks: number;
  completedTasks: number;
  addButton?: boolean;
}
