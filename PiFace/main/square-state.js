// acts as an Enum, hence the Object.freeze()
pf.SquareState = Object.freeze({
  'VACANT': 0,
  'FILLED': 1,
  'EXED': 2,
  'UNDEFINED': -1
});

// OCCUPIED might be added, but it means FILLED || EXED
// AVAILABLE might be added, but it means VACANT || FILLED
// UNAVAILABLE might be added, but it means EXED || OUT_OF_BOUNDS
// OUT_OF_BOUNDS might be added (means off grid entirely, so index < 0 || index > row.length)
