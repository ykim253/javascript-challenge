/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

document.addEventListener('DOMContentLoaded', onReady());

function onReady() {
	var signupForm = document.getElementById('signup');
	var stateSelect = signupForm.elements['state'];
	var option;
	var i;

	/* grab state list */
	for (i = 0; i < usStates.length; ++i) {
		option = document.createElement('option');
		option.innerHTML = usStates[i].name;
		option.value = usStates[i].code;
		stateSelect.appendChild(option);
	}


	/* for occupation and when selecting occupation OTHER */
	var occupationSelect = signupForm.elements['occupation'];
	var occupationOther = signupForm.elements['occupationOther'];
	
	occupationSelect.addEventListener('change', function () {
		if (occupationSelect.value == 'other') {
			occupationOther.style.display = 'block';
		}
	});

	/* for navigating no thanks button */
	var noThanks = document.getElementById('cancelButton');
	noThanks.addEventListener('click', function() {
		if (window.confirm('Will you leave this page?')) {
			window.location = 'http://www.google.com';
		}
	});
	
	/* validating before submitting */
    signupForm.addEventListener('submit', onSubmit);
}

function onSubmit(eventObject) {
	var i;
	var fields = ['firstName', 'lastName', 'address1', 'city', 'state'];
	var isValid = true;
	
	/*if occupation is selected as other, one is required to enter a text */
	if (signup.elements['occupation'].value == 'other') {
		isValid &= validate(signup.elements['occupationOther']);
	}

	/* loop through each required field */
	for (i = 0; i < fields.length; i++) {
		isValid &= validate(signup.elements[fields[i]]);
	}
	isValid &= validateZip(signup.elements['zip']);
	isValid &= validateBirthdate(signup.elements['birthdate']);
	
	if (!isValid) {
		if(eventObject.preventDefault) {
			eventObject.preventDefault();
		}
		eventObject.returnValue = false;
		return false;
	} 
	return isValid;
}

function validate(field) {
	if (field.value && field.value.trim() != '') {
		field.className = 'form-control';
		return true;
	} else {
		field.className = 'form-control invalid-field';
		field.placeholder = 'Please fill out the information';
		return false;
	}
}

function validateZip(field) {
	var zipRegExp = new RegExp('^\\d{5}$');
	if (!zipRegExp.test(field.value)) {
		field.className = 'form-control invalid-field';
		return false;
	} else {
		field.className = 'form-control';
		return true;
	}
}

function validateBirthdate(field) {
	var bdaymsg = document.getElementById('birthdateMessage');
	if (field.value) {
		var today = new Date();
   	 	var bDay = new Date(field.value);
    	var yearsDiff = today.getFullYear() - bDay.getUTCFullYear();
    	var monthsDiff = today.getMonth() - bDay.getUTCMonth();
    	var daysDiff = today.getDate() - bDay.getUTCDate();
    	if (monthsDiff < 0 || (0 === monthsDiff && daysDiff < 0)) {
        	yearsDiff--;
    	}
		field.className = 'form-control';
		if (yearsDiff < 13) {
			bdaymsg.innerHTML = "Law requires that you must be at least 13 years old to sign up.";
			field.className = 'form-control invalid-field';
			return false;
		} else {
			bdaymsg.innerHTML = '';
			return true;
		}
	} else {
		bdaymsg.innerHTML = "The day Santa dropped you off at your parents";
		field.className = 'form-control invalid-field';
		return false;
	}
}