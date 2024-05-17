
$(document).ready(() => {
    
    //array chat bot messages
    let chatArray = [
        "Sometimes I read fortunes. A beautiful, smart, and loving person will be coming into your life.",
        "Sometimes I read fortunes. A fresh start will put you on your way.",
        "Ha! What is the last movie that made you laugh out loud?",
        "OK. So do you have a hobby? I love to chat chat chat.",
        "Nice! History is just one thing after another. Would you travel back in time or to the future?",
        "Did I repeat myself? It can happen because I just love to chat",
        "I love super heroes. Iron Man of course. What would be your superpower?",
        "So I love music. Techno! Techno! What music do you like?",     
        "Can you recommend a book to me? I love audiobooks! Chat chat chat chat",      
        "Sometimes I read fortunes. A golden egg of opportunity falls into your lap this month.",     
        "My favourite food is chips. Micro chips ;)) What's your favourite dish?",
        "Know any jokes? Here's one. Knock knock. Who's there? Art. Art who? R2D2!",
        "When I need a rest I sit on my robottom! How do you relax?",
        "Sometimes I read fortunes. All your hard work will soon pay off."
    ];
    //handles random array element without repeat 
    let b = chatArray;    
    const botMessage = () => {
        let name = b[Math.floor(Math.random() * b.length)]
        b = b.filter((v) => v !== name)
        if (b.length === 0) {
            b = chatArray
        }
        return name
    }
    
    //handles new Date() numericals to names
    const currentTimeDate = () => {
        let dateTime = new Date();
        const weekDay = getDay => {
            getDay = dateTime.getDay();
            switch (getDay) {
                case 0 : return 'Sun';
                case 1 : return 'Mon';
                case 2 : return 'Tue';
                case 3 : return 'Wed';
                case 4 : return 'Thu';
                case 5 : return 'Fri';
                case 6 : return 'Sat';      
            }  
        };
        const month = getMonth => {
            getMonth = dateTime.getMonth();
            switch (getMonth) {
                case 0 : return 'Jan';
                case 1 : return 'Feb';
                case 2 : return 'Mar';
                case 3 : return 'Apr';
                case 4 : return 'May';
                case 5 : return 'Jun';
                case 6 : return 'Jul';
                case 7 : return 'Aug';
                case 8 : return 'Sep';
                case 9 : return 'Oct';
                case 10 : return 'Nov';
                case 11 : return 'Dec';    
            }  
        };
        let todaysDay = weekDay();
        let todaysDate = dateTime.getDate();
        let todaysMonth = month();
        let today = `${todaysDay} ${todaysDate} ${todaysMonth}`;
        
        //declare minutes variable
        let timeMinutes = dateTime.getMinutes();
        //handle 0-9 single digit output
        if (timeMinutes<10) {
            timeMinutes = '0'+timeMinutes;
        }
        //declare hours variable
        let timeHours = dateTime.getHours();
        //declare time variable
        let time = timeHours+':'+timeMinutes;
        return today+' '+time;
    }
    
    //Start button- displays welcome message / displays welcome message timestamp / displays input field / displays submit button  
    $('button#startButton').on('click', function() {  
        let $introTime = $('<li id="introTime" class = "timeNow">').css({'color':'white'})
        $('ul#introMessage').before($introTime);
        $introTime.html(currentTimeDate());
        $('ul#introMessage').css({'display':'block'})
        $('div#userInputField-outer').css(
            {'display': 'flex'});
            $('ul#userInputField').css({'display':'block'});
            $('div#scroller-outer').css({'display':'flex'});
            $('div#welcome-outer').css({'display': 'none'})
            $('div#welcome-inner').css({'display': 'none'})
        });
        
        //form submit handles timestamped user message and bot response
        $("#userInputForm").submit(function (e) {
            e.preventDefault();
            //variable storing object containing empty li
            let $nextMessage = $('<ul class = "nextMessage">');
            let $userTime = $('<li id="userTime" class = "timeNow">').css({
                color: "white",
            });
            let $botTime = $('<li id="botTime" class = "timeNow">').css({
                color: "white",
            });
            //handles delayed bot response 
            $("ul#chatLogScroller")
            .append($nextMessage)
            .delay(2000)
            .queue(function (next) {
                let $botBubble = $('<ul class="botBubble">');
                $(this).append($botTime).append($botBubble);
                $botBubble.html(botMessage());
                $botTime.html(currentTimeDate());
                next();
                scroll();
            });
            // handles user input clears input field
            let $userBubble = $('<ul class="userBubble">');
            let $userInput = $("input#userInput").val();
            $nextMessage.append($userBubble);
            $userBubble.html($userInput);
            $userBubble.before($userTime);
            $userTime.html(currentTimeDate());
            $userInput = $("input#userInput").val("");
            scroll();
        });
        
        //handles scroll event to most recent
        function scroll() {
            let scrollToEnd = document.getElementById("scroller");
            scrollToEnd.scrollTop = scrollToEnd.scrollHeight;
        }
        
    })
    
//design and code by Joshua J.Carter 15 May 2023
    
//resource links   
//https://stackoverflow.com/questions/17891173/how-to-efficiently-randomly-select-array-item-without-repeats
//https://stackoverflow.com/questions/11085567/jquery-delay-to-work-with-append
    
    
    
    
    