const inputs = document.querySelectorAll("input");

function calculateFuelCost() {
  const distance = Math.max(
    0,
    parseFloat(document.getElementById("distance").value) || 0
  );
  const consumption = Math.max(
    0,
    parseFloat(document.getElementById("consumption").value) || 0
  );
  const fuelPrice = Math.max(
    0,
    parseFloat(document.getElementById("fuelPrice").value) || 0
  );

  const fuelNeeded = (distance * consumption) / 100;
  const totalCost = fuelNeeded * fuelPrice;

  animateNumber("fuelNeeded", fuelNeeded);
  animateNumber("totalCost", totalCost);
}

function animateNumber(elementId, finalValue) {
  const element = document.getElementById(elementId);
  const startValue = parseFloat(element.textContent);
  const duration = 500;
  const steps = 20;
  const stepValue = (finalValue - startValue) / steps;

  let currentStep = 0;
  const interval = setInterval(() => {
    currentStep++;
    const currentValue = startValue + stepValue * currentStep;
    element.textContent = currentValue.toFixed(2);

    if (currentStep >= steps) {
      clearInterval(interval);
      element.textContent = finalValue.toFixed(2);
    }
  }, duration / steps);
}

inputs.forEach((input) => {
  input.addEventListener("input", function (e) {
    if (this.value < 0) {
      this.value = 0;
    }
    calculateFuelCost();
  });

  input.addEventListener("blur", function () {
    if (this.value === "") {
      this.value = "0";
    }
    calculateFuelCost();
  });
});

calculateFuelCost();
