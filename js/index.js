var count = 0; 
var sequence = [];
var playing = false;
var playingIndex = 0;
var sequencePlay = [];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function updateCounter() {
  $('.counter').text(count.toString());
}

function addToSequence(array) {
  array.push(getRandom(1,4)); 
}

function resetBoard() {
  sequence = []; 
  count = 0;
}

function enableGoButton() {
    $('.show').on('click', function () { 
      showSequence(sequence);
      $(this).off('click');
    });
}

function highlightSquare(squareId) { 
  var squareId = squareId.toString();
  
  $('#' + squareId).toggleClass('highlight');
  setTimeout(function () {
    $('#' + squareId).toggleClass('highlight');
    },500);
};

function flashBackground(feedback) {
  $('.square').toggleClass(feedback);
    setTimeout(function () {
    $('.square').toggleClass(feedback);
  },700);
  return null;
};
  
function showSequence(array) {
  addToSequence(array);
   
  var i = 0; 
   var interval = setInterval(function(){
     console.log(array[i])
     highlightSquare(array[i]);
     updateCounter();
     i++;

     if(i == array.length) {
       clearInterval(interval)};
     },1000);
  
  playingIndex = 0;
 };


$('.show').on('click', function () { 
  showSequence(sequence);
  $(this).off('click');
  // console.log(sequence);
});

$('.reset').on('click', function () {
  console.log('reset');
  resetBoard();
  updateCounter();
  enableGoButton();
});

  // Detect click on square
  $('.square').on('click', function() {
    //console.log('square clicked: ' + $(this).attr('id'))
    var clickedSquare = $(this).attr('id');
    
    if(clickedSquare == sequence[playingIndex].toString()) {
      highlightSquare(sequence[playingIndex]);
      playingIndex++;
      //console.log("correct square clicked")
      
      if (playingIndex == sequence.length) {
        count = sequence.length;
        updateCounter();
        
        setTimeout(function () {
          flashBackground('correct');
        },800); 
        
        setTimeout(function() {
          showSequence(sequence)
        }, 1400);
      }
      
    } else {
      setTimeout(flashBackground('wrong'), 500);
      resetBoard();
      enableGoButton();
    }
  });