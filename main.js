// Darken squares on mouseover
function reduceAlpha(e) {
    if (e.target !== e.currentTarget && !e.target.getAttribute("id")) {
        if (e.target.getAttribute("state")) {
            switch (e.target.getAttribute("state")) {
                case "0":
                    e.target.style.backgroundColor = "rgba(200, 0, 0, .91)";
                    break;
                case "1":
                    e.target.style.backgroundColor = "rgba(0, 200, 0, .93)";
                    break;
                case "2":
                    e.target.style.backgroundColor = "rgba(0, 0, 200, .9)";
                    break;
                case "3":
                    e.target.style.backgroundColor = "rgba(200, 200, 0, .95)";
                    break;
                case "4":
                    e.target.style.backgroundColor = "rgba(200, 0, 200, .93)";
                    break;
                case "5":
                    e.target.style.backgroundColor = "rgba(0, 200, 200, .94)";
                    break;
            }
        } else e.target.style.backgroundColor = "rgba(170, 170, 170, .85)";
    }
    e.stopPropagation();
}

// Lighten squares on mouseout
function restoreAlpha(e) {
    if (e.target !== e.currentTarget && !e.target.getAttribute("id")) {
        if (e.target.getAttribute("state")) {
            switch (e.target.getAttribute("state")) {
                case "0":
                    e.target.style.backgroundColor = "rgba(200, 0, 0, 1)";
                    break;
                case "1":
                    e.target.style.backgroundColor = "rgba(0, 200, 0, 1)";
                    break;
                case "2":
                    e.target.style.backgroundColor = "rgba(0, 0, 200, 1)";
                    break;
                case "3":
                    e.target.style.backgroundColor = "rgba(200, 200, 0, 1)";
                    break;
                case "4":
                    e.target.style.backgroundColor = "rgba(200, 0, 200, 1)";
                    break;
                case "5":
                    e.target.style.backgroundColor = "rgba(0, 200, 200, 1)";
                    break;
            }
        } else e.target.style.backgroundColor = "rgba(170, 170, 170, 1)";
    }
    e.stopPropagation();
}

