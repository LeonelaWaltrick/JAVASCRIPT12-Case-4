"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Case Problem 4

   Author: Leonela Waltrick
   Date:   04/23/2026

   Filename: gi_sort.js
*/


// GLOBAL VARIABLES
var tableData = [];
var dataCategories = [];
var sortIndex = 0;
var sortDirection = 1;


// RUN FUNCTIONS WHEN PAGE LOADS
window.addEventListener("load", function() {
   defineDataArray();
   writeTableData();
   defineColumns();
});


// FUNCTION: Read table data into a 2D array
function defineDataArray() {

   var tableRows = document.querySelectorAll("table.sortable tbody tr");

   for (var i = 0; i < tableRows.length; i++) {

      var rowCells = tableRows[i].children;
      var rowValues = new Array(rowCells.length);

      for (var j = 0; j < rowCells.length; j++) {
         rowValues[j] = rowCells[j].textContent;
      }

      tableData.push(rowValues);
   }

   tableData.sort(dataSort2D);
}


// FUNCTION: Write sorted data back into the table
function writeTableData() {

   var newTableBody = document.createElement("tbody");

   for (var i = 0; i < tableData.length; i++) {

      var tableRow = document.createElement("tr");

      for (var j = 0; j < tableData[i].length; j++) {

         var tableCell = document.createElement("td");
         tableCell.textContent = tableData[i][j];
         tableRow.appendChild(tableCell);
      }

      newTableBody.appendChild(tableRow);
   }

   var oldTableBody = document.querySelector("table.sortable tbody");
   oldTableBody.parentNode.replaceChild(newTableBody, oldTableBody);
}


// FUNCTION: Set up column headings and sorting icons
function defineColumns() {

   var styleSheet = document.createElement("style");
   document.head.appendChild(styleSheet);

   styleSheet.sheet.insertRule(
      "table.sortable thead tr th { cursor: pointer; }", 0);

   styleSheet.sheet.insertRule(
      "table.sortable thead tr th::after { content: '\\00a0'; font-family: monospace; margin-left: 5px; }", 1);

   styleSheet.sheet.insertRule(
      "table.sortable thead tr th:nth-of-type(1)::after { content: '\\25b2'; }", 2);

   var headingCells = document.querySelectorAll("table.sortable thead tr th");

   for (var i = 0; i < headingCells.length; i++) {

      dataCategories[i] = headingCells[i].textContent;

      headingCells[i].addEventListener("click", columnSort);
   }
}


// FUNCTION: Sort table when a column heading is clicked
function columnSort(e) {

   var columnText = e.target.textContent;
   var columnIndex = dataCategories.indexOf(columnText);

   if (columnIndex === sortIndex) {
      sortDirection *= -1;
   } else {
      sortIndex = columnIndex;
      sortDirection = 1;
   }

   var columnNumber = columnIndex + 1;

   var columnStyles = document.styleSheets[document.styleSheets.length - 1];
   columnStyles.deleteRule(2);

   if (sortDirection === 1) {
      columnStyles.insertRule(
         "table.sortable thead tr th:nth-of-type(" + columnNumber + ")::after { content: '\\25b2'; }", 2);
   } else {
      columnStyles.insertRule(
         "table.sortable thead tr th:nth-of-type(" + columnNumber + ")::after { content: '\\25bc'; }", 2);
   }

   tableData.sort(dataSort2D);
   writeTableData();
}


// FUNCTION: Compare values for sorting (provided by textbook)
function dataSort2D(a, b) {

   if (isNaN(a[sortIndex]) === false && isNaN(b[sortIndex]) === false) {
      return (a[sortIndex] - b[sortIndex]) * sortDirection;
   } else {
      var aVal = a[sortIndex].toLowerCase();
      var bVal = b[sortIndex].toLowerCase();

      if (aVal < bVal) return -1 * sortDirection;
      if (aVal > bVal) return 1 * sortDirection;
      return 0;
   }
}
