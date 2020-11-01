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
//   This is the data model object for a building
//
// Inputs:
//   positionX - The x position of the building
//   positionY - The y position of the building
//   widthPx  - The width of the building in pixels
//   heightPx  - The height of the building in pixels
//   colour    - The RBG Hex value the buildign colour
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function Building (
    positionX, positionY, widthPx, heightPx, colour ) {

  this.positionX = positionX;
  this.positionY = positionY;
  this.widthPx = widthPx;
  this.heightPx = heightPx;
  this.fillColour = colour;
}