function init(e) {
    if (e.target !== e.currentTarget) {
        function loadClrs(j) {
            function loadLeft(n) {
                if (n - j >= 0) {
                    squareList[n - j].style.backgroundColor = squareList[
                        n - j
                    ].getAttribute("init");
                } else {
                    squareList[n - j + 16].style.backgroundColor = squareList[
                        n - j + 16
                    ].getAttribute("init");
                }
            }
            function loadRight(n) {
                if (n + j <= 15) {
                    squareList[n + j].style.backgroundColor = squareList[
                        n + j
                    ].getAttribute("init");
                } else {
                    squareList[n + j - 16].style.backgroundColor = squareList[
                        n + j - 16
                    ].getAttribute("init");
                }
            }
            loadLeft(n);
            loadRight(n);
        }
        function interval() {
            loadClrsID = window.setInterval(() => {
                loadClrs(j);
                j++;
            }, 80);
        }
        function clear() {
            setTimeout(() => clearInterval(loadClrsID), 2500);
            setTimeout(() => clearInterval(promptID), 7500);
        }
        function addListeners() {
            setTimeout(function() {
                document.getElementById("click")
                    ? squareGrid.addEventListener("click", setRandomColor)
                    : squareGrid.addEventListener("mouseover", setRandomColor);
                if (document.getElementById("click")) squareGrid.addEventListener("touchmove", setRandomColor);
                squareGrid.addEventListener("mouseover", reduceAlpha);
                squareGrid.addEventListener("mouseout", restoreAlpha);
            }, 2600);
        }
        function disableListeners() {
            document.getElementById("click")
                ? squareGrid.removeEventListener("click", init)
                : squareGrid.removeEventListener("mouseover", init);
            if (document.getElementById("click")) squareGrid.removeEventListener("touchmove", init);
            squareGrid.removeEventListener("mouseover", reduceAlpha);
            squareGrid.removeEventListener("mouseout", restoreAlpha);
        }
        function startTimer() {
            let t0 = t1 = t2 = t3 = t4 = t5 = 0;
            function updateTimer() { timer.innerHTML = `${t5}${t4}:${t3}${t2}:${t1}${t0}` }
            
            window.setTimeout(_=> {
                timerIntervals = [
                    setInterval(_=> { t0 = t0 === 9 ? 0 : t0+1; updateTimer() }, 10),
                    setInterval(_=> { t1 = t1 === 9 ? 0 : t1+1; updateTimer() }, 100),
                    setInterval(_=> { t2 = t2 === 9 ? 0 : t2+1; updateTimer() }, 1000),
                    setInterval(_=> { t3 = t3 === 5 ? 0 : t3+1; updateTimer() }, 10 * 1000),
                    setInterval(_=> { t4 = t4 === 9 ? 0 : t4+1; updateTimer() }, 6 * 10 * 1000),
                    setInterval(_=> { t5 = t5 === 5 ? 0 : t5+1; updateTimer() }, 10 * 6 * 10 * 1000)
                ];
            }, 2600);
        }

        function changePrompt() {
            promptID = setInterval(function() {
                if (p === 1) {
                    document.getElementById("prompt-click").innerHTML = "Ready";
                    document.getElementById("prompt-trace").innerHTML = "Ready";
                } else if (p === 2) {
                    document.getElementById("prompt-click").innerHTML = "Ready.";
                    document.getElementById("prompt-trace").innerHTML = "Ready.";
                } else if (p === 3) {
                    document.getElementById("prompt-click").innerHTML = "Ready..";
                    document.getElementById("prompt-trace").innerHTML = "Ready..";
                } else if (p === 4) {
                    document.getElementById("prompt-click").innerHTML = "Set";
                    document.getElementById("prompt-trace").innerHTML = "Set";
                } else if (p === 5) {
                    document.getElementById("prompt-click").innerHTML = "Set.";
                    document.getElementById("prompt-trace").innerHTML = "Set.";
                } else if (p === 6) {
                    document.getElementById("prompt-click").innerHTML = "Set..";
                    document.getElementById("prompt-trace").innerHTML = "Set..";
                } else if (p === 7) {
                    document.getElementById("prompt-click").innerHTML = "Go!";
                    document.getElementById("prompt-trace").innerHTML = "Go!";
                } else if (p === 21) {
                    document.getElementById("prompt-click").innerHTML =
                        "Try to match all the squares!";
                    document.getElementById("prompt-trace").innerHTML =
                        "Try to match all the squares!";
                }
                p++;
            }, 320);
        }
        let n = Number(e.target.getAttribute("n"));
        let j = 1;
        let p = 0;
        let loadClrsID;
        let promptID;
        e.target.style.backgroundColor = e.target.getAttribute("init");
        disableListeners();
        interval();
        addListeners();
        for (let i = 0; i < squareList.length; i++) {
            switch (i) {
                case 0:
                case 6:
                case 12:
                    squareList[i].setAttribute("state", 0);
                    break;
                case 1:
                case 7:
                case 13:
                    squareList[i].setAttribute("state", 1);
                    break;
                case 2:
                case 8:
                case 14:
                    squareList[i].setAttribute("state", 2);
                    break;
                case 3:
                case 9:
                case 15:
                    squareList[i].setAttribute("state", 3);
                    break;
                case 4:
                case 10:
                    squareList[i].setAttribute("state", 4);
                    break;
                case 5:
                case 11:
                    squareList[i].setAttribute("state", 5);
                    break;
            }
        }
        changePrompt();
        startTimer();
        clear();
    }
    e.stopPropagation();
}

function setRandomColor(e) {
    if (e.target !== e.currentTarget) {
        clrs = [];
        rndNum = Math.floor(Math.random() * 6);
        while (rndNum == e.target.getAttribute("state")) {
            rndNum < 5 ? rndNum++ : rndNum--;
        }
        switch (rndNum) {
            case 0:
                clrs.push(200, 0, 0);
                break;
            case 1:
                clrs.push(0, 200, 0);
                break;
            case 2:
                clrs.push(0, 0, 200);
                break;
            case 3:
                clrs.push(200, 200, 0);
                break;
            case 4:
                clrs.push(200, 0, 200);
                break;
            case 5:
                clrs.push(0, 200, 200);
                break;
        }
        squareList[Number(e.target.getAttribute("n"))].setAttribute(
            "state",
            rndNum
        );
        trackSquaresRemaining();
        e.target.style.backgroundColor = `rgb(${clrs[0]},${clrs[1]},${clrs[2]})`;
    }
    e.stopPropagation();
}

