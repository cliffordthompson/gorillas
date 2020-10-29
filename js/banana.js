// ***************************************************************************
//                                                                           *
//  Copyright (c) 2020 Clifford Thompson                                     *
//                                                                           *
//  All code in this file is released under Creative Commons Attribution     *
//  (CC-BY) license : https://creativecommons.org/licenses/by/4.0/.          *
//                                                                           *
// ***************************************************************************

// ***************************************************************************
// Description:
//   This is the data model object for a banana.
//
// Inputs:
//   positionX - The x position of the banana
//   positionY - The y position of the banana
//   rotationAngleDg - The rotation of the banana in degrees. 0 degrees is at
//                     3'oclock and goe clockwise.
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function Banana (
  positionX, positionY, rotationAngleDg ) {

  this.positionX = positionX;
  this.positionY = positionY;
  this.rotationAngleDg = rotationAngleDg
  this.fillColour = "#ffff00";
  this.lineColour = "#ffff00"
}
