/**
 * Copyright (c) 2025 sakib-maho
 * Licensed under the MIT License
 * See LICENSE file for details
 */

var startdate;
var enddate;
$(document).ready(function () {

   $(function () {
      $("#checkInDate").datepicker({
         minDate: 0,
         dateFormat: "yy-mm-dd"
      });
      $("#checkOutDate").datepicker({
         dateFormat: "yy-mm-dd"
      });
   });

   //////
   $('#checkInDate').change(function () {
      startdate = $(this).datepicker('getDate');
      $('#checkOutDate').datepicker('option', 'minDate', startdate)
   });
   //////

});

function myFunction() {
   console.log(startdate.getFullYear(), startdate.getMonth(), startdate.getDate());

}

