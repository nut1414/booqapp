export default function calculateWeightToShip(weight) { // weight in gram
  if (weight <= 1000) {
    return 30
  } else {
    return 30 + Math.ceil((weight - 1000) / 1000) * 10
  }
}