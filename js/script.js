// ***************************************************************************
//                                                                           *
//  Copyright (c) 2020 Clifford Thompson                                     *
//                                                                           *
//  All code in this file is released under Creative Commons Attribution     *
//  (CC-BY) license : https://creativecommons.org/licenses/by/4.0/.          *
//                                                                           *
// ***************************************************************************

const FRAMES_PER_SECOND = 10;
let canvas, context;
let intervalId = null;
let gorillas = [];
let bananas = [];

// ***************************************************************************
// Description:
//   This is the main entry point for setting up and starting the simulation
//   on an HTML page. This should only be called once when the page is first
//   being displayed.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function startSimulationLoop() {

  // load canvas
  canvas = document.getElementById("simulation-canvas");
  context = canvas.getContext("2d");
  resetSimulation();
}

// ***************************************************************************
// Description:
//   This function temporarily stops the simulation. It can be resumed by
//   calling resumeSimulation.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function stopSimulation() {
  _clearIntervalLoop(intervalId);
}

// ***************************************************************************
// Description:
//   This function resumes a simulation that has been previously
//   stopped.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function resumeSimulation() {
  intervalId = _createIntervalLoop();
}

// ***************************************************************************
// Description:
//   This function resets the current simulation. The current option values are
//   used to seed the new simulation run.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function resetSimulation() {

  let numberOfGorillas = document.getElementById("number_gorillas").value;
  let numberOfBananas  = document.getElementById("number_bananas").value;
  gorillas = [];
  bananas = [];

  for(var i = 0; i < numberOfGorillas; ++i) {
    gorillas.push(_createGorilla());
  }

  for(var i = 0; i < numberOfBananas; ++i) {
    bananas.push(_createBanana());
  }

  // set up simulation loop
  _clearIntervalLoop(intervalId);
  intervalId = _createIntervalLoop();
}

// ***************************************************************************
// Description:
//   This function updates the simulation during each iteration of the event
//   loop.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _updateSimulation() {

  _processUserInput();
  _updateElementPositions();
  _renderElements();

}

// ***************************************************************************
// Description:
//   This function processes the user input for a single event loop
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _processUserInput() {
  // Nothing to process right now
}

// ***************************************************************************
// Description:
//   This function updates the location of all elements for a single event
//   loop.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _updateElementPositions() {
  // Nothing to update right now
}


// ***************************************************************************
// Description:
//   This function renders all the elements for a single event loop.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _renderElements() {

  _renderBackground();

  gorillas.forEach(_renderGorilla);
  bananas.forEach(_renderBanana);
}

// ***************************************************************************
// Description:
//   This function can be called to end the simulation.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _finishSimulation() {
  _clearIntervalLoop(intervalId);
}

