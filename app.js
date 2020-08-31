/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn

- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScores, activePlayer,gamePlaying,lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function () 
{
    if(gamePlaying)
        {
            //1. Random number
            var dice = Math.floor(Math.random()*6) +1;
            var dice1 = Math.floor(Math.random()*6) +1;
            
            console.log(dice,dice1);
            
            //2. Display result
            document.querySelector('#dice-0').style.display = 'block';
            document.querySelector('#dice-1').style.display = 'block';
            document.querySelector('#dice-0').src = 'dice-' + dice + '.png';
            document.querySelector('#dice-1').src = 'dice-' + dice1 + '.png';
            
           

            //3. Update the roundNumber but only IF the rolled number was NOT ONE
            
            if(dice!==1 && dice1!==1)
            {
                //add score
                roundScores += dice + dice1;
                document.querySelector('#current-' + activePlayer).textContent = roundScores;
            }
            else
            {
                //next player
                nextPlayer();
            }
            
            //4. if 6 rolled twicein a row then lose all points
            /*
            if(lastDice === 6 && dice === 6)
                {
                    document.querySelector('#score-' + activePlayer).textContent = 0;
                    nextPlayer();
                }
            else if(dice!==1)
            {
                //add score
                roundScores += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScores;
            }
            else
            {
                //next player
                nextPlayer(); 
                console.log(lastDice,dice);
            }
            lastDice = dice;
            */
        }
});

document.querySelector('.btn-hold').addEventListener('click',function()
{
    if(gamePlaying)
    {
        //Add current score to global score
        scores[activePlayer] += roundScores;
    
        // update the UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        //update winning score
        var input = document.querySelector('.winNo').value;
         
        if(input)
            {
                var winNo = input;
            }
        else
            {
                var winNo = 100;
            }
        
        //check if player won the game
        if(scores[activePlayer] >= winNo)
        {
            //won
            document.querySelector('#name-' + activePlayer).textContent  = 'winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else
        {
            //next player
            nextPlayer();
        }   
    }   
});

function nextPlayer()
{ 
    activePlayer === 0? activePlayer = 1 : activePlayer = 0;
    roundScores =0;
    
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
            
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
            
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
            
    document.querySelector('#dice-' + '0').style.display = 'none'; 
    document.querySelector('#dice-' + '1').style.display = 'none'; 
}

document.querySelector('.btn-new').addEventListener('click', init);

function init()
{
    scores = [0,0];
    activePlayer = 0;
    roundScores = 0;
    gamePlaying = true;
    //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
    //var x = document.querySelector('#score-0').textContent;

    document.querySelector('#dice-' + '0').style.display = 'none';
    document.querySelector('#dice-' + '1').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent  = 'Player1';
    document.getElementById('name-1').textContent  = 'Player2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
    
}
