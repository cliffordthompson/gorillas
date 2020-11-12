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
//   This is the data model object for an explosion
//
// Inputs:
//   positionX - The x position of the explosion
//   positionY - The y position of the explosion
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function Explosion (
    positionX, positionY, radiusXPx, radiusYPx) {

  this.positionX = positionX;
  this.positionY = positionY;
  this.radiusXPx = radiusXPx;
  this.radiusYPx = radiusYPx;
  this.fillColour = "#ff2222";
}
