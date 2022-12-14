import React, { useState } from 'react';

const TicTacToe = () => {
    const[turn, setTurn] = useState('x');
    const[cells, setCells] = useState(Array(9).fill(''));
    const[winner, setWinner] = useState(false);
    var is_winner_exist =false
    const checkForWinner = (squares) => {
        let combos = {
			across: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],
			down: [
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
			],
			diagnol: [
				[0, 4, 8],
				[2, 4, 6],
			],
		};
        

        for (let combo in combos) {
			combos[combo].forEach((pattern) => {
				if (
					squares[pattern[0]] === '' ||
					squares[pattern[1]] === '' ||
					squares[pattern[2]] === ''
				) {
					// do nothing
				} else if (
					squares[pattern[0]] === squares[pattern[1]] &&
					squares[pattern[1]] === squares[pattern[2]]
				) {
					setWinner(squares[pattern[0]]);
                    is_winner_exist=true
				}
			});
		}
        
        
        const result = squares.includes('');
        if(result === false && is_winner_exist===false ) {
            setWinner("NO ONE")
        }
    
    };

    const leftClick = (num) => {   
        if (cells[num] !== ''){
            alert('Already Clicked!');
            return;
        }
        
        let squares = [...cells];

        if (turn === 'x') {
            squares[num] = 'x'
            setTurn('o');
        } else {
            squares[num] = 'o'
            setTurn('x');
        }

        checkForWinner(squares);
        setCells(squares);
    }

    const handleRestart = () => {
        setWinner(false);
        is_winner_exist=false
        setCells(Array(9).fill(''));

    }

    const Cell = ({num}) => {
        return <td onClick={() => leftClick(num)}>{cells[num]}</td>
    }

    return (
        <div className='gameContainer'>
            Turn: {turn}
            <table>
                <tbody>
                    <tr className='tr-line'>
                        <Cell num={0}/>
                        <Cell num={1}/>
                        <Cell num={2}/>
                    </tr>
                    <tr className='tr-line'>
                        <Cell num={3}/>
                        <Cell num={4}/>
                        <Cell num={5}/>
                    </tr>
                    <tr className='tr-line'>
                        <Cell num={6}/>
                        <Cell num={7}/>
                        <Cell num={8}/>
                    </tr>
                </tbody>
            </table>
            {winner && (
                <>
                <p>{winner} is Winner!</p>
                <button onClick={() => {handleRestart()}}>Play Again!</button>
                </>
                
            )}

        </div>
    
    )
}

export default TicTacToe;