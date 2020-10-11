import { IConfig } from "overmind";
import {
  createHook,
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook,
} from "overmind-react";

import onInitialize from "./onInitialize";
import { state } from "./state";
import * as actions from "./actions";
import * as effects from "./effects";

export const config = { onInitialize, state, actions, effects };

export const useOvermind = createHook<typeof config>();
export const useOvermindState = createStateHook<typeof config>();
export const useActions = createActionsHook<typeof config>();
export const useEffects = createEffectsHook<typeof config>();
export const useReaction = createReactionHook<typeof config>();

declare module "overmind" {
  interface Config extends IConfig<typeof config> {}
}
