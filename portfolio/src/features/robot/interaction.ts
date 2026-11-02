export type RobotState = {
  revealed: boolean;
  activation: number;
  hovered: boolean;
  focused: boolean;
};

export type RobotEvent =
  | { type: "activate" }
  | { type: "reset" }
  | { type: "hover" | "focus"; value: boolean };

export const initialRobotState: RobotState = {
  revealed: false,
  activation: 0,
  hovered: false,
  focused: false,
};

export type MotionPolicy = { reduced: boolean; paused: boolean; visible: boolean; inView: boolean };

export function robotReducer(state: RobotState, event: RobotEvent): RobotState {
  switch (event.type) {
    case "activate":
      return state.revealed ? state : { ...state, revealed: true, activation: state.activation + 1 };
    case "reset":
      return { ...state, revealed: false };
    case "hover":
      return { ...state, hovered: event.value };
    case "focus":
      return { ...state, focused: event.value };
  }
}

export function canAnimate(policy: MotionPolicy): boolean {
  return !policy.reduced && !policy.paused && policy.visible && policy.inView;
}
