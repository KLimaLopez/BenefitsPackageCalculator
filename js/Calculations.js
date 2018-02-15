$(document).ready(function(){

    var counter = 1; //displays dependent number
    var dependentCounter = 0;//counts dependents
    $("#addDependent").click(function () {
        //.attr sets or returns attributes and values of the selected elements
            //$(selector).attr(attribute, value)
            
         //put it in a div so that the new textbox would be created in a new textbox
        var newDependentDiv = $(document.createElement('div'))
                .attr("id", 'DependentDiv' + counter);
        newDependentDiv.after().html('<label>Dependent # ' + counter + ' : </label>' +
	      '<input type="text" name="dependent' + counter +
	      '" id="dependent' + counter + '" value="" >');
            
    
        newDependentDiv.appendTo("#Dependents");
        dependentCounter++;
		counter++;        
     });
     
     $("#removeDependent").click(function () {
		if(counter==1){
			alert("There aren't any dependents to remove.");
		}
		counter--;
		$("#DependentDiv" + counter).remove();
     });
     
     $("#calculateDeduction").click(function()
     {
		var resultMonthly = '';
		var resultYearly = '';
		var aRegex = /[?^a]/gi; //Regex for names starting with 'A'   
		var nARegex = /^(?!a.*$).*/g;
		var dependentDiscountCounter = 0;//counts # of dependents w/ discount
		var dependentDedCounter = 0;//counts # of dependents w/o discount
		var empValue = $('#employeeName').val();//retrieves employeeName value
		var employeeBenefitsCost = (1000/26);

		var empDiscountDeductionPerCheck = 0;
		var monthlyP = 0;
		var empDiscountDeductionPerYear= 0;

		var empDeductionPerCheck = 0;
		var empDeductionPerYear = 0;
		var empResultMonthly = 0;
		var empResultYearly = 0;

        //Employee
        if(empValue.match(aRegex))
         {
			empDiscountDeductionPerCheck = (employeeBenefitsCost-(employeeBenefitsCost *.10));
			empDiscountDeductionPerYear = (1000-(1000*.10));                
         }
        else if(empValue.match(nARegex) && empValue !== '')//makes sure that value is not null
        {
             empDeductionPerCheck = employeeBenefitsCost;
             empDeductionPerYear = 1000;
        }
        else
        {
            var emptyMsg = "Please enter an employee name";
            alert(emptyMsg);
        }			
         
         //Dependent
		for(i=1; i<counter; i++)
		{
			var depValue = $('#dependent'+i).val();

			if(depValue.match(aRegex))//checks if dependent name begins with 'A'
			{
			  dependentDiscountCounter++;   
			}			
			else if(depValue !== '') //makes sure that the value is not null
			{
			  dependentDedCounter++;
			}
		}        
        //----Totals 
		var depDeductionMonthly = (dependentDedCounter*500)/26;
		var depDiscountDeductionMonthly = (dependentDiscountCounter*(500-(500*.10)))/26;

			//monthly deductions with discount
			var monthlyDiscountD = "Monthly Cost of Dependent Benefits (with 10% discount) = $" + depDiscountDeductionMonthly.toFixed(2);
			$('#totalDependentDiscountResultMonthly').text(monthlyDiscountD);

		var totalDependentDeductionMonthly = depDeductionMonthly + depDiscountDeductionMonthly;
		resultMonthly = totalDependentDeductionMonthly.toFixed(2);
			//Dependent - Total monthly deductions. Includes discount if applicable
			var monthlyDependentResult = "Total Monthly Cost of Dependent Benefits (includes 10% discount if applicable) = $" + resultMonthly;
			$('#totalDependentResultMonthly').text(monthlyDependentResult);
		


		var depDeductionYearly = (dependentDedCounter*500);
		var depDiscountDeductionYearly = (dependentDiscountCounter*(500-(500*.10)));
			//Dependent - Yearly deduction with discount
			var yearlyDiscountD = "Yearly Cost of Dependent Benefits (with 10% discount) = $" + depDiscountDeductionYearly.toFixed(2);
			$('#totalDependentDiscountResultYearly').text(yearlyDiscountD);
			
		var totalDependentDeductionYearly = depDeductionYearly + depDiscountDeductionYearly;
		resultYearly = totalDependentDeductionYearly.toFixed(2);
			//Dependent - Total yearly deductions. Includes discount if applicable
			var yearlyDependentResult = "Total Yearly Cost of Dependent Benefits (includes 10% discount if applicable) = $" + resultYearly;
			$('#totalDependentResultYearly').text(yearlyDependentResult);
		  
		empResultMonthly = empDiscountDeductionPerCheck + empDeductionPerCheck;
		var monthlyGrandTotals = totalDependentDeductionMonthly + empResultMonthly;
			//Monthly grand total of employee and dependent cost
			var grandTotalResult = " Monthly Grand Total Cost of Benefits = $" + monthlyGrandTotals.toFixed(2);
			$('#grandTotalMonthly').text(grandTotalResult);


		empResultYearly = empDiscountDeductionPerYear+ empDeductionPerYear;
		var yearlyGrandTotals = totalDependentDeductionYearly + empResultYearly;
			//Yearly grand total of employee and dependent cost
			var grandTotalResult = " Yearly Grand Total Cost of Benefits = $" + yearlyGrandTotals.toFixed(2);
			$('#grandTotalYearly').text(grandTotalResult);	  
     });
  });