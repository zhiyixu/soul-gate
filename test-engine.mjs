import assert from 'node:assert/strict';
import {createGame,act,step} from './dist/engine.js';
function frames(g,n,input={}){for(let i=0;i<n;i++)step(g,input,1/60);}
function start(){const g=createGame();act(g,'start');return g;}
let g=start();frames(g,60);assert.equal(g.player.y,410);assert.equal(g.player.grounded,true);
act(g,'jump');frames(g,10);assert.ok(g.player.y<360);act(g,'jump');assert.equal(g.player.jumps,2);const velocity=g.player.vy;act(g,'jump');assert.equal(g.player.vy,velocity);frames(g,120);assert.equal(g.player.grounded,true);
g=start();g.player.x=930;act(g,'ice');assert.ok(g.platforms.some(p=>p.type==='ice'));assert.equal(g.player.energy,76);frames(g,560);assert.equal(g.platforms.some(p=>p.type==='ice'),false);
g=start();g.player.x=430;g.player.y=406;act(g,'claw');assert.equal(g.enemies[0].hp,12);frames(g,20);act(g,'claw');assert.equal(g.enemies[0].dead,true);assert.equal(g.kills,1);
g=start();g.player.x=340;g.player.y=410;act(g,'metal');frames(g,15);assert.ok(g.enemies[0].hp<30);
g=start();g.player.x=1730;step(g,{},1/60);assert.equal(g.checkpointTaken,true);g.shards=1;g.pickups[0].collected=true;g.player.y=650;step(g,{},1/60);assert.equal(g.status,'dead');act(g,'respawn');assert.equal(g.player.x,1730);assert.equal(g.shards,1);assert.equal(g.pickups[0].collected,true);assert.equal(g.player.hp,100);
g=start();for(const item of g.pickups){g.player.x=item.x-14;g.player.y=item.y-15;step(g,{},1/60);}assert.equal(g.shards,3);g.player.x=3450;step(g,{},1/60);assert.equal(g.status,'playing');g.bossDefeated=true;step(g,{},1/60);assert.equal(g.status,'won');
g=start();act(g,'pause');const time=g.time;step(g,{},1);assert.equal(g.time,time);act(g,'pause');assert.equal(g.status,'playing');act(g,'restart');assert.equal(g.shards,0);assert.equal(g.status,'playing');
console.log('PASS: landing, double jump, bridge lifecycle, claw/projectile combat, checkpoint, preserved shards, portal gating, pause/restart');
// Play a complete route from spawn using only ordinary controls (no position/health edits).
g=start();let route=0,jumped=false,iterations=0;const targets=[642,1580,2650,3150,3460];
while(g.status==='playing'&&iterations++<15000){
 const p=g.player,target=targets[route];
 if(route<3&&!jumped&&p.x>target-130){act(g,'jump');jumped=true;}
 if(route<3&&jumped&&p.jumps===1&&p.vy>-100)act(g,'jump');
 if(p.x>800&&p.x<1350&&g.iceBridgeUntil-g.time<3)act(g,'ice');
 act(g,'metal');act(g,'claw');
 let move=p.x+14<target-5;
 if(route<3&&g.pickups[route].collected){route++;jumped=false;move=true;}
 if(route===3&&g.bossDefeated){route++;move=true;}
 step(g,{right:move},1/60);
}
assert.equal(g.status,'won',`walkthrough ended ${g.status} x=${g.player.x} shards=${g.shards} route=${route} health=${g.player.hp}`);
console.log(`PASS: full playable route, three shards, ice bridge and Boss, ${g.player.hp} HP remaining in ${g.time.toFixed(1)} seconds`);
// Ice halts enemy movement for its full freeze window.
g=start();g.player.x=365;g.player.y=410;act(g,'ice');frames(g,8);const frozen=g.enemies[0];assert.ok(frozen.frozenUntil>g.time);const frozenX=frozen.x;frames(g,50);assert.equal(frozen.x,frozenX);frames(g,80);assert.notEqual(frozen.x,frozenX);console.log('PASS: ice freezes movement and thaws');

// A lethal projectile at the unlocked portal must not turn death into a victory.
g=start();g.shards=3;g.bossDefeated=true;g.checkpointTaken=true;g.player.x=3450;g.player.y=410;g.player.hp=1;g.projectiles.push({x:3450,y:410,w:14,h:14,vx:0,vy:0,life:1,owner:'enemy',type:'hostile'});step(g,{},1/60);assert.equal(g.status,'dead');console.log('PASS: lethal hit takes precedence over portal victory');
