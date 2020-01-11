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
                    ? squareGrid.addEventListener("click", rndClr)
                    : squareGrid.addEventListener("mouseover", rndClr);
                if (document.getElementById("click")) squareGrid.addEventListener("touchmove", rndClr);
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
        function counting() {
            timerID = window.setInterval(() => {
                counter++;
                counter
                    .toString()
                    .split("")
                    .forEach(i => time.push(i));
                if (mins < 1) {
                    if (time.length === 1) {
                        timer.innerHTML = `00:00:0${time[0]}`;
                    } else if (time.length === 2) {
                        timer.innerHTML = `00:00:${time[0].toString() +
                            time[1].toString()}`;
                    } else if (time.length === 3) {
                        timer.innerHTML = `00:0${time[0]}:${time[1].toString() +
                            time[2].toString()}`;
                    } else if (time.length === 4) {
                        timer.innerHTML = `00:${time[0].toString() +
                                time[1].toString()}:${time[2].toString() +
                                time[3].toString()}`
                    }
                } else {
                    if (mins < 10) {
                        timer.innerHTML = `${mins}:${timer2ID = window.setInterval(_ => {
                            scnds++;
                            if (scnds === 60) scnds = 0;
                            let scndsDisplayed = scnds;
                            if (scnds < 10) scndsDisplayed = `0${scnds}`
                            return scndsDisplayed;
                        }, 1000)}:${timer3ID = window.setInterval(_ => {
                            centiseconds++;
                            if (centiseconds === 100) centiseconds = 0;
                            return centiseconds;
                        }, 10)}`
                    } else timer.innerHTML = `${mins}:${scnds}:${centiseconds}`;
                }
            });
        }
        function startTimer() {
            window.setTimeout(counting, 2600);
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

function rndClr(e) {
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
        squaresRemaining();
        e.target.style.backgroundColor = `rgb(${clrs[0]},${clrs[1]},${clrs[2]})`;
    }
    e.stopPropagation();
}

function squaresRemaining() {
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
            ? squareGrid.removeEventListener("click", rndClr)
            : squareGrid.removeEventListener("mouseover", rndClr);
        if (document.getElementById("click")) squareGrid.removeEventListener("touchmove", rndClr);
    }
}

function stopTimer() {
    clearInterval(timerID);
    clearInterval(timer2ID);
    clearInterval(timer3ID);
    document.getElementById(
        "victoryTime"
    ).innerHTML = `Finished in: ${timer.innerHTML}`;
}

const helpShow = _ => document.getElementById("help-menu").style = "opacity: 1;";
const helpHide = _ => document.getElementById("help-menu").style = "opacity: 0;";

let helpBtn = document.getElementById("how-to-play"),
    squareGrid = document.getElementById("squares"),
    squareList = document.getElementsByClassName("square"),
    timer = document.getElementById("timer"),
    time = [],
    counter = 0,
    mins = counter % 6000 || 0,
    scnds = 0,
    centiseconds = 0,
    timerID,
    timer2ID,
    timer3ID;

document.getElementById("click")
    ? squareGrid.addEventListener("click", init)
    : squareGrid.addEventListener("mouseover", init);
if (document.getElementById("click")) squareGrid.addEventListener("touchmove", init);
squareGrid.addEventListener("mouseover", reduceAlpha);
squareGrid.addEventListener("mouseout", restoreAlpha);
helpBtn.addEventListener("mouseover", helpShow);
helpBtn.addEventListener("mouseout", helpHide);
document.getElementById("status-close").addEventListener("click", _ => document.getElementById("status-div").style = "display: none");
loginCheck.addEventListener("onchange", _ => loginCheck.selectedIndex === 1 ? document.getElementById("status-div").style.display = "flex" : {});
