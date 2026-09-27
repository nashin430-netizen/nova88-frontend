const games=[
 {name:"Golden Spin",cat:"slots",icon:"🎰",desc:"Classic reel-style demo"},
 {name:"Neon Rush",cat:"arcade",icon:"🕹️",desc:"Fast arcade-style concept"},
 {name:"Royal Cards",cat:"cards",icon:"🃏",desc:"Elegant card-game interface"},
 {name:"Lucky Gems",cat:"slots",icon:"💎",desc:"Premium gem-themed demo"},
 {name:"Cyber Race",cat:"arcade",icon:"🏎️",desc:"Futuristic racing concept"},
 {name:"Ace Royale",cat:"cards",icon:"♠️",desc:"Dark royal card interface"},
 {name:"Moon Slots",cat:"slots",icon:"🌙",desc:"Night-themed reel concept"},
 {name:"Pixel Quest",cat:"arcade",icon:"👾",desc:"Retro arcade-inspired UI"}
];
const grid=document.getElementById("gameGrid");
function render(filter="all"){
 grid.innerHTML=games.filter(g=>filter==="all"||g.cat===filter).map(g=>`
 <article class="game"><div class="game-art">${g.icon}</div><div class="game-info">
 <h3>${g.name}</h3><p>${g.desc}</p><span class="tag">${g.cat}</span></div></article>`).join("");
}
render();
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
 b.classList.add("active");render(b.dataset.filter);
});
const modal=document.getElementById("modal");
document.querySelectorAll("[data-modal]").forEach(b=>b.onclick=()=>{
 document.getElementById("modalTitle").textContent=b.dataset.modal==="login"?"Login":"Create Demo Account";
 document.getElementById("formMsg").textContent="";
 modal.classList.add("open");
});
document.getElementById("close").onclick=()=>modal.classList.remove("open");
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("open")};
document.getElementById("demoForm").onsubmit=e=>{
 e.preventDefault();document.getElementById("formMsg").textContent="Demo only — no account was created.";
};
document.getElementById("menuBtn").onclick=()=>{
 const nav=document.getElementById("nav");
 nav.style.display=nav.style.display==="flex"?"none":"flex";
 nav.style.position="absolute";nav.style.top="76px";nav.style.left="0";nav.style.right="0";
 nav.style.padding="20px";nav.style.background="#0b0d12";nav.style.flexDirection="column";
};
