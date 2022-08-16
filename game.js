(function () {
    var CSS = {
        arena: {
            width: 900,
            height: 600,
            background: '#000',
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '999',
            transform: 'translate(-50%, -50%)'
        },
        menu: {
            width: '900px',
            height: '600px',
            position: 'fixed',
            background: '#fff',
            top: '50%',
            left: '50%',
            zIndex: '1000',
            transform: 'translate(-50%, -50%)',
            border: '10px solid #000',
            color: '#000',
            textAlign: 'center',
            fontSize: '90px',
            fontVariant: 'small-caps',
            fontFamily: 'Courier'
        },
        play: {
            width: '200px',
            background: '#000',
            position: 'absolute',
            color: '#fff',
            fontSize: '50px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        ball: {
            width: 15,
            height: 15,
            position: 'absolute',
            top: 0,
            left: 350,
            borderRadius: 50,
            background: '#fff'
        },
        line: {
            width: 0,
            height: 600,
            borderLeft: '2px dashed #fff',
            position: 'absolute',
            top: 0,
            left: '50%'
        },
        stick: {
            width: 12,
            height: 85,
            position: 'absolute',
            background: '#696969',
            border:'1px solid #fff',
            borderRadius: 20
        },
        stick1: {
            left: 0,
            top: 150
        },
        stick2: {
            left: 888,
            top: 150
        },
        scoreboard: {
            width: '300px',
            height: '100px',
            fontSize: '40px',
            fontFamily: 'Courier',
            textAlign: 'Center',
            color: '#fff',
            display: 'inline-block',
            position: 'absolute',
        },
        scoreboard1: {
            left: '7.5%',
        },

        scoreboard2: {
            left: '57.5%',
        },
        gameOver: {
            width:'450px',
            height:'450px',
            position:'fixed',
            top: '50%',
            left: '50%',
            zIndex: '1000',
            transform: 'translate(-50%, -50%)',
            fontSize:'100px',
            fontFamily:'Courier',
            textAlign:'Center',
            color:'#ff1424',
            fontVariant:'small-caps',
        },

    };
    
    var CONSTS = {
        gameSpeed: 20,
        score1: 0,
        score2: 0,
        stick1Speed: 0,
        stick2Speed: 0,
        ballTopSpeed: 0,
        ballLeftSpeed: 0,
        gameMod: '',
    };

    function setCookie(cname, cvalue) {
        document.cookie = cname + "=" + cvalue + ";path=/;domain=.lcwaikiki.com";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    function gameOver(){
        if(CONSTS.score1 ===5 ){
         $('<div/>', { id: 'gameOver' }).css(CSS.gameOver).appendTo('#pong-game').html('Player 1 Won!');
         
         
         CONSTS.stick1Speed = 0;
         CONSTS.stick2Speed = 0;
         roll();
         
            
        }
        if(CONSTS.score2 ===5){
            $('<div/>', { id: 'gameOver' }).css(CSS.gameOver).appendTo('#pong-game').html('Player 2 Won!');
            CONSTS.stick1Speed = 0;
            CONSTS.stick2Speed = 0;
            roll();
         }

    }

    function start() {
        draw();
        drawMenu();
        setEvents();
        
        


    }

    function drawMenu() {
        $('<div/>', { id: 'menu' }).css(CSS.menu).appendTo('body').html('PONG GAME');
        $('<button/>', { id: 'h2h' }, { type: 'submit}' }).css(CSS.play).css('top', '50%').appendTo('#menu').html('H2H');
       
    }

    function draw() {
        $('<div/>', { id: 'pong-game' }).css(CSS.arena).appendTo('body');
        $('<div/>', { id: 'pong-line' }).css(CSS.line).appendTo('#pong-game');
        $('<div/>', { id: 'pong-ball' }).css(CSS.ball).appendTo('#pong-game');
        $('<div/>', { id: 'stick-1' }).css($.extend(CSS.stick1, CSS.stick))
            .appendTo('#pong-game');
        $('<div/>', { id: 'stick-2' }).css($.extend(CSS.stick2, CSS.stick))
            .appendTo('#pong-game');
        $('<header/>', { id: 'player1score' }).css($.extend(CSS.scoreboard, CSS.scoreboard1)).appendTo('#pong-game')
            .text('Player 1 : ' + CONSTS.score1);
        $('<header/>', { id: 'player2score' }).css($.extend(CSS.scoreboard, CSS.scoreboard2)).appendTo('#pong-game')
            .text('Player 2 : ' + CONSTS.score2);
    }


    function setEvents() {
        $('#h2h').click(function () {
            startGame('p2p');
        });

        $('#h2c').click(function () {
            startGame('p2c');
        });

        $('#c2c').click(function () {
            startGame('c2c');
        });

        $(document).on('keydown', function (e) {
            if (CONSTS.gameMod != 'c2c') {
                if (e.keyCode == 87 && CSS.stick1.top > 0) {
                    CONSTS.stick1Speed = -10;
                }
                if (e.keyCode == 83 && CSS.stick1.top < CSS.arena.height - CSS.stick1.top) {
                    CONSTS.stick1Speed = 10;
                }
                if (CONSTS.gameMod != 'h2c') {
                    if (e.keyCode == 38 && CSS.stick2.top > 0) {
                        CONSTS.stick2Speed = -10;
                    }
                    if (e.keyCode == 40 && CSS.stick2.top < CSS.arena.height - CSS.stick2.top) {
                        CONSTS.stick2Speed = 10;
                    }

                    if (e.keyCode == 80) {
                        pause();
                    }
                    if (e.keyCode == 32) {
                        createNewBall();

                    }

                }

            }
        });



        $(document).on('keyup', function (e) {
            CONSTS.stick1Speed = 0;
            CONSTS.stick2Speed = 0;
        });

    }
    function startGame(mode) {
        CONSTS.gameMod = mode;
        $('#menu').remove();
        roll();
        loop();
        



    }
    let cpulvl = 1

    function CPU(){
        if(CONSTS.gameMod == 'h2c'){
            CONSTS.stick2.top += (CONSTS.ball.left - (CONSTS.stick2.top +  CONSTS.stick2.height/2)) *cpulvl
            
        }
    } 
        


    function loop() {
        

        window.pongLoop = setInterval(function () {
            
            CSS.stick1.top += CONSTS.stick1Speed;
            $('#stick-1').css('top', CSS.stick1.top);

            CSS.stick2.top += CONSTS.stick2Speed;
            $('#stick-2').css('top', CSS.stick2.top);

            CSS.ball.top += CONSTS.ballTopSpeed;
            CSS.ball.left += CONSTS.ballLeftSpeed;


            if (CSS.ball.top <= 0 ||
                CSS.ball.top >= CSS.arena.height - CSS.ball.height) {
                CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;
            }

            if (CSS.stick1.top <= 0 || CSS.stick1.top >= CSS.arena.height - CSS.stick1.height) {
                CONSTS.stick1Speed = 0;

            }
            if (CSS.stick2.top <= 0 || CSS.stick2.top >= CSS.arena.height - CSS.stick2.height) {
                CONSTS.stick2Speed = 0;
            }
            

            $('#pong-ball').css({top: CSS.ball.top,left: CSS.ball.left});

            if (CSS.ball.left <= CSS.stick.width) {
            	
                if(CSS.ball.top > CSS.stick1.top && CSS.ball.top < CSS.stick1.top + CSS.stick.height ){
                    CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1 

                }
                else{
                    CONSTS.score2 ++;
                    roll();
                $('#player2score').text("Player 2 : " + CONSTS.score2)
                
                
                   
        
            }   CPU();
            let comLvl = 1

            function CPU(){
                if(CONSTS.gameMod == 'h2c'){
                    CONSTS.stick2.top += (CONSTS.ball.left - (CONSTS.stick2.top +  CONSTS.stick2.height/2)) * comLvl
                    
                }
            } 
            }
           
            

            if (CSS.ball.left  >= CSS.arena.width  -CSS.ball.width - CSS.stick.width) {
                if( CSS.ball.top > CSS.stick2.top && CSS.ball.top < CSS.stick2.top + CSS.stick.height){
                    CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1 
               
                }
                else{
                    CONSTS.score1 ++; 
                    $('#player1score').text("Player 1 : " + CONSTS.score1)
                    roll ();
                }

                 }gameOver();
                 
                
            


        }, CONSTS.gameSpeed);
    }



    

    function roll() {
        
        CSS.ball.top = 250;
        CSS.ball.left = 350;

        var side = -1;

        if (Math.random() < 0.5) {
            side = 1;
        }

        CONSTS.ballTopSpeed = Math.random() * -2 - 3;
        CONSTS.ballLeftSpeed = side * (Math.random() * 2 + 3);
        

    }

    start();
})();