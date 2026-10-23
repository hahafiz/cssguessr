import db from "../database";

const STALE_WAITING_HOURS = 24; // lobby or solo room nobody finished
const STALE_ACTIVE_HOURS = 1; // a full game lasts only a few minutes

const expireStaleWaiting = db.prepare(
  "UPDATE rooms SET status = 'expired' WHERE status = 'waiting' AND created_at < datetime('now', ?)",
);

const expireStaleActive = db.prepare(
  "UPDATE rooms SET status = 'expired' WHERE status = 'active' AND started_at < datetime('now', ?)",
);

export function runCleanup(): void {
  try {
    const waiting = expireStaleWaiting.run(`-${STALE_WAITING_HOURS} hours`);
    const active = expireStaleActive.run(`-${STALE_ACTIVE_HOURS} hours`);

    console.log(
      `Cleanup: expired ${Number(waiting.changes)} waiting + ${Number(active.changes)} active}`,
    );
  } catch (err) {
    console.error("Cleanup failed: ", err);
  }
}
