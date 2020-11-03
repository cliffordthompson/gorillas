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
//   This is the data model object for a window
//
// Inputs:
//   positionX - The x position of the window
//   positionY - The y position of the window
//   widthPx   - The width of the window in pixels
//   heightPx  - The height of the window in pixels
//   colour    - The RBG Hex value the window colour
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function Window (
    positionX, positionY, widthPx, heightPx, colour ) {

  this.positionX = positionX;
  this.positionY = positionY;
  this.widthPx = widthPx;
  this.heightPx = heightPx;
  this.fillColour = colour;
}
