// ***************************************************************************
//                                                                           *
//  Copyright (c) 2020 Clifford Thompson                                     *
//                                                                           *
//  All code in this file is released under Creative Commons Attribution     *
//  (CC-BY) license : https://creativecommons.org/licenses/by/4.0/.          *
//                                                                           *
// ***************************************************************************

const FRAMES_PER_SECOND = 15;
const BACKGROUND_COLOUR = "#000da3";
const GORILLA_HEIGHT_PX = 33;
let canvas, context;
let intervalId = null;
let gorillas = [];
let bananas = [];
let buildings = [];
let explosions = [];
let sun = null;
let windSpeedMetersPerSecond = null;
let gravityMetresPerSecond = null;

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

  let numberOfBananas = parseInt(document.getElementById("number_bananas").value);
  sun = null;
  buildings = [];
  gorillas = [];
  bananas = [];
  explosions = [];

  sun = _createSun();
  buildings = _createBuildings();
  windSpeedMetersPerSecond = parseFloat(document.getElementById("wind").value);
  gravityMetresPerSecond = parseFloat(document.getElementById("gravity").value);

  _createGorillas(buildings);

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
  _detectCollisions();
  _moveElements();
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
//   This function performs element movement for a single event loop.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _moveElements() {
  bananas.forEach(_moveBanana);
}

// ***************************************************************************
// Description:
//   This function performs box-based collision detection on bananas and
//   buildings. If the banana collides with a building, the banana is removed.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _detectCollisions(banana) {

  for(let i = bananas.length - 1; i >= 0 ; --i) {
    let banana = bananas[i];
    // Check Gorilla collisions
    for(let j = 0; j < gorillas.length; ++j) {
      let gorillaHitbox = gorillas[j].hitbox;
      if(banana.positionX + banana.outerRadiusPx > gorillaHitbox.positionX &&
         banana.positionX - banana.outerRadiusPx < gorillaHitbox.positionX + gorillaHitbox.widthPx &&
         banana.positionY + banana.outerRadiusPx > gorillaHitbox.positionY &&
         banana.positionY - banana.outerRadiusPx < gorillaHitbox.positionY + gorillaHitbox.heightPx) {
        explosions.push(new Explosion(banana.positionX, banana.positionY));
        bananas.splice(i,1);
        break;
      }
    }
    // Check Building collisions
    for(let j = 0; j < buildings.length; ++j) {
      let buildingModel = buildings[j].model;
      if(banana.positionX + banana.outerRadiusPx > buildingModel.positionX &&
         banana.positionX - banana.outerRadiusPx < buildingModel.positionX + buildingModel.widthPx &&
         banana.positionY + banana.outerRadiusPx > buildingModel.positionY &&
         banana.positionY - banana.outerRadiusPx < buildingModel.positionY + buildingModel.heightPx) {
        explosions.push(new Explosion(banana.positionX, banana.positionY));
        bananas.splice(i,1);
        break;
      }
    }
  }
}

// ***************************************************************************
// Description:
//   This function performs banana movement for a single event loop.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _moveBanana(banana) {
  banana.positionX += (banana.velocityMetresPerSecondX + windSpeedMetersPerSecond) / FRAMES_PER_SECOND ;
  banana.positionY -= banana.velocityMetresPerSecondY / FRAMES_PER_SECOND; // Y-axis is opposite
  banana.velocityMetresPerSecondY -= gravityMetresPerSecond / FRAMES_PER_SECOND;
  banana.rotationAngleDg = (banana.rotationAngleDg - 45) % 360;
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
  _renderSun(sun);
  buildings.forEach(_renderBuilding);
  _renderWindSpeed();

  gorillas.forEach(_renderGorilla);
  bananas.forEach(_renderBanana);
  explosions.forEach(_renderExplosion);
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
  context.fillStyle = BACKGROUND_COLOUR;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// ***************************************************************************
