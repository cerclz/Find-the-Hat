const create = require('prompt-sync');

const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field{
    constructor(field, width, height){
        this._field = field
        this._width = width,
        this._height = height
    }

    print(){
        for (let row of this._field){
            console.log(row.join(' '));
          }
    }
    static generateField(width, height){
        let tempField = []
        for (let i = 0; i < height; i++){
            tempField[i] = []
            for (let j = 0; j < width; j++){
                tempField[i][j] = fieldCharacter;
            }
        } 
        return tempField; 
    }

    setLevel(){
        //set random hat
        let x = Math.floor(Math.random() * this._width);
        let y = Math.floor(Math.random() * this._height);
        this._field[y][x] = hat;
        
        //set holes
        for (let i = 0; i < 7; i++){
            let q = Math.floor(Math.random() * this._width);
            let r = Math.floor(Math.random() * this._height);
            if (this._field[r][q] != this._field[y][x]){
                this._field[r][q] = hole;
            }
        }
    }

    play(){  
        let x = 3;
        let y = 0;
        this._field[x][y] = pathCharacter;
        this.print();
        let hatfound = false;
        let lose = false;
        while (!hatfound && !lose){
            const input = prompt('move with w a s d (top, left, bottom, right) to reach your hat');
            switch (input){
                case 'w':
                    x = x - 1;
                    if(this._field[x][y] === hat){
                        this.print();
                        console.log('You Win!');
                        hatfound = true;
                    } else if (x != -1 && x < this._height && this._field[x][y] != hole ){
                        this._field[x][y] = pathCharacter;
                        this.print();
                    } else{
                        console.log('Out of bounds! You lose!')
                        lose = true;
                    }
                break;
                case 's':
                    x = x + 1;
                    if(this._field[x][y] === hat){
                        this.print();
                        console.log('You Win!');
                        hatfound = true;
                    } else if (x != 0 && x < this._height && this._field[x][y] != hole ){
                        this._field[x][y] = pathCharacter;
                        this.print();
                    } else{
                        console.log('Out of bounds! You lose!')
                        lose = true;
                    }
                break;
                case 'a':
                    y = y - 1;
                    if(this._field[x][y] === hat){
                        this.print();
                        console.log('You Win!');
                        hatfound = true;
                    } else if (y != -1 && y < this._width && this._field[x][y] != hole ){
                        this._field[x][y] = pathCharacter;
                        this.print();
                    } else{
                        console.log('Out of bounds! You lose!')
                        lose = true;
                    }
                break;
                case 'd':
                    y = y + 1;
                    if(this._field[x][y] === hat){
                        this.print();
                        console.log('You Win!');
                        hatfound = true;
                    } else if (y != 0 && y < this._width && this._field[x][y] != hole){
                        this._field[x][y] = pathCharacter;
                        this.print();
                    } else{
                        console.log('Out of bounds! You lose!')
                        lose = true;
                    }
                break;
            }
        }
    }
};

let width = 10;
let height = 10;

let generate = Field.generateField(width, height);

//Generate Field

newField = new Field(generate, width, height);
newField.setLevel();

//Play The Game

newField.play()
