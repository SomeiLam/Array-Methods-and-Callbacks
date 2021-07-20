const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
const finals2014 = fifaData.filter(function(item){
    return item.Year === 2014 && item.Stage === 'Final';
})
console.log('task 1 ', finals2014);
//(a) Home Team name for 2014 world cup final
console.log('task 1a ', finals2014[0]['Home Team Name']);
//(b) Away Team name for 2014 world cup final
console.log('task 1b ', finals2014[0]['Away Team Name']);
//(c) Home Team goals for 2014 world cup final
console.log('task 1c ', finals2014[0]['Home Team Goals']);
//(d) Away Team goals for 2014 world cup final
console.log('task 1d ', finals2014[0]['Away Team Goals']);
//(e) Winner of 2014 world cup final */
console.log('task 1e ', finals2014[0]['Win conditions'])


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
    return data.filter(item => item.Stage === 'Final');
}
console.log('task 2 ', getFinals(fifaData));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(data, getFinalcb) {
    return getFinalcb(data).map(item => item.Year);
} 
console.log('task 3 ', getYears(fifaData, getFinals));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(data, getFinalcb) {
    return getFinalcb(data).map(function(item) {
        if (item['Home Team Goals'] > item['Away Team Goals']) {
            return item['Home Team Name'];
        } else if (item['Away Team Goals'] > item['Home Team Goals']) {
            return item['Away Team Name'];
        } else {
            const winner = item['Win conditions'].split(' ')[0];
            return winner;
        }
    })
}
console.log(getWinners(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(data, getYearscb, getWinnerscb) {
    return getYearscb(data, getFinals).map(function(item, index) {
        return `In ${item}, ${getWinnerscb(data, getFinals)[index]} won the world cup!`
    })
}
console.log('task 5 ', getWinnersByYear(fifaData, getYears, getWinners));

// const winners = getWinnerscb(data, getFinals);
// const years = getYearscb(data, getFinals);
// return winners.map(function(item, index) {
//      return `In ${year[index]}, ${item} won the world cup!`;   
// })


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(getFinalscb) {
   const total = getFinalscb.reduce(function(acc, item) {
       return acc + item['Home Team Goals'] + item['Away Team Goals'];
   }, 0);
   const average = total / getFinalscb.length;
   return average.toFixed(2);
}
console.log('task 6 ', getAverageGoals(getFinals(fifaData)));



/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, initials) {
    let winner;
    const wins = data.reduce(function(acc, item) {
        if (item['Home Team Goals'] > item['Away Team Goals']) {
            winner = item['Home Team Initials'];
        } else if (item['Home Team Goals'] < item['Away Team Goals']) {
            winner = item['Away Team Initials'];
        } else {
            const country = item['Win conditions'].split(' ')[0];
            if (country === item['Home Team Name'][0]) {
                winner = item['Home Team Initials'];
            } else winner = item['Away Team Initials'];
        }
        if (winner === initials) 
            acc++;
        return acc;
    }, 0);
    return wins;
}
console.log('Stretch 1 -ITA ', getCountryWins(getFinals(fifaData), 'ITA'));



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    const goals = {};
    const games = {};
    data.forEach(element => {
        if (element['Home Team Name'] in goals) {
            goals[element['Home Team Name']] += element['Home Team Goals'];
            games[element['Home Team Name']]++;
        } else {
            goals[element['Home Team Name']] = element['Home Team Goals'];
            games[element['Home Team Name']] = 1;
        }
        if (element['Away Team Name'] in goals) {
            goals[element['Away Team Name']] += element['Away Team Goals'];
            games[element['Away Team Name']]++;
        } else {
            goals[element['Away Team Name']] = element['Away Team Goals'];
            games[element['Away Team Name']] = 1;
        }
    })
    let winnerGoal = 0;
    let winnerCountry;
    for (const country in goals) {
        if (goals[country] / games[country] > winnerGoal) {
            winnerGoal = goals[country] / games[country];
            winnerCountry = country;
        }
    }
    // console.log(goals, games);
    return `Team: ${winnerCountry}, Goals: ${winnerGoal}`;
}
console.log('Stretch 2 ', getGoals(getFinals(fifaData)));


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
    const lost = {};
    const games = {};
    data.forEach(element => {
        if (element['Home Team Name'] in lost) {
            lost[element['Home Team Name']] += element['Away Team Goals'];
            games[element['Home Team Name']]++;
        } else {
            lost[element['Home Team Name']] = element['Away Team Goals'];
            games[element['Home Team Name']] = 1;
        }
        if (element['Away Team Name'] in lost) {
            lost[element['Away Team Name']] += element['Home Team Goals'];
            games[element['Away Team Name']]++;
        } else {
            lost[element['Away Team Name']] = element['Home Team Goals'];
            games[element['Away Team Name']] = 1;
        }
    })
    let lostScore = 0;
    let lostCountry;
    for (const country in lost) {
        if (lost[country] / games[country] > lostScore) {
            lostScore = lost[country] / games[country];
            lostCountry = country;
        }
    }
    // console.log(lost, games);
    return `Team: ${lostCountry}, Lost: ${lostScore}`;
}

console.log('Stretch 3 ', badDefense(getFinals(fifaData)));

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