// Description:
//   This function renders a single sun on the simulation canvas
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _renderSun(sun) {
  const sunColour = "#fffe55";
  context.strokeStyle = sunColour;
  context.fillStyle = sunColour;
  context.beginPath();
  context.arc(sun.positionX, sun.positionY, 12, 0, 2 * Math.PI);
  context.fill();
  context.stroke();

  // Draw Rays
  context.beginPath();

  context.moveTo(sun.positionX - 22 ,sun.positionY);
  context.lineTo(sun.positionX + 22 ,sun.positionY);

  context.moveTo(sun.positionX, sun.positionY - 22);
  context.lineTo(sun.positionX, sun.positionY + 22);

  context.moveTo(sun.positionX - 15, sun.positionY - 16);
  context.lineTo(sun.positionX + 15, sun.positionY + 16);

  context.moveTo(sun.positionX - 15, sun.positionY + 16);
  context.lineTo(sun.positionX + 15, sun.positionY - 16);

  context.moveTo(sun.positionX - 8, sun.positionY - 20);
  context.lineTo(sun.positionX + 8, sun.positionY + 20);

  context.moveTo(sun.positionX - 8, sun.positionY + 20);
  context.lineTo(sun.positionX + 8, sun.positionY - 20);

  context.moveTo(sun.positionX - 20, sun.positionY - 8);
  context.lineTo(sun.positionX + 20, sun.positionY + 8);

  context.moveTo(sun.positionX - 20, sun.positionY + 8);
  context.lineTo(sun.positionX + 20, sun.positionY - 8);

  context.stroke();

  // Draw Mouth
  context.strokeStyle = BACKGROUND_COLOUR;
  context.beginPath();
  if(sun.isSuprised) {
    context.arc(sun.positionX, sun.positionY + 5, 3, 0, 2 * Math.PI)
  }
  else {
    context.arc(sun.positionX, sun.positionY, 8, 30 * Math.PI / 180, 150 * Math.PI / 180);
  }
  context.stroke();

  // Draw Left Eye
  context.beginPath();
  context.arc(sun.positionX - 4, sun.positionY - 2, 1, 0, 2 * Math.PI);
  context.stroke();

  // Draw Right Eye
  context.beginPath();
  context.arc(sun.positionX + 4, sun.positionY - 2, 1, 0, 2 * Math.PI);
  context.stroke();

}

// ***************************************************************************
// Description:
//   This function renders a single building on the simulation canvas.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _renderBuilding(building) {

  let buildingModel = building.model;

  if(!building.render) {
    context.fillStyle = buildingModel.fillColour;

    // Draw main Building Structure
    context.fillRect(
        buildingModel.positionX, buildingModel.positionY,
        buildingModel.widthPx, buildingModel.heightPx );
    // Draw windows
    buildingModel.windows.forEach(_renderWindow);
    building.render =
        context.getImageData(
            buildingModel.positionX,buildingModel.positionY,
            buildingModel.widthPx, buildingModel.heightPx);
  } else {
    // Building has already been draw, so just use the image version
    context.putImageData(building.render, buildingModel.positionX, buildingModel.positionY);
  }
}

// ***************************************************************************
// Description:
//   This function renders the wind speed indicator on the simulation canvas.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _renderWindSpeed() {
  if(windSpeedMetersPerSecond !== 0) {
    const windColour = "#c62b62";
    const arrowDirection = windSpeedMetersPerSecond > 0 ? -2 : 2;
    const windLineLengthPx = windSpeedMetersPerSecond * 3 * canvas.width / 320;
    const windLinePositionX = (canvas.width / 2) - (windLineLengthPx / 2);
    const windLinePositionY = canvas.height - 5;
    const arrowHeadPositionX = windLinePositionX + windLineLengthPx;

    // Arrow line
    context.strokeStyle = windColour;
    context.beginPath();
    context.moveTo(windLinePositionX, windLinePositionY);
    context.lineTo(arrowHeadPositionX, windLinePositionY);

    // Arrow head
    context.moveTo(arrowHeadPositionX, windLinePositionY);
    context.lineTo(arrowHeadPositionX + arrowDirection, windLinePositionY - 2);
    context.moveTo(arrowHeadPositionX, windLinePositionY);
    context.lineTo(arrowHeadPositionX + arrowDirection, windLinePositionY + 2);

    context.stroke();
  }
}

