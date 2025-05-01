function calculateFine(dueDate, returnDate) {
  const today = new Date();
  const effectiveReturnDate = returnDate ? new Date(returnDate) : today;
  const due = new Date(dueDate);

  if (effectiveReturnDate > due) {
    const diffTime = effectiveReturnDate - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * 10; // ₹10 per day fine
  }
  return 0;
}

module.exports = calculateFine;