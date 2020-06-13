// ***************************************************************************
//                                                                           *
//  Copyright (c) 2020 Clifford Thompson                                     *
//                                                                           *
//  All code in this file is released under Creative Commons Attribution     *
//  (CC-BY) license : https://creativecommons.org/licenses/by/4.0/.          *
//                                                                           *
// ***************************************************************************

const FRAMES_PER_SECOND = 30;
let canvas, context;
let intervalId = null;

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

  _drawBackground();

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
//   This function registers a new interval callback.
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
//   This function draws the background for the simulation canvas.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _drawBackground() {
  // draw background
  context.fillStyle = "#aabbaa";
  context.fillRect(0, 0, canvas.width, canvas.height);
}
