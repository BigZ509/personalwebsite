import assert from "node:assert/strict";
import { test } from "node:test";
import { robotReducer, initialRobotState, canAnimate } from "../src/features/robot/interaction.ts";

// Catches lost activation/reset state and motion resuming despite a user's policy.
test("activation reveals robotics once, while reset returns to the specimen", () => {
  const open = robotReducer(initialRobotState, { type: "activate" });
  assert.equal(open.revealed, true);
  assert.equal(open.activation, 1);
  assert.equal(robotReducer(open, { type: "activate" }).activation, 1);
  const reset = robotReducer(open, { type: "reset" });
  assert.equal(reset.revealed, false);
  assert.equal(reset.activation, 1);
  assert.equal(robotReducer(reset, { type: "activate" }).activation, 2);
});

test("pointer and focus attention survive until both leave", () => {
  let state = robotReducer(initialRobotState, { type: "hover", value: true });
  state = robotReducer(state, { type: "focus", value: true });
  state = robotReducer(state, { type: "hover", value: false });
  assert.equal(state.focused, true);
  assert.equal(state.hovered, false);
});

test("motion stops for pause, reduced motion, background and offscreen independently", () => {
  const policy = { reduced: false, paused: false, visible: true, inView: true };
  assert.equal(canAnimate(policy), true);
  assert.equal(canAnimate({ ...policy, reduced: true }), false);
  assert.equal(canAnimate({ ...policy, paused: true }), false);
  assert.equal(canAnimate({ ...policy, visible: false }), false);
  assert.equal(canAnimate({ ...policy, inView: false }), false);
});
