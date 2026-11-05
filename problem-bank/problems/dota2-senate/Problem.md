# Dota2 Senate

In the world of Dota2, there are two parties: the Radiant and the Dire.

The Senate consists of senators from both parties. Now the Senate wants to decide on a change in the Dota2 game. The voting for this change is a round-based procedure. In each round, each senator can exercise one of the two rights:
1. Ban one senator's right: A senator can make another senator lose all his rights in this and all the following rounds.
2. Announce the victory: If this senator found the senators who still have rights to vote are all from the same party, he can announce the victory and decide on the change.

Given a string `senate` representing each senator's party belonging. The character `'R'` and `'D'` represent the Radiant party and the Dire party.

Predict which party will announce the victory: `"Radiant"` or `"Dire"`.

### Examples

**Example 1:**
```
Input: senate = "RD"
Output: Radiant
Explanation: 
The first senator comes from Radiant and can ban the next senator's right in round 1. 
The second senator can't exercise any rights because his right has been banned. 
In round 2, the first senator can just announce the victory.
```

**Example 2:**
```
Input: senate = "RDD"
Output: Dire
Explanation: 
The first senator comes from Radiant and bans the first Dire senator's right.
The second senator comes from Dire and bans the Radiant senator's right.
In round 2, the only senator left is Dire, who announces victory.
```

### Constraints

- `n == senate.length`
- `1 <= n <= 10^4`
- `senate[i]` is either `'R'` or `'D'`.
