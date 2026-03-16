import { describe, it, expect } from "vitest";
import { checkSetWinner, makeState, State } from "../src/game";

// Helper: build a state with specific point values
function stateWithPoints(p0: number, p1: number): State {
  const s = makeState("Alice", "Bob", 3);
  s.players[0].points = p0;
  s.players[1].points = p1;
  return s;
}

describe("checkSetWinner", () => {
  // --- No winner yet ---

  it("returns null at 0-0", () => {
    expect(checkSetWinner(stateWithPoints(0, 0))).toBeNull();
  });

  it("returns null when both players are below 11", () => {
    expect(checkSetWinner(stateWithPoints(9, 7))).toBeNull();
  });

  it("returns null at 10-10 (neither has reached 11)", () => {
    expect(checkSetWinner(stateWithPoints(10, 10))).toBeNull();
  });

  it("returns null at 11-10 (lead is only 1 point)", () => {
    expect(checkSetWinner(stateWithPoints(11, 10))).toBeNull();
  });

  it("returns null at 10-11 (lead is only 1 point, player 1 ahead)", () => {
    expect(checkSetWinner(stateWithPoints(10, 11))).toBeNull();
  });

  it("returns null at 13-12 (deuce — lead is only 1)", () => {
    expect(checkSetWinner(stateWithPoints(13, 12))).toBeNull();
  });

  // --- Player 0 wins ---

  it("returns 0 at 11-0 (clean win)", () => {
    expect(checkSetWinner(stateWithPoints(11, 0))).toBe(0);
  });

  it("returns 0 at 11-9 (minimum winning score, 2-point lead)", () => {
    expect(checkSetWinner(stateWithPoints(11, 9))).toBe(0);
  });

  it("returns 0 at 12-10 (deuce resolved for player 0)", () => {
    expect(checkSetWinner(stateWithPoints(12, 10))).toBe(0);
  });

  it("returns 0 at 15-13 (extended deuce)", () => {
    expect(checkSetWinner(stateWithPoints(15, 13))).toBe(0);
  });

  // --- Player 1 wins ---

  it("returns 1 at 0-11 (clean win for player 1)", () => {
    expect(checkSetWinner(stateWithPoints(0, 11))).toBe(1);
  });

  it("returns 1 at 9-11 (minimum winning score, player 1)", () => {
    expect(checkSetWinner(stateWithPoints(9, 11))).toBe(1);
  });

  it("returns 1 at 10-12 (deuce resolved for player 1)", () => {
    expect(checkSetWinner(stateWithPoints(10, 12))).toBe(1);
  });

  it("returns 1 at 13-15 (extended deuce, player 1)", () => {
    expect(checkSetWinner(stateWithPoints(13, 15))).toBe(1);
  });
});
