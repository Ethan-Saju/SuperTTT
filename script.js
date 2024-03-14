
const squares = document.querySelectorAll('.square');

for (let i=0;i<squares.length; i++)
{
    squares[i].addEventListener('click', superTicTacToe);
} 


let tilesPlayed=0
let newBoardNumber;
let nextBoardNumber=-1;
let currentPlayer=1;
let gameOn=true;



let subBoard= [];
for(let i=0;i<9;i++)
{
    subBoard[i]=[]

    for(let j=0;j<3;j++)
    {   
        subBoard[i][j]=[]
        for(let k=0;k<3;k++)
        {   
        subBoard[i][j][k]='';
        }
    }
}


let mainBoard= [];
for(let i=0;i<3;i++)
{
    mainBoard[i]=[];
    for(let j=0;j<3;j++)
    {   
        mainBoard[i][j]=''

    }
}


let solved =[];
for(let i=0;i<9;i++)
{
    solved[i]=false;    
}

function showBoardsAvailable(nextBoardNumber)
{   


    if (solved[nextBoardNumber])
    {
        let availableBoards=""
        for(let i=0;i<9;i++)
        {
          if (!solved[i])
          { 

            availableBoards+= " " + (i+1).toString();
            
          }
          

        }

        document.getElementById("boardsAvailable").textContent=availableBoards;
        return;
    }

    document.getElementById("boardsAvailable").textContent=" "+ (nextBoardNumber+1).toString();  
}

function issubBoardSolved(board,token)
{
    //check rows

    for(let i=0;i<3;i++)
    {
        if (board[i][0]===board[i][1] && board[i][0]===board[i][2] && board[i][0]===token)
        {
            return true;
        }
    }

    //check columns

    for(let i=0;i<3;i++)
    {
        if (board[0][i]===board[1][i] && board[0][i]===board[2][i] && board[0][i]===token)
            {

                return true;
            }
    }

    //check diagonals

    if (board[0][0]===board[1][1] &&  board[0][0]===board[2][2] &&  board[0][0]===token)
    {
        return true;
    }

    if (board[0][2]===board[1][1] &&  board[0][2]===board[2][0] &&  board[0][2]===token)
    {
        return true;
    }

    return false;
}


function isMainBoardSolved(board,token)
{
    return issubBoardSolved(board,token);
}


function getToken(currentPlayer)
{
    if (currentPlayer==1)
    {
        return 'X';
    }
    return 'O';
}
    


function isSolved(boardNumber)
{
    return (solved[boardNumber]);
}

function isValidPos(newBoardNumber,row,column)
{
    return (subBoard[newBoardNumber][row][column]==='');
}

function isValidBoard(nextBoardNumber,newBoardNumber)
{   
    if (nextBoardNumber==-1)
        return true;

    if (solved[nextBoardNumber])
    {
        return true;
    }

    return (nextBoardNumber==newBoardNumber);
}


function changeCurrentPlayer()
{   


    if (currentPlayer==1)
    {
        document.getElementById("currentPlayer").textContent="Current Player: Player 2";
        currentPlayer=2;
    }
    else
    {
        document.getElementById("currentPlayer").textContent="Current Player: Player 1";
        currentPlayer=1;
    }
}

function markTile(event,boardNumber,row,column)
{

    if (currentPlayer==1)
    {   
        event.target.style.color="red";
        event.target.textContent="X";
        subBoard[boardNumber][row][column]="X";
    }
    else
    {   
        event.target.style.color="green";
        event.target.textContent="O";
        subBoard[boardNumber][row][column]="O";
    }
       
}

function markOnMainBoard(boardNumber,token)
{
    let row = Math.floor(boardNumber/3);
    let column= boardNumber%3;
    mainBoard[row][column]=token;

    if (token==="X")
    {
    console.log("b"+boardNumber.toString());
    document.getElementById("b"+boardNumber.toString()).style.backgroundColor="#f59da7";
    }

    else

    {
    console.log("b"+boardNumber.toString());
    document.getElementById("b"+boardNumber.toString()).style.backgroundColor="#b7f595";
    }
}



function superTicTacToe(event)
{   
    if(!gameOn)
    {
        document.getElementById("Error").textContent="Game Over!";
        return;
    }
    
    
    let squarePlayed=(event.target.id).slice(6);
    let row=parseInt(squarePlayed[0]);
    let column=parseInt(squarePlayed[1]);
    newBoardNumber = parseInt((event.target.classList[1])[1]);

    document.getElementById("Error").textContent="-";

    if (isSolved(newBoardNumber))
    {
        document.getElementById("Error").textContent="Board is already solved!";
        return;
    }
    
    if (!isValidBoard(nextBoardNumber,newBoardNumber))
    {
        document.getElementById("Error").textContent="Invalid Board!";
        return;
    }

    if (!isValidPos(newBoardNumber,row,column))
    {
        document.getElementById("Error").textContent="Already Filled!";
        return;
    }

    
    markTile(event,newBoardNumber,row,column);

    let token = getToken(currentPlayer);

    if (issubBoardSolved(subBoard[newBoardNumber],token))
    {
        solved[newBoardNumber]=true;

        markOnMainBoard(newBoardNumber,token);
        if (isMainBoardSolved(mainBoard,token))
        {
            document.getElementById("currentPlayer").textContent="Player "+ currentPlayer +" wins!";
            gameOn=false;
            return;
        }

    }

    tilesPlayed++;

    if (tilesPlayed==81)
    {   
        document.getElementById("currentPlayer").textContent="It's a draw!";
        gameOn=false;
        return;
    }

    nextBoardNumber= (row*3)+column;

    changeCurrentPlayer();
    
    showBoardsAvailable(nextBoardNumber);
    
    
}

document.getElementById("restart").onclick=function()
{
    location.reload();
}



