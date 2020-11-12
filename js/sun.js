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
//   This is the data model object for the sun.
//
// Inputs:
//   positionX - The x position of the sun
//   positionY - The y position of the sun
//   isSuprised - Boolean that indicates the suprised
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function Sun (
  positionX, positionY, isSuprised) {

  this.positionX = positionX;
  this.positionY = positionY;
  this.isSuprised = isSuprised;
  this.fillColour = "#fffe55";
  this.lineColour = "#fffe55";
}