function trackSquaresRemaining() {
    let store = [];

    for (let i = 0; i < squareList.length; i++) {
        if (squareList[i].getAttribute("state")) {
            store.push(squareList[i].getAttribute("state"));
        }
    }

    let modeCount = store.reduce(
        (accumulator, i) =>
            store.filter(j => j === i).length > accumulator
                ? store.filter(j => j === i).length
                : accumulator,
        0
    );

    for (let i = 0; i < squareList.length; i++) {
        squareList[i].innerHTML = 16 - modeCount;
        document.getElementById(
            "squares-remaining"
        ).innerHTML = `Squares Remaining: ${16 - modeCount}`;
    }

    if (modeCount === 16) {
        stopTimer();
        document.getElementById("victoryMsgBox").style.display = "flex";
        document.getElementById("victoryMsg").style.display = "block";
        document.getElementById("victoryTime").style.display = "block";
        document.getElementById("recordTime").style.display = "block";
        document.getElementById("prompt-click").innerHTML = "Nice job!";
        document.getElementById("prompt-trace").innerHTML = "Nice job!";
        document.getElementById("click")
            ? squareGrid.removeEventListener("click", setRandomColor)
            : squareGrid.removeEventListener("mouseover", setRandomColor);
        if (document.getElementById("click")) squareGrid.removeEventListener("touchmove", setRandomColor);
    }
}

function stopTimer() {
    timerIntervals.forEach(interval => clearInterval(interval));
    document.getElementById(
        "victoryTime"
    ).innerHTML = `Finished in: ${timer.innerHTML}`;
    let page = /trace/.exec(location.pathname) ? 'trace' : 'click';
    localStorage.setItem('times',
        JSON.stringify(
            { 
                ...JSON.parse(localStorage.getItem('times')),
                [page]: [
                    ...JSON.parse(localStorage.getItem('times'))[page],
                    timer.innerHTML
                ].sort((a, b) => convertTimeStringToNumber(a) - convertTimeStringToNumber(b))
            }
        )
    );
    console.log(localStorage.getItem('times'));
    document.getElementById('recordTime').innerHTML = `Best time: ${JSON.parse(localStorage.getItem('times'))[page][0]}`;
}

function convertTimeStringToNumber(timeString) {
    return Number(timeString.replace(/:/g, '').replace(/0/g, ''))
}

const helpShow = _ => document.getElementById("help-menu").style = "opacity: 1;";
const helpHide = _ => document.getElementById("help-menu").style = "opacity: 0;";

let helpBtn = document.getElementById("how-to-play"),
    squareGrid = document.getElementById("squares"),
    squareList = document.getElementsByClassName("square"),
    timer = document.getElementById("timer"),
    timerIntervals = [];

document.getElementById("click")
    ? squareGrid.addEventListener("click", init)
    : squareGrid.addEventListener("mouseover", init);
if (document.getElementById("click")) squareGrid.addEventListener("touchmove", init);
squareGrid.addEventListener("mouseover", reduceAlpha);
squareGrid.addEventListener("mouseout", restoreAlpha);
helpBtn.addEventListener("mouseover", helpShow);
helpBtn.addEventListener("mouseout", helpHide);
// document.getElementById("status-close").addEventListener("click", _ => document.getElementById("status-div").style = "display: none");
// loginCheck.addEventListener("onchange", _ => loginCheck.selectedIndex === 1 ? document.getElementById("status-div").style.display = "flex" : {});

!localStorage.getItem('times') && localStorage.setItem('times', JSON.stringify({ click: ['59:59:99'], trace: ['59:59:99'] }));