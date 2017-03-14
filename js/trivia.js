/* 
	@author: Anup Sawant
	@desc: Trivia Game for Coding Bootcamp
	@date: 13/3/2017
*/

var questions = {
	1: {
		question: "What's the worst case runtime of mergesort?",
		options: ["o(n)","o(nlogn)","o(logn)","o(n^2)"],
		ans:"o(nlogn)",
	},

	2: {
		question: "Given an array of numbers X and a number N, what's the runtime of finding the position of N in X if X were sorted?",
		options: ["o(n)","o(nlogn)","o(logn)","o(n^2)"],
		ans:"o(n)",
	},

	3: {
		question: "What gives the best solution for finding edit distance between two strings?",
		options: ["Parallel Programming","Divide and Conquer","Dynamic Programming","Recursive Programming"],
		ans:"Dynamic Programming",
	},
	4: {
		question: "What's the best way to extend the functionality of a function in Python or Javascript?",
		options: ["Generator","Inheritance","Polymorphism","Decorator"],
		ans:"Decorator",
	},
	5: {
		question: "What's the max int in python?",
		options: ["2^32","2^10","Unlimited precision","2^64"],
		ans:"Unlimited precision",
	},
	6: {
		question: "What does gradient descent lead to?",
		options: ["slope = 1","slope = -1","slope = 0","slope = 0.5"],
		ans:"slope = 0",
	}
}

var currQuestion = 1;
var wins = 0;
var losses = 0;
var timer = null;

var clear = function(){
	$("#question").empty();
	$("#options").empty();
	$("#time-left").empty();
	$("#correct-answer").empty();
	$("#wins").empty();
	$("#losses").empty();
	$('#restart').hide();
}

var endGame = function(){
	clear();
	$("#wins").html("Total wins : " + wins);
	$("#losses").html("Total losses : " + losses);
	$('#restart').show();
}

var displayQuestion = function(){
	$("#question").html(questions[currQuestion].question);
	for (var option of questions[currQuestion].options){
		$("#options").append($("<li data-value='"+ option + "'><h3>" + option + "</h3></li>"));
	}
}

var newQuestion = function(){
	clear();
	if(currQuestion <= 6){
		displayQuestion();
		var time_left = 30;
		timer = setInterval(function(){
			$("#time-left").html("Time left : " + time_left + "s");
			time_left -= 1;
			if(time_left === -1){
				clearInterval(timer);
				clear();
				$("#question").html("Time up !!");
				losses += 1;
				$("#correct-answer").html("Correct Answer was : " + questions[currQuestion].ans);
				var q_break = setTimeout(function(){
					currQuestion += 1;
					newQuestion();
				},3000);
			}
		},1000);
	}else{
		endGame();
	}
}

$(document).on('click','li',function(){
	clear();
	clearInterval(timer);

	if ($(this).attr("data-value") === questions[currQuestion].ans){
		$("#question").html("Good job !!");
		wins += 1;
	}else{
		$("#question").html("Wrong Answer !!");
		$("#correct-answer").html("Correct Answer was : " + questions[currQuestion].ans);
		losses += 1;
	}
	currQuestion += 1;
	var q_break = setTimeout(function(){
		newQuestion();
	},3000);

});

var start = function(){
	newQuestion();
}

$(document).on('click','button',function(){
	clear();
	currQuestion = 1;
	wins = 0;
	losses = 0;
	timer = null;
	start();
})

$(document).ready(function(){
	start();
});