// ***************************************************************************
// Description:
//   This function renders a single window on the simulation canvas.
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _renderWindow(window) {
  context.fillStyle = window.fillColour;
  context.fillRect(window.positionX, window.positionY, window.widthPx, window.heightPx);
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

  const gorillaModel = gorilla.model;

  context.strokeStyle = gorillaModel.bodyColour;
  context.fillStyle = gorillaModel.bodyColour;
  context.beginPath();

  // Draw Head
  context.fillRect(gorillaModel.positionX - 4, gorillaModel.positionY + 1,
                   7, 7);
  context.fillRect(gorillaModel.positionX - 5, gorillaModel.positionY + 3,
                   9, 3);

  // Draw Neck
  context.fillRect(gorillaModel.positionX - 3, gorillaModel.positionY + 8, 5, 1);

  // Draw Body
  context.fillRect(gorillaModel.positionX - 9, gorillaModel.positionY + 9, 17, 8);
  context.fillRect(gorillaModel.positionX - 7, gorillaModel.positionY + 15, 13, 6);

  let leftAngle1 = 215 * Math.PI / 180;
  let leftAngle2 = 147 * Math.PI / 180;

  // Draw Left Leg
  context.beginPath();
  context.arc( gorillaModel.positionX + 0, gorillaModel.positionY + 27, 10, leftAngle2, leftAngle1, false );
  context.arc( gorillaModel.positionX + 5, gorillaModel.positionY + 27, 10, leftAngle1, leftAngle2, true );
  context.closePath();
  context.fill();
  context.stroke();

  // Draw Left Arm
  context.beginPath();
  context.arc( gorillaModel.positionX - 4, gorillaModel.positionY + 15, 10, leftAngle2, leftAngle1, false );
  context.arc( gorillaModel.positionX - 0, gorillaModel.positionY + 15, 10, leftAngle1, leftAngle2, true );
  context.closePath();
  context.fill();
  context.stroke();


  let rightAngle1 = 33 * Math.PI / 180;
  let rightAngle2 = 325 * Math.PI / 180;

  // Draw Right Leg
  context.beginPath();
  context.arc( gorillaModel.positionX - 1, gorillaModel.positionY + 27, 10, rightAngle1, rightAngle2, true );
  context.arc( gorillaModel.positionX - 6, gorillaModel.positionY + 27, 10, rightAngle2, rightAngle1, false );
  context.closePath();
  context.fill();
  context.stroke();

  // Draw Right Arm
  context.beginPath();
  context.arc( gorillaModel.positionX + 3, gorillaModel.positionY + 15, 10, rightAngle1, rightAngle2, true );
  context.arc( gorillaModel.positionX - 1, gorillaModel.positionY + 15, 10, rightAngle2, rightAngle1,  false );
  context.closePath();
  context.fill();
  context.stroke();

  // Draw Chest
  context.strokeStyle = gorillaModel.bodyLineColour;
  context.beginPath();
  context.arc( gorillaModel.positionX - 5, gorillaModel.positionY + 11, 4.9, 0, 3 * Math.PI / 5, false );
  context.stroke();
  context.beginPath();
  context.arc( gorillaModel.positionX + 4, gorillaModel.positionY + 11, 4.9, 3 * Math.PI / 7, 4 * Math.PI / 4, false );
  context.stroke();

  // Draw Eyes/Brow
  context.fillStyle = gorillaModel.bodyLineColour;
  context.fillRect(gorillaModel.positionX - 3, gorillaModel.positionY + 4, 2, 1);
  context.fillRect(gorillaModel.positionX, gorillaModel.positionY + 4, 2, 1);
  context.fillRect(gorillaModel.positionX - 3, gorillaModel.positionY + 2, 5, 1);
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

  const rotationAngleRad = banana.rotationAngleDg * Math.PI / 180;

  context.strokeStyle = banana.lineColour;
  context.fillStyle = banana.fillColour;
  context.beginPath();

  context.arc(banana.positionX, banana.positionY,
              banana.outerRadiusPx,
              rotationAngleRad, Math.PI + rotationAngleRad,
              false);
  context.arc(banana.positionX, banana.positionY,
              banana.innerRadiusPx,
              Math.PI + rotationAngleRad, rotationAngleRad,
              true );
  context.closePath();
  context.fill();
  context.stroke();
}

// ***************************************************************************
// Description:
//   This function renders a single explosion on the simulation canvas.
//
// Inputs:
//   explosion - The instance of the explosion to draw
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _renderExplosion(explosion) {

  context.strokeStyle = explosion.fillColour;
  context.fillStyle = explosion.fillColour;
  context.beginPath();
  context.arc(
      explosion.positionX, explosion.positionY,
      explosion.radiusPx,
      0, 2 * Math.PI);
  context.fill();
  context.stroke();
}

// ***************************************************************************
// Description:
//   This function creates an instance of a sun
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   An instance of a Gorilla
// ***************************************************************************
//
function _createSun() {
  const positionX = Math.floor(canvas.width / 2);
  const positionY = 25;
  return new Sun(positionX, positionY, false);
}