// ***************************************************************************
// Description:
//   This function cancels the interval callback.
//
// Inputs:
//   intervalId - The ID of the interval callback to clear.
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _clearIntervalLoop(intervalId) {
  if(null !== intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// ***************************************************************************
// Description:
//   This function registers a new interval callback for the event loop.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   The ID of the new event loop callback. This can be used to cancel
//   the event loop.
// ***************************************************************************
//
function _createIntervalLoop() {
  return setInterval(_updateSimulation, 1000 / FRAMES_PER_SECOND);
}

// ***************************************************************************
// Description:
//   This function renders the background for the simulation canvas.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _renderBackground() {
  // draw background
  context.fillStyle = "#000da3";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// ***************************************************************************
// Description:
//   This function renders a single gorilla on the simulation canvas.
//
// Inputs:
//   gorilla - The instance of the gorilla to draw
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _renderGorilla(gorilla) {

  context.strokeStyle = gorilla.bodyColour;
  context.fillStyle = gorilla.bodyColour;
  context.beginPath();

  // Draw Head
  context.fillRect(gorilla.positionX - 4, gorilla.positionY + 1,
                   7, 7);
  context.fillRect(gorilla.positionX - 5, gorilla.positionY + 3,
                   9, 3);

  // Draw Neck
  context.fillRect(gorilla.positionX - 3, gorilla.positionY + 8, 5, 1);

  // Draw Body
  context.fillRect(gorilla.positionX - 9, gorilla.positionY + 9, 17, 8);
  context.fillRect(gorilla.positionX - 7, gorilla.positionY + 15, 13, 6);

  let leftAngle1 = 215 * Math.PI / 180;
  let leftAngle2 = 147 * Math.PI / 180;

  // Draw Left Leg
  context.beginPath();
  context.arc( gorilla.positionX + 0, gorilla.positionY + 27, 10, leftAngle2, leftAngle1, false );
  context.arc( gorilla.positionX + 5, gorilla.positionY + 27, 10, leftAngle1, leftAngle2, true );
  context.closePath();
  context.fill();
  context.stroke();

  // Draw Left Arm
  context.beginPath();
  context.arc( gorilla.positionX - 4, gorilla.positionY + 15, 10, leftAngle2, leftAngle1, false );
  context.arc( gorilla.positionX - 0, gorilla.positionY + 15, 10, leftAngle1, leftAngle2, true );
  context.closePath();
  context.fill();
  context.stroke();


  let rightAngle1 = 33 * Math.PI / 180;
  let rightAngle2 = 325 * Math.PI / 180;

  // Draw Right Leg
  context.beginPath();
  context.arc( gorilla.positionX - 1, gorilla.positionY + 27, 10, rightAngle1, rightAngle2, true );
  context.arc( gorilla.positionX - 6, gorilla.positionY + 27, 10, rightAngle2, rightAngle1, false );
  context.closePath();
  context.fill();
  context.stroke();

  // Draw Right Arm
  context.beginPath();
  context.arc( gorilla.positionX + 3, gorilla.positionY + 15, 10, rightAngle1, rightAngle2, true );
  context.arc( gorilla.positionX - 1, gorilla.positionY + 15, 10, rightAngle2, rightAngle1,  false );
  context.closePath();
  context.fill();
  context.stroke();

  // Draw Chest
  context.strokeStyle = gorilla.bodyLineColour;
  context.beginPath();
  context.arc( gorilla.positionX - 5, gorilla.positionY + 11, 4.9, 0, 3 * Math.PI / 5, false );
  context.stroke();
  context.beginPath();
  context.arc( gorilla.positionX + 4, gorilla.positionY + 11, 4.9, 3 * Math.PI / 7, 4 * Math.PI / 4, false );
  context.stroke();

  // Draw Eyes/Brow
  context.fillStyle = gorilla.bodyLineColour;
  context.fillRect(gorilla.positionX - 3, gorilla.positionY + 4, 2, 1);
  context.fillRect(gorilla.positionX, gorilla.positionY + 4, 2, 1);
  context.fillRect(gorilla.positionX - 3, gorilla.positionY + 2, 5, 1);
  context.stroke();
}

// ***************************************************************************
// Description:
//   This function renders a single banana on the simulation canvas.
//
// Inputs:
//   banana - The instance of the banana to draw
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _renderBanana(banana) {

  const bananaOuterRadiusPx = 5;
  const bananaInnerRadiusPx = 3;

  context.strokeStyle = banana.lineColour;
  context.fillStyle = banana.fillColour;
  context.beginPath();

  context.arc(banana.positionX, banana.positionY,
              bananaOuterRadiusPx,
              0 + banana.rotationAngleDg, Math.PI + banana.rotationAngleDg,
              false);
  context.arc(banana.positionX, banana.positionY,
              bananaInnerRadiusPx,
              Math.PI + banana.rotationAngleDg, 0 + banana.rotationAngleDg,
              true );
  context.closePath();
  context.fill();
  context.stroke();
}

// ***************************************************************************
// Description:
//   This function creates an instance of a gorilla.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   An instance of a Gorilla
// ***************************************************************************
//
function _createGorilla() {

  let positionX, positionY;
  let leftArmUp = false;
  let rightArmUp = false;

  positionX = Math.random() * canvas.width;
  positionY = Math.random() * canvas.height;

  return new Gorilla(
    positionX, positionY,
    leftArmUp, rightArmUp);
}


// ***************************************************************************
// Description:
//   This function creates an instance of a banana.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   An instance of a Banana
// ***************************************************************************
//
function _createBanana() {

  let positionX, positionY;
  let rotationAngleDg;

  positionX = Math.random() * canvas.width;  // [0, canvas.width)
  positionY = Math.random() * canvas.height; // [0, canvas.height)
  rotationAngleDg = Math.random() * (360);   // [0,360)

  return new Banana(positionX, positionY, rotationAngleDg);
}
