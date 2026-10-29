import test from "node:test";
import assert from "node:assert/strict";
import {
  creditAmount,
  distanceKm,
  distanceText,
  homeCities,
} from "../lib/connections.ts";

test("credit earns exactly 100 euros for each validated month", () => {
  assert.equal(creditAmount(0), 0);
  assert.equal(creditAmount(1), 100);
  assert.equal(creditAmount(3), 300);
  assert.equal(creditAmount(12), 1200);
});
test("credit ignores incomplete or invalid month counts", () => {
  assert.equal(creditAmount(3.8), 300);
  assert.equal(creditAmount(-2), 0);
  assert.equal(creditAmount(Number.NaN), 0);
});
test("location distance is zero for the same point and symmetric", () => {
  assert.equal(distanceKm(homeCities.Paris, homeCities.Paris), 0);
  assert(
    Math.abs(
      distanceKm(homeCities.Paris, homeCities.Nice) -
        distanceKm(homeCities.Nice, homeCities.Paris),
    ) < 1e-8,
  );
});
test("Paris to Lyon is a plausible straight-line distance in kilometres", () => {
  const km = distanceKm(homeCities.Paris, homeCities.Lyon);
  assert(km > 390 && km < 395);
});
test("short distances do not suggest false street-level precision", () => {
  assert.equal(distanceText(0.2), "À moins d’1 km de vous");
  assert.equal(distanceText(4.2), "À ~4 km de vous");
});