// ***************************************************************************
// Description:
//   This function creates the buildings in the cityscape
//
// Inputs:
//   None
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _createBuildings() {

  let buildings = [];
  const buildingColours = ["#4fa7a9", "#aaaaaa", "#9a1e14"];
  const slopes = [15,130,15,15,15,130];
  const slope = Math.floor(Math.random() * 6);
  const bottomLine = 335;
  const heightIncreasePx = 10;
  const defaultBuildingWidthPx = 37;
  const randomHeightPx = 120;
  const gorillaHeightAllowancePx = 25;
  const maxHeightPx = canvas.height - 100;
  const buildingSpacingPx = 2;

  let newHeight = slopes[slope];

  for(var topLeftX = 2; topLeftX < canvas.width;) {
    switch(slope) {
    case 0:
      newHeight += heightIncreasePx;
      break;
    case 1:
      newHeight -= heightIncreasePx;
      break;
    case 2:
    case 3:
    case 4:
      if (topLeftX > canvas.width / 2) {
        newHeight -= 2*heightIncreasePx;
      }
      else {
        newHeight += 2*heightIncreasePx;
      }
      break;
    case 5:
      if (topLeftX > canvas.width / 2) {
        newHeight += 2*heightIncreasePx;
      }
      else {
        newHeight -= 2*heightIncreasePx;
      }
      break;
    }

    // Set width of building and check to see if it would go off the screen
    let buildingWidthPx = Math.floor(Math.random() * defaultBuildingWidthPx) + defaultBuildingWidthPx;
    if(topLeftX + buildingWidthPx > canvas.width) {
      buildingWidthPx = canvas.width - topLeftX - 2
    }

    // Set height of building and check to see if it goes below screen
    let buildingHeightPx = Math.floor(Math.random() * randomHeightPx) + newHeight;
    if(buildingHeightPx < heightIncreasePx){
      buildingHeightPx = heightIncreasePx;
    }

    // Check to see if Building is too high
    if(bottomLine - buildingHeightPx > maxHeightPx + gorillaHeightAllowancePx){
      buildingHeightPx = maxHeightPx + gorillaHeightAllowancePx - 5;
    }

    const topLeftY = canvas.height - buildingHeightPx - 10;
    const windows = _createWindows(topLeftX, topLeftY, buildingWidthPx, buildingHeightPx);

    const colour = Math.floor(Math.random()*3);
    buildings.push(
        { model: new Building(
            topLeftX, topLeftY,
            buildingWidthPx, buildingHeightPx,
            buildingColours[colour],
            windows)
        });
    topLeftX += buildingWidthPx + buildingSpacingPx;
  }
  return buildings;
}

// ***************************************************************************
// Description:
//   This function creates windows for a building using the top left corner
//   of the building as reference.
//
// Inputs:
//   buildingTopLeftX - The top left corner of the building
//   buildingTopLeftY - The top left corner of the building
//   buildingWidthPx - The building width in pixels
//   buildingHeightPx - The building height in pixels
// Outputs:
//   None
// Returns:
//   An instance of an array of Windows
// ***************************************************************************
//
function _createWindows(buildingTopLeftX, buildingTopLeftY, buildingWidthPx, buildingHeightPx) {

  const windowColours = ["#fffe73", "#555555"];
  const windowWidthPx = 3;
  const windowHeightPx = 6;
  const windowHorizontalSpacingPx = 6;
  const windowVerticalSpacingPx = 10;
  let windows = [];

  for(let windowTopLeftX = buildingTopLeftX + 3;
      windowTopLeftX < buildingTopLeftX + buildingWidthPx - 3;
      windowTopLeftX += windowHorizontalSpacingPx) {
    for(let windowTopLeftY = buildingTopLeftY + 2;
        windowTopLeftY < buildingTopLeftY + buildingHeightPx - windowHeightPx;
        windowTopLeftY += windowVerticalSpacingPx) {
      let colour = Math.floor(Math.random()*2);
      windows.push(
          new Window(
              windowTopLeftX, windowTopLeftY,
              windowWidthPx, windowHeightPx,
              windowColours[colour]));
    }
  }
  return windows;
}

// ***************************************************************************
// Description:
//   This function creates the gorillas.
//
// Inputs:
//   building - An array of buildings to create the gorillas upon
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function _createGorillas(buildings) {

  for(var gorillaIndex = 0; gorillaIndex < 2; ++gorillaIndex) {
    let buildingIndexOffset =
        gorillaIndex === 1 ?
        Math.floor(Math.random() * 2) + 1 :
        buildings.length - (Math.floor(Math.random() * 2 + 2));
    let positionX = buildings[buildingIndexOffset].model.positionX + buildings[buildingIndexOffset].model.widthPx/2;
    let positionY = buildings[buildingIndexOffset].model.positionY - GORILLA_HEIGHT_PX;
    gorillas.push(
        {model: new Gorilla(
            positionX, positionY, false, false),
         hitbox:   {
           positionX : positionX - 14,
           positionY : positionY + 1,
           widthPx: 28,
           heightPx: GORILLA_HEIGHT_PX - 1
         }
        }
    );
  }
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
  let velocityMetresPerSecondX, velocityMetresPerSecondY;
  let rotationAngleDg;
  const velocityMetresPerSecond = parseFloat(document.getElementById("velocity").value)
  const angleDg = parseFloat(document.getElementById("angle").value);

  positionX = 50; // Default position for testing
  positionY = Math.random() * canvas.height / 2; // Default position for testing
  rotationAngleDg = 0;

  velocityMetresPerSecondX =
      velocityMetresPerSecond *
      Math.cos(angleDg * Math.PI / 180);
  velocityMetresPerSecondY =
      velocityMetresPerSecond *
      Math.sin(angleDg * Math.PI / 180);

  return new Banana(
      positionX, positionY,
      rotationAngleDg,
      velocityMetresPerSecondX,
      velocityMetresPerSecondY );
}
