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
//   This is the data model object for a gorilla.
//
// Inputs:
//   positionX - The x position of the gorilla
//   positionY - The y position of the gorilla
//   leftArmUp - Boolean that indicates the position of the left arm
//   rightArmUp - Boolean that indicates the position of the right arm
// Outputs:
//   None
// Returns:
//   None
// ***************************************************************************
//
function Gorilla (
  positionX, positionY, leftArmUp, rightArmUp) {

  this.positionX = positionX;
  this.positionY = positionY;
  this.leftArmUp = leftArmUp;
  this.rightArmUp = rightArmUp;
  this.bodyColour = "#ffaa52";
  this.bodyLineColour = "#0000aa"
}
